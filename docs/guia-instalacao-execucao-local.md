# Guia de Instalação e Execução Local (Front + Back)

> **DOC-11 — Issue #190** · Equipe de Documentação · Semestre 2026/2

Este guia explica como preparar o ambiente e executar o DoaSync na máquina local: a **API (back-end)** e o **cliente web (front-end)**.

## 0. Leia antes: onde está o código

O código da aplicação **ainda não está na branch `main`**. Ela contém apenas a documentação. Hoje o código vive em branches de desenvolvimento:

| Parte | Branch | Pasta | Tecnologia verificada |
|---|---|---|---|
| Back-end | `dev-backend` | `api/` | ASP.NET Core (.NET 8), Entity Framework Core, MySQL, Swagger |
| Front-end | `dev-frontend` | `client/` | Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm |

> ⚠️ **Divergência com outros documentos.** [`arquitetura.md`](./arquitetura.md) e [`stack.md`](./stack.md) descrevem o back-end como Spring Boot (Java 17) com PostgreSQL. O código existente em `dev-backend` é **.NET 8 com MySQL**. Este guia segue o **código real**. A equipe de arquitetura deve confirmar qual stack é a oficial e alinhar os documentos.

Quando o código for integrado à `main`, atualize os caminhos e comandos deste guia.

Estado verificado em 20/10/2026: `pnpm install` + `pnpm build` no front e `dotnet build` no back concluíram sem erros. A execução da API contra um MySQL real e o consumo da API pelo front **não** foram testados (ver seção 6).

---

## 1. Pré-requisitos

| Ferramenta | Versão | Uso | Verificar |
|---|---|---|---|
| Git | qualquer recente | clonar o repositório | `git --version` |
| .NET SDK | 8.0 ou superior (9.0 também compila o projeto) | back-end | `dotnet --version` |
| MySQL Server | 8.x | banco de dados | `mysql --version` |
| Node.js | 20 LTS ou superior | front-end | `node --version` |
| pnpm | 9.x | gerenciador de pacotes do front (há `pnpm-lock.yaml`) | `pnpm --version` |

Instalação do pnpm (após instalar o Node.js):

```bash
npm install -g pnpm
```

Ferramenta de migrations do Entity Framework (necessária para criar as tabelas):

```bash
dotnet tool install --global dotnet-ef
```

---

## 2. Obter o código

Como o back e o front estão em branches diferentes, a forma mais simples é usar duas pastas de trabalho com `git worktree`.

```bash
git clone https://github.com/PrjDoaSync/doa-sync.git
cd doa-sync

# Back-end e front-end em pastas separadas, ao lado do clone
git worktree add ../doa-sync-back  dev-backend
git worktree add ../doa-sync-front dev-frontend
```

Se preferir uma única pasta, alterne com `git checkout dev-backend` ou `git checkout dev-frontend`. Lembre de commitar ou guardar suas alterações antes de trocar.

Para atualizar depois:

```bash
git fetch origin
git pull
```

---

## 3. Back-end (API)

Pasta: `api/` na branch `dev-backend`.

### 3.1 Banco de dados MySQL

A API usa a connection string `DefaultConnection` de `api/appsettings.json`:

```
Server=localhost;Port=3306;Database=db_DoaSync;Uid=root;Pwd=12345;
```

Duas opções:

- **Usar o padrão:** configure o MySQL local com usuário `root` e senha `12345`, porta `3306`. Use apenas em desenvolvimento local.
- **Usar suas credenciais (recomendado):** crie o arquivo `api/appsettings.Local.json`, que já está no `.gitignore` e não vai para o repositório.

> `appsettings.Local.json` só é lido se for carregado pela aplicação. O `Program.cs` atual usa `WebApplication.CreateBuilder`, que lê `appsettings.json` e `appsettings.{Ambiente}.json`, mas **não** o `appsettings.Local.json`. Enquanto isso não mudar, a alternativa que funciona sem alterar código é uma variável de ambiente (abaixo).

Sobrescrever a connection string por variável de ambiente (PowerShell, vale para a sessão atual):

```powershell
$env:ConnectionStrings__DefaultConnection = "Server=localhost;Port=3306;Database=db_DoaSync;Uid=SEU_USUARIO;Pwd=SUA_SENHA;"
```

Bash/Linux/macOS:

```bash
export ConnectionStrings__DefaultConnection="Server=localhost;Port=3306;Database=db_DoaSync;Uid=SEU_USUARIO;Pwd=SUA_SENHA;"
```

Não é necessário criar o banco manualmente: o comando de migration abaixo cria o `db_DoaSync` se o usuário tiver permissão.

### 3.2 Restaurar, compilar e criar as tabelas

```bash
cd api
dotnet restore
dotnet build
dotnet ef database update
```

`dotnet ef database update` aplica as migrations da pasta `api/Migrations`. O MySQL precisa estar em execução.

### 3.3 Executar

```bash
dotnet run --launch-profile http
```

| Item | Valor |
|---|---|
| URL da API | http://localhost:5009 |
| Swagger (documentação interativa) | http://localhost:5009/swagger |
| Ambiente | `Development` |

Outros perfis definidos em `launchSettings.json`:

| Perfil | Comando | URL |
|---|---|---|
| `https` | `dotnet run --launch-profile https` | https://localhost:7128 e http://localhost:5009 |
| `Testing` | `dotnet run --launch-profile Testing` | http://localhost:5010 |

Para o perfil `https`, confie no certificado de desenvolvimento uma única vez:

```bash
dotnet dev-certs https --trust
```

O Swagger só é habilitado quando o ambiente é `Development`.

O perfil `Testing` usa `appsettings.Testing.json`, cuja connection string está **vazia**. Para usá-lo, informe uma connection string (por exemplo, pela variável de ambiente acima).

### 3.4 Endpoints disponíveis na branch

Controllers presentes em `dev-backend`: `Auth`, `Doacao`, `Endereco`, `PessoaFisica`, `PessoaJuridica`, `Projeto`, `Telefone` e `Usuario`. A lista completa de rotas e parâmetros fica no Swagger.

---

## 4. Front-end (cliente web)

Pasta: `client/` na branch `dev-frontend`.

```bash
cd client
pnpm install
pnpm dev
```

Abra http://localhost:3000.

| Comando | O que faz |
|---|---|
| `pnpm dev` | servidor de desenvolvimento com hot reload |
| `pnpm build` | build de produção |
| `pnpm start` | executa o build de produção (rode `pnpm build` antes) |
| `pnpm lint` | verificação com ESLint |

Rotas existentes na branch: `/` (início), `/sign-in`, `/sign-up`, `/recover-password`, `/home` (área do usuário) e `/dashboard` (área administrativa).

Variáveis de ambiente: nenhuma é exigida hoje. Arquivos `.env*` estão no `.gitignore` do front e nunca devem ser commitados.

---

## 5. Executar tudo junto

Abra dois terminais.

| Terminal | Comandos | Resultado |
|---|---|---|
| 1 — API | `cd api` → `dotnet run --launch-profile http` | http://localhost:5009/swagger |
| 2 — Front | `cd client` → `pnpm dev` | http://localhost:3000 |

Ordem sugerida: MySQL em execução, depois a API, depois o front.

---

## 6. Limitações conhecidas

- **Front e API ainda não estão integrados.** O código do front não faz chamadas HTTP nem define a URL da API. As telas rodam isoladas. Quando a integração for feita, documente aqui a variável de ambiente com a URL base (provavelmente `http://localhost:5009`).
- **CORS não está configurado** no `Program.cs`. Ao integrar o front (porta 3000) com a API (porta 5009), o navegador pode bloquear as requisições até o CORS ser habilitado na API.
- **Credenciais padrão no repositório.** `appsettings.json` contém usuário e senha do MySQL em texto. É aceitável só para desenvolvimento local; nunca use esses valores em homologação ou produção.
- **Sem Docker Compose** na branch `dev-backend`. Documentos de arquitetura citam Docker Compose, mas o arquivo não existe no código verificado.
- Existe ainda a branch `cadastro-entidades`, com um app Next.js separado (Prisma e NextAuth, com `.env.example`). Ela não faz parte do fluxo descrito neste guia.

---

## 7. Solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| `Unable to connect to any of the specified MySQL hosts` ao iniciar a API ou ao rodar `dotnet ef` | MySQL parado, porta ou credenciais diferentes | Inicie o MySQL e confira a connection string (seção 3.1) |
| `Access denied for user 'root'` | Senha diferente de `12345` | Sobrescreva a connection string por variável de ambiente |
| `dotnet ef` não é reconhecido | Ferramenta não instalada | `dotnet tool install --global dotnet-ef` e reabra o terminal |
| Erro de SDK/target `net8.0` | .NET SDK ausente ou muito antigo | Instale o .NET SDK 8 ou superior |
| Página do Swagger retorna 404 | Ambiente não é `Development` | Use `--launch-profile http` ou `https` |
| Aviso de redirecionamento HTTPS ao usar o perfil `http` | `UseHttpsRedirection` ativo no `Program.cs` | Use o perfil `https` ou confie no certificado (seção 3.3) |
| `pnpm` não é reconhecido | pnpm não instalado | `npm install -g pnpm` e reabra o terminal |
| Porta 3000 ou 5009 em uso | Outro processo ocupando a porta | Encerre o processo ou rode o front com `pnpm dev -p 3001` |
| Falha no `pnpm install` | Versão antiga do Node.js | Atualize para Node.js 20 LTS ou superior |

---

## 8. Checklist de validação do ambiente

- [ ] `dotnet --version`, `node --version`, `pnpm --version` e `mysql --version` respondem
- [ ] MySQL em execução e acessível com as credenciais configuradas
- [ ] `dotnet ef database update` termina sem erro
- [ ] http://localhost:5009/swagger abre
- [ ] `pnpm dev` inicia e http://localhost:3000 abre

## Referências

- [`arquitetura.md`](./arquitetura.md) · [`stack.md`](./stack.md) · [`backend/pipeline-ci-cd.md`](./backend/pipeline-ci-cd.md) · [`frontend/frontend-web.md`](./frontend/frontend-web.md)
