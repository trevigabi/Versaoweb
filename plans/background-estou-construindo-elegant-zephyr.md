# Plan: Clonar e sincronizar repositório GitHub com o workspace

## Context
O usuário tem o projeto Pace Route Manager em https://github.com/trevigabi/Versaoweb e quer trazer o código do GitHub para o workspace atual (`/workspaces/default/code`), substituindo os arquivos placeholder pelo código real do repositório.

## Abordagem

O workspace já tem a estrutura base do Figma Make (vite.config.ts, package.json, pnpm-workspace.yaml, node_modules, etc.). O repositório GitHub tem os mesmos arquivos de configuração + o código real em `src/`. 

A estratégia mais segura é **copiar apenas os arquivos de código fonte** do repositório, sem substituir as configs do ambiente local que podem diferir.

### Passos

1. **Inicializar git no workspace** e adicionar o remote do GitHub como origin
   ```bash
   git init
   git remote add origin https://github.com/trevigabi/Versaoweb.git
   git fetch origin main
   ```

2. **Fazer checkout apenas dos arquivos de código** (src/, guidelines/), sem sobrescrever configs locais que podem ser diferentes:
   ```bash
   git checkout origin/main -- src/ guidelines/ WIREFRAMES.md
   ```

3. **Verificar se package.json difere** entre o local e o remoto — se o remoto tiver dependências extras, instalar com `pnpm install`.

4. **Confirmar que o app compila** rodando `pnpm dev` brevemente para checar erros de build.

## Arquivos afetados
- `src/app/App.tsx` — substituído pelo real
- `src/app/pages/*.tsx` — todos os 17 arquivos de páginas
- `src/app/components/` — Layout, PageHeader, KPICard, AIInsightCard, etc.
- `src/styles/` — tokens e fontes
- `guidelines/` — documentação de design

## Verificação
Após o clone, confirmar que:
- `src/app/pages/OccurrenceDetail.tsx` existe com o conteúdo completo (5 tipos de ocorrência)
- `src/app/pages/Coverage.tsx` tem o sistema de abas implementado
- `src/app/pages/Goals.tsx` tem o sistema de abas implementado
- O app sobe sem erros de compilação
