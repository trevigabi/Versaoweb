Crie um projeto UX/UI completo para uma aplicação WEB RESPONSIVA chamada **Pace Route Manager**, a plataforma gerencial do ecossistema Pace Route.

## CONTEXTO DO PRODUTO

O Pace Route é uma plataforma de inteligência comercial para representantes B2B.

O app mobile é utilizado pelo representante comercial para planejar visitas, organizar carteira, receber insights, otimizar rota e aumentar performance comercial.

Esta aplicação WEB é a camada gerencial utilizada pela empresa (gestores comerciais, supervisores, regionais e TI).

A plataforma NÃO deve parecer um sistema de vigilância do representante.

Ela deve parecer uma **central de inteligência comercial e governança operacional**, focada em:

* performance comercial
* cobertura territorial
* inteligência de carteira
* gestão operacional
* qualidade de execução
* estratégia comercial
* parametrização da inteligência da plataforma

O sistema deve transmitir sensação de:

**produto premium + executivo + inteligência operacional + tomada de decisão**

Evitar aparência de ERP legado.

Evitar visual genérico de dashboard SaaS.

Evitar excesso de gráficos.

Evitar poluição visual.

Seguir filosofia:

> Menos informação, mais decisão.

---

# ESTILO VISUAL

Design system moderno, limpo e executivo.

Referências:

* Linear
* Notion
* Stripe Dashboard
* Monday (somente organização)
* Hubspot (somente clareza)
* Apple Human Interface (minimalismo)

Visual:

* clean
* sofisticado
* alta legibilidade
* bastante whitespace
* poucos elementos simultâneos
* cards bem organizados
* grids consistentes
* visual premium

Não usar:

* excesso de ícones
* gráficos coloridos demais
* widgets excessivos
* telas super carregadas

Paleta:

Base neutra.

Azul escuro/navy como cor principal.

Roxo suave como destaque IA.

Verde apenas para performance positiva.

Laranja apenas para alertas.

Cinza muito claro como fundo.

---

# ESTRUTURA DE NAVEGAÇÃO

Criar sidebar lateral fixa.

Menu principal:

1. Dashboard
2. Representantes
3. Clientes
4. Auditoria de Campo
5. Territórios e Metas
6. Inteligência Competitiva
7. Orquestração Comercial
8. Administração

Área superior:

* busca global
* filtros rápidos
* notificações
* perfil do usuário

---

# TELAS A SEREM CRIADAS

Criar TODAS AS TELAS abaixo, já conectadas entre si em fluxo navegável.

---

## 1. DASHBOARD EXECUTIVO (HOME)

Objetivo:

Visão geral da saúde da operação comercial.

Layout:

Topo com KPIs executivos:

* cobertura da carteira
* conversão
* visitas/dia
* tempo médio de visita
* clientes sem visita
* produtividade média por representante

Bloco central:

### Insights IA

Cards inteligentes com alertas executivos.

Exemplos:

“27 clientes premium estão fora do ciclo ideal”

“Região Sul perdeu cobertura nas últimas semanas”

“Representantes da região X reduziram frequência de visitas”

Ao lado:

### Mapa territorial

Heatmap visual de cobertura comercial.

Parte inferior:

### Benchmark operacional

Cards comparativos:

* cobertura
* produtividade
* conversão
* eficiência territorial

Não usar ranking agressivo.

Não parecer controle de vendedor.

---

## 2. REPRESENTANTES

Tela de listagem.

Tabela moderna com:

* nome
* região
* carteira
* score operacional
* conversão
* cobertura
* produtividade
* última atividade

Filtros avançados.

Busca.

Ao clicar no representante:

### PERFIL DO REPRESENTANTE

Criar tela detalhada com abas:

#### Visão Geral

performance + KPIs

#### Cobertura

visitados vs não visitados

#### Território

mapa da região

#### Padrão Operacional

tempo médio de visita
dias mais ativos
comportamento

#### Insights IA

recomendações estratégicas

---

## 3. CLIENTES

Tela de carteira consolidada.

Filtros:

* risco
* sem visita
* potencial
* recompra atrasada
* região
* representante

Layout em tabela + visual clean.

Ao abrir cliente:

### CLIENTE 360 GERENCIAL

Mostrar:

* histórico de compra
* frequência de visita
* timeline de interações
* observações do campo
* fotos
* comportamento comercial
* score de saúde
* oportunidades
* inteligência competitiva

Sem poluição.

Priorizar leitura rápida.

---

## 4. AUDITORIA DE CAMPO

Objetivo:

Governança operacional sem aparência de vigilância.

Tela de timeline.

Lista de visitas realizadas.

Cada card deve mostrar:

* representante
* cliente
* horário
* tempo estimado
* score de evidência

Nunca chamar de “controle”.

Criar seção:

### Evidências de visita

Indicadores discretos:

* geolocalização
* abertura do cliente
* permanência
* interação no app
* registro de observação

Score visual:

Alta / Média / Baixa evidência.

---

## 5. TERRITÓRIOS E METAS

Tela muito visual.

Mapa interativo.

Mostrar:

* regiões
* reps
* clientes órfãos
* sobreposição territorial

Metas:

por região
por carteira
por categoria

Adicionar simulador IA:

“Se aumentar frequência em clientes premium → +8% receita estimada”

---

## 6. INTELIGÊNCIA COMPETITIVA

Dashboard consolidado do campo.

Mostrar:

* concorrentes citados
* objeções recorrentes
* motivos de perda
* tendências regionais
* oportunidades comerciais

Criar análise IA textual.

Exemplo:

“Concorrente X cresceu no Sul”

“Categoria infantil cresce acima da média”

---

## 7. ORQUESTRAÇÃO COMERCIAL

Tela administrativa avançada.

Objetivo:

Configurar pesos invisíveis do algoritmo de priorização da rota.

Criar interface premium com sliders.

Pesos configuráveis:

* recompra
* alto ticket
* cliente parado
* potencial
* categoria prioritária
* cluster regional
* inadimplência
* sazonalidade

Mostrar preview do impacto.

Mensagem:

“Como a IA irá priorizar clientes”

Nunca usar linguagem de manipulação.

---

## 8. ADMINISTRAÇÃO

Tela de gestão técnica.

Criar seções:

### Usuários e permissões

Perfis:

* admin
* gestor
* regional
* supervisor
* analista

### Escopo de dados

Configurar o que reps acessam.

### Formulários de visita

Builder simples.

### Regras IA

Parametrização de gatilhos.

Exemplo:

Cliente sem visita há 45 dias → alerta de recuperação.

### Gamificação (backlog)

### Campanhas (backlog)

Mostrar apenas placeholders futuros.

---

# DIRETRIZES IMPORTANTES

A experiência precisa parecer:

**software premium de inteligência comercial**

e NÃO:

❌ ERP
❌ CRM legado
❌ dashboard genérico
❌ sistema policialesco de representante

O foco é:

> transformar dados operacionais em decisão executiva.

Gerar desktop first, responsivo.

Criar componentes reutilizáveis.

Criar sistema visual consistente entre todas as telas.

Adicionar placeholders inteligentes para gráficos e mapas.

Criar fluxo navegável entre páginas.
