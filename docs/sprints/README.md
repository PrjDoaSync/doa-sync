# Planejamento de Sprints — DoaSync

> **Situação:** zero código implementado, 1 mês para entrega.
> **Janela:** 4 sprints de ~1 semana | Data de referência: 25/10/2026

---

## Visão Geral

| Sprint | Período | Foco principal |
|---|---|---|
| Sprint 1 | 27/10 – 02/11 | Base: infra, banco, autenticação, entidades |
| Sprint 2 | 03/11 – 09/11 | Campanhas, doações, perfil, front auth |
| Sprint 3 | 10/11 – 16/11 | Dashboard, gestão admin, front campanhas e doações |
| Sprint 4 | 17/11 – 23/11 | Integração E2E, testes, CI/CD, ajustes e deploy |

---

## Dependências críticas entre stacks

```
[Infra/DB] ──► [Backend Auth] ──► [Frontend Auth]
                     │
                     ├──► [Backend Entidades] ──► [Frontend Entidades]
                     │
                     ├──► [Backend Campanhas] ──► [Frontend Campanhas]
                     │
                     └──► [Backend Doações] ──► [Frontend Doações]
                                                      │
                                              [Backend Dashboard] ──► [Frontend Dashboard]
```

O backend **bloqueia** o frontend em cada módulo. A equipe de front deve mockar as respostas da API nos primeiros dias de cada sprint para não ficar parada.

---

## Arquivos por stack

- [`sprint-backend.md`](./sprint-backend.md) — Java / Spring Boot
- [`sprint-frontend.md`](./sprint-frontend.md) — Next.js / React
- [`sprint-banco.md`](./sprint-banco.md) — PostgreSQL / Flyway / Docker
- [`sprint-qa.md`](./sprint-qa.md) — Testes, CI/CD, qualidade

---

## Critério de "pronto" global

Uma entrega só é considerada concluída quando:
1. Build passa (`./mvnw package` / `npm run build`)
2. Testes automatizados verdes no pipeline
3. PR revisado e aprovado por ao menos 1 membro
4. Documentação do endpoint/componente atualizada

---

## Riscos principais

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Backend atrasado bloqueia front | Alta | Alto | Front usa mocks/MSW desde o dia 1 |
| Sem gateway de pagamento (PV01) | Alta | Médio | Manter pagamento simulado no MVP |
| Flyway não configurado antes do deploy | Média | Alto | Configurar na Sprint 1 junto com o banco |
| Integração entre módulos com contratos divergentes | Média | Alto | Seguir `rotas-api.md` sem improvisar |
| Falta de membro disponível | Média | Alto | Cada tarefa tem no máximo 2 dias |
