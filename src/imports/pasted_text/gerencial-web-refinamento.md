REFINAMENTO DO PROJETO JÁ EXISTENTE — **PACE ROUTE GERENCIAL WEB**

IMPORTANTE: ESTE PROMPT NÃO É PARA RECOMEÇAR O PROJETO.

UTILIZE O PROJETO JÁ GERADO COMO BASE E EVOLUA A ARQUITETURA EXISTENTE.

NÃO DESCARTAR O QUE JÁ FOI CRIADO.

O objetivo agora é **complementar, organizar, limpar e aprofundar o sistema gerencial**, trazendo módulos que ainda não foram contemplados e refinando a experiência para um padrão enterprise premium.

====================================================================
DIRETRIZ PRINCIPAL
==================

O sistema ficou muito próximo de dashboards genéricos de CRM/ERP.

PRECISA EVOLUIR PARA UM CONSOLE DE GESTÃO DE OPERAÇÃO DE CAMPO COM IA.

Reduzir poluição visual.

Reduzir excesso de gráficos.

Reduzir excesso de cards.

Criar mais hierarquia de informação.

Mais clareza executiva.

Mais “menos é mais”.

O produto deve parecer:

* plataforma enterprise moderna
* console operacional inteligente
* sistema premium B2B
* software de alta governança

NÃO parecer:

❌ CRM genérico
❌ dashboard de startup
❌ ERP antigo
❌ BI cheio de gráficos
❌ sistema gamificado infantil

====================================================================
AJUSTE DE UX GLOBAL
===================

Aplicar em TODAS as telas:

1. Reduzir densidade visual
2. Criar mais respiro (whitespace)
3. Melhorar hierarquia tipográfica
4. Consolidar cards repetitivos
5. Evitar repetição de informação
6. Criar drill-down ao invés de mostrar tudo de uma vez
7. Priorizar tomada de decisão
8. Tornar navegação mais objetiva

Padrão desejado:

* sidebar compacta
* header clean
* breadcrumbs
* filtros inteligentes
* contextualização clara
* foco na produtividade

====================================================================
COMPLEMENTAR O PROJETO COM ESTES MÓDULOS
========================================

Adicionar e detalhar as telas abaixo:

---

1. GESTÃO DE TERRITÓRIOS (ALTA PRIORIDADE)

---

Criar módulo completo.

Necessidade:

Representantes comerciais possuem territórios exclusivos.

Criar telas para:

* listagem de territórios
* mapa territorial
* desenhar área no mapa
* polígono livre
* associação de CEP/cidade/região
* vincular representante
* preview de impacto

Mostrar:

* quantidade de clientes
* cobertura
* faturamento histórico
* clientes ativos/inativos
* desequilíbrio territorial

Adicionar inteligência:

Sistema sugere rebalanceamento quando:

Exemplo:
Rep A → 180 clientes
Rep B → 60 clientes

Criar experiência visual elegante.

Referência:
Mapbox + Uber Maps + Hubspot territory management.

O mapa precisa ser protagonista.

---

2. AUDITORIA DE CAMPO (ALTA PRIORIDADE)

---

Adicionar módulo robusto.

Objetivo:
Auditar execução sem parecer sistema policial.

Criar:

Visão consolidada de ocorrências.

Ocorrências:

* check-in fora do raio
* visita curta
* rota não executada
* baixa atividade
* ausência de cobertura
* visitas inconsistentes
* comportamento anômalo

Filtros:

* período
* representante
* região
* severidade
* tipo de ocorrência

Criar fluxo investigativo:

Resumo → detalhe → evidência.

Exemplo:

Card resumido
↓
Abrir detalhe
↓
Mapa
↓
Timeline
↓
Evidências

Visual clean e profissional.

Sem excesso de vermelho.

Sem aparência de punição.

---

3. CONFIGURAÇÃO DE ESCOPOS E DADOS

---

Adicionar módulo administrativo.

Objetivo:
Controlar o que cada representante visualiza.

Permitir:

* escopo territorial
* carteira visível
* filtros de acesso
* regras de cliente
* políticas de visibilidade

Criar UX simples.

Parece configuração enterprise.

Não técnica.

---

4. MOTOR DE IA / REGRAS INVISÍVEIS

---

Adicionar módulo de parametrização.

ALTAMENTE IMPORTANTE.

O sistema utiliza IA para:

* score de compra
* churn
* priorização de rota
* next best action
* roteirização inteligente

Mas os critérios são invisíveis ao representante.

Criar interface para gestor parametrizar:

* pesos de priorização
* score de potencial
* risco de churn
* prioridade por segmento
* clientes estratégicos
* fatores comerciais
* critérios de recomendação

IMPORTANTE:

NÃO parecer painel técnico de Machine Learning.

Evitar:
gráficos técnicos
confiança estatística
features complexas

A linguagem deve ser de negócio.

Exemplo:
“Priorizar clientes com maior chance de recompra”
em vez de
“Weight model coefficient”

Mostrar explicabilidade simples.

---

5. INTELIGÊNCIA COMPETITIVA CONSOLIDADA

---

Adicionar módulo analítico executivo.

Mostrar:

* regiões pouco exploradas
* regiões sem cobertura
* clientes sem visita
* clusters de comportamento
* oportunidades regionais
* concentração de vendas
* padrões territoriais

Criar visual limpo.

Poucos gráficos.

Mais insight.

Menos dashboard.

---

6. FORM BUILDER DE VISITA

---

Adicionar configurador no-code.

Objetivo:
Empresa consegue montar formulários de visita sem TI.

Permitir:

* perguntas
* checklist
* fotos obrigatórias
* obrigatoriedade
* tipos de visita
* regras condicionais
* templates

Criar experiência semelhante:

Typeform builder
+
Notion database
+
Monday forms

Clean.

Muito organizado.

---

7. CAMPANHAS E INCENTIVOS (PREPARAÇÃO)

---

Adicionar módulo preparado para evolução futura.

Necessário:

* estrutura de campanhas
* incentivo por meta
* regras
* períodos
* performance

IMPORTANTE:

Não expor dados sensíveis da empresa ao representante.

Esse módulo é interno do gestor.

Sem gamificação exagerada.

Visual executivo.

---

8. GAMIFICAÇÃO (BACKLOG CONTROLADO)

---

Adicionar arquitetura discreta.

Permitir configurar:

* ranking
* badges
* objetivos
* pontuação

MAS:

Visual enterprise.

Nada infantil.

Nada colorido demais.

Nada estilo app fitness.

====================================================================
REVISÃO DE NAVEGAÇÃO
====================

Revisar menu do sistema.

Agrupar em macro áreas:

OPERAÇÃO

* Dashboard
* Representantes
* Territórios
* Clientes
* Auditoria

PERFORMANCE

* Cobertura
* Conversão
* Metas
* Rankings

INTELIGÊNCIA

* IA
* Insights
* Inteligência competitiva

ADMINISTRAÇÃO

* Usuários
* Escopos
* Formulários
* Configurações

BACKLOG / EVOLUÇÃO

* Campanhas
* Gamificação

====================================================================
RESULTADO ESPERADO
==================

Não recriar.

Evoluir.

Refinar.

Completar.

Deixar mais clean, mais maduro e mais enterprise.

Pensar como um produto que será apresentado para DIRETORIA DE TI e negócio.

FOCO:
clareza > governança > produtividade > inteligência > estética
