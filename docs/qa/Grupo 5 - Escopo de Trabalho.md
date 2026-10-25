# 🟥 Grupo 5 — Qualidade de Software

## Escopo de Trabalho | Projeto de Extensão DoaSync

---

## 1. Identificação da equipe

| Item          | Descrição                                             |
| ------------- | ----------------------------------------------------- |
| **Grupo**     | 🟥 Grupo 5 — Qualidade de Software (QA)               |
| **Líder**     | Paola C.                                              |
| **Semestre**  | 2026/2                                                |
| **Dinâmica**  | Ciclos quinzenais (Scrum / Kanban)                    |

### Integrantes

| Integrante             | Turma         | Atuação principal          |
| ---------------------- | ------------- | -------------------------- |
| **Paola C.** (Líder)   | CSTADS125N4-T | QA / Coordenação de testes |
| **João V. M.**         | CSTADS125N4-T | Testes / Validação         |
| **Amós G. S. S.**      | CSTADS126N2-S | Testes / Validação         |
| **Murilo A. S. G. C.** | CSTADS125N4-T | Testes / Apoio técnico     |

---

## 2. Objetivo do grupo

Garantir a **qualidade e a confiabilidade** da solução DoaSync, validando que os módulos desenvolvidos pelas demais equipes (Produto, Campanhas, Doações e Gestão/Dashboard) funcionem corretamente, de forma integrada e de acordo com os requisitos definidos.

O Grupo 5 atua como o **guardião da qualidade** do projeto: é a etapa que antecede a entrega ao cliente, responsável por testar, identificar problemas e assegurar que cada ciclo entregue uma evolução funcional e confiável do sistema.

> O grupo não desenvolve funcionalidades de negócio nem infraestrutura. Seu produto é a **confiança na entrega**: testes, validações e o acompanhamento dos bugs até a correção.

---

## 3. Posicionamento no fluxo do projeto

```text
             PRODUTO
                │
                ↓
        Requisitos e UX
                │
       ┌────────┼────────┐
       ↓        ↓        ↓
   CAMPANHAS  DOAÇÕES  GESTÃO
       │        │        │
       └────────┼────────┘
                ↓
        Módulos desenvolvidos
                │
                ↓
      🟥 TESTES / VALIDAÇÃO / QA   ← Grupo 5
                │
                ↓
        ✔ Entrega validada
                │
                ↓
             🚀 APRESENTAÇÃO
```

O Grupo 5 recebe os módulos prontos e valida se estão aptos a serem apresentados ao cliente.

---

## 4. Áreas de responsabilidade

### 4.1 🧪 Planejamento de testes

* Definição da estratégia de testes do projeto;
* Elaboração de planos de teste por ciclo;
* Criação de casos de teste a partir dos requisitos e critérios de aceite (Grupo 1);
* Priorização do que testar em cada ciclo.

### 4.2 ✅ Execução de testes

* Testes funcionais (verificar se cada funcionalidade atende ao esperado);
* Testes de integração (verificar se os módulos funcionam em conjunto);
* Testes de API (verificar respostas, erros e contratos das APIs entregues);
* Testes de usabilidade (avaliar a experiência de uso, em apoio à UX);
* Testes de regressão (garantir que novas entregas não quebrem funcionalidades existentes).

### 4.3 🐞 Gestão de defeitos (bugs)

* Identificação e registro de bugs;
* Descrição com passos para reprodução;
* Classificação por severidade e prioridade;
* Encaminhamento aos grupos responsáveis;
* Acompanhamento até a resolução;
* Revalidação (reteste) após a correção.

### 4.4 📏 Critérios e padrões de qualidade

* Definição do **Definition of Done** (critérios de "pronto");
* Checklists de validação por entrega;
* Validação final das entregas antes da apresentação ao cliente;
* Registro dos resultados de qualidade de cada ciclo.

---

## 5. Responsabilidades transversais

Além das entregas de teste, o Grupo 5 apoia todo o projeto em:

* **Guardião da qualidade** — validar as entregas dos módulos antes da apresentação;
* **Comunicação de problemas** — reportar bugs e riscos de qualidade às equipes e à gestão;
* **Padrão de qualidade** — divulgar critérios de aceite e Definition of Done para as demais equipes;
* **Apoio à validação com usuários** — auxiliar nos testes de usabilidade e na validação das funcionalidades.

---

## 6. Entradas e saídas do grupo

### Entradas (o que o grupo recebe)

* Requisitos, histórias de usuário e critérios de aceite (Grupo 1 — Produto);
* Módulos e funcionalidades desenvolvidos (Grupos 2, 3 e 4);
* Demandas e prioridades do cliente a cada ciclo.

### Saídas (o que o grupo entrega)

* Plano e casos de teste por ciclo;
* Relatório de execução dos testes;
* Registro e acompanhamento de bugs;
* Checklist de validação (Definition of Done) preenchido;
* Parecer de qualidade sobre a entrega (aprovada / pendências).

---

## 7. Dependências entre equipes

| Depende de                | Motivo                                                        |
| ------------------------- | ------------------------------------------------------------- |
| Grupo 1 (Produto)         | Requisitos e critérios de aceite que servem de base aos testes|
| Grupos 2, 3 e 4           | Módulos e funcionalidades a serem testados e validados        |

| É dependido por           | Motivo                                                        |
| ------------------------- | ------------------------------------------------------------- |
| Grupos 2, 3 e 4           | Recebem os bugs e retornos de qualidade para correção         |
| Equipe de Gestão          | Recebe o parecer de qualidade para liberar a apresentação     |

---

## 8. Critérios de sucesso (Definition of Done do grupo)

Uma entrega do Grupo 5 é considerada concluída quando:

* [ ] Os casos de teste do ciclo foram elaborados a partir dos requisitos;
* [ ] Os testes funcionais e de integração foram executados;
* [ ] Os testes de API das funcionalidades entregues foram executados;
* [ ] Os bugs encontrados foram registrados, classificados e encaminhados;
* [ ] Os bugs críticos foram corrigidos e revalidados;
* [ ] O checklist de Definition of Done foi preenchido;
* [ ] Foi emitido um parecer de qualidade sobre a entrega do ciclo.

---

## 9. Fora do escopo do grupo

Para manter o foco em Qualidade de Software, **não** são responsabilidade do Grupo 5:

* Levantamento de requisitos e definição do produto (Grupo 1);
* Design de interface e UX (Grupo 1 e demais);
* Desenvolvimento das regras de negócio dos módulos (Grupos 2, 3 e 4);
* Modelagem e desenvolvimento do banco de dados;
* Desenvolvimento das APIs;
* Infraestrutura, CI/CD e deploy (DevOps).

> O grupo **testa e valida** essas áreas, mas não é responsável por desenvolvê-las ou mantê-las.

---

## 10. Ferramentas de qualidade (a definir/confirmar com o projeto)

| Finalidade                 | Ferramentas sugeridas                          |
| -------------------------- | ---------------------------------------------- |
| Testes de API              | Postman / Insomnia                             |
| Gestão de bugs e tarefas   | GitHub Issues / Kanban                         |
| Testes automatizados       |(Serenity)Selenium/RESTAssured e Cypress(em estudo)          |
| Registro de casos de teste | Planilha / documento no repositório(de preferência .md)            |

> As ferramentas definitivas devem ser alinhadas com a equipe de gestão e as demais equipes no início do projeto.
