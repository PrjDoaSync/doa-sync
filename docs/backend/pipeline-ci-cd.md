# Pipeline CI/CD do Backend — DoaSync

Guia passo a passo para montar uma pipeline básica no GitHub Actions, dividida em três estágios: **build**, **test** e **deploy**. O foco inicial é em **build** e **test**; o estágio de **deploy** fica preparado como esqueleto para ser ativado depois.

> Stack do projeto: Spring Boot 4.1.1, Java 17, Maven (via `mvnw`), JUnit 5 (incluído no `spring-boot-starter-test`).

---

## Visão geral

```
┌─────────┐     ┌─────────┐     ┌──────────┐
│  BUILD  │ ──> │  TEST   │ ──> │  DEPLOY  │
│ compila │     │ roda os │     │ (futuro) │
│  o jar  │     │ testes  │     │          │
└─────────┘     └─────────┘     └──────────┘
```

- **build**: compila o código e empacota o `.jar`.
- **test**: executa os testes automatizados e gera o relatório.
- **deploy**: publica a aplicação (desativado por enquanto, só o esqueleto).

---

## Passo 1 — Conferir as dependências no `pom.xml`

Para a pipeline de build e test, o projeto já precisa ter o starter de testes do Spring Boot. Confira se esta dependência existe no seu `pom.xml` (dentro de `<dependencies>`):

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

Esse starter agrega JUnit 5, Mockito e AssertJ, cobrindo o que a pipeline
precisa para rodar os testes.

Para o estágio de **test** gerar relatórios de cobertura (opcional, mas recomendado), adicione o plugin **JaCoCo** dentro de `<build><plugins>`:

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.12</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

O plugin do Surefire (que roda os testes) já vem configurado pelo
`spring-boot-starter-parent`, então não precisa adicioná-lo manualmente.

---

## Passo 2 — Entender os comandos do Maven usados na pipeline

O projeto usa o **Maven Wrapper** (`mvnw`), então não é preciso instalar o
Maven no runner. Os comandos principais:

| Objetivo              | Comando                              |
|-----------------------|--------------------------------------|
| Compilar sem testes   | `./mvnw -B clean compile`            |
| Rodar só os testes    | `./mvnw -B test`                     |
| Empacotar o `.jar`    | `./mvnw -B clean package`            |
| Empacotar sem testes  | `./mvnw -B clean package -DskipTests`|

- `-B` (batch mode): saída limpa, sem prompts interativos — ideal para CI.
- No Linux (runner `ubuntu-latest`) o comando é `./mvnw`.

---

## Passo 3 — Criar o arquivo da pipeline (`.yaml`)

Crie o arquivo `.github/workflows/pipeline-backend.yaml` com o conteúdo
abaixo. Ele define os três jobs encadeados: `build` → `test` → `deploy`.

```yaml
name: Pipeline Backend

# Dispara a pipeline em push e pull request para a branch main
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  # ───────────────────────── BUILD ─────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Baixar o código
        uses: actions/checkout@v4

      - name: Configurar o Java 17
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
          cache: maven

      - name: Dar permissão de execução ao Maven Wrapper
        run: chmod +x ./mvnw

      - name: Compilar e empacotar (sem rodar testes)
        run: ./mvnw -B clean package -DskipTests

      - name: Publicar o artefato (.jar)
        uses: actions/upload-artifact@v4
        with:
          name: app-jar
          path: target/*.jar

  # ───────────────────────── TEST ──────────────────────────
  test:
    name: Test
    runs-on: ubuntu-latest
    needs: build          # só roda se o build passar
    steps:
      - name: Baixar o código
        uses: actions/checkout@v4

      - name: Configurar o Java 17
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
          cache: maven

      - name: Dar permissão de execução ao Maven Wrapper
        run: chmod +x ./mvnw

      - name: Rodar os testes
        run: ./mvnw -B test

      - name: Publicar relatório de testes
        if: always()      # publica mesmo se algum teste falhar
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: target/surefire-reports/

  # ──────────────────────── DEPLOY ─────────────────────────
  # Esqueleto desativado. Ative preenchendo os steps e removendo
  # a condição 'if: false' quando for configurar o deploy.
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: test           # só roda se os testes passarem
    if: false             # <<< mantém o deploy desligado por enquanto
    steps:
      - name: Placeholder de deploy
        run: echo "Configurar o deploy aqui (ex.: Docker, Render, AWS, Railway...)"
```

---

## Passo 4 — Como cada estágio funciona

1. **build**
   - Baixa o código, configura o Java 17 e empacota o `.jar` com `-DskipTests`
     (os testes rodam no estágio seguinte, mantendo os jobs separados).
   - Sobe o `.jar` como artefato, acessível na aba **Actions** do GitHub.

2. **test** (`needs: build`)
   - Só começa se o build terminar com sucesso.
   - Roda `./mvnw -B test` e publica os relatórios do Surefire como artefato.
   - `if: always()` garante que o relatório suba mesmo quando um teste falha.

3. **deploy** (`needs: test`)
   - Fica desligado por `if: false`. Quando for implementar, remova essa
     linha e preencha os steps com o destino escolhido.

---

## Passo 5 — Testar a pipeline

1. Crie/salve o arquivo `pipeline-backend.yaml` em `.github/workflows/` (Passo 3).
2. Faça commit e push para a branch `main`:

   ```powershell
   git add .github/workflows/pipeline-backend.yaml docs/pipeline-ci-cd.md pom.xml
   git commit -m "ci: adiciona pipeline de build e test do backend"
   git push origin main
   ```

3. Abra o repositório no GitHub, vá na aba **Actions** e acompanhe a execução
   dos jobs **Build** e **Test**.

---

## Próximos passos (deploy)

Quando for ativar o deploy, as opções mais comuns para um Spring Boot são:

- **Imagem Docker**: construir e publicar no Docker Hub ou GitHub Container Registry.
- **Plataformas gerenciadas**: Render, Railway, Fly.io, Heroku.
- **Nuvem**: AWS (Elastic Beanstalk / ECS), Azure, Google Cloud Run.

Em todos os casos, o fluxo é: baixar o artefato `app-jar` gerado no build,
autenticar na plataforma usando **secrets** do repositório
(`Settings > Secrets and variables > Actions`) e executar o comando de
publicação. Nunca coloque senhas ou tokens direto no `.yaml` — use sempre
`${{ secrets.NOME_DO_SEGREDO }}`.
