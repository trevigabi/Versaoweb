# Pace Route Manager - Wireframes e Especificações Visuais

## Design System

### Cores
```
Primary Navy:    #1E3A5F  ███
AI Blue:         #3B82F6  ███
AI Blue Light:   #DBEAFE  ███
Success Green:   #10B981  ███
Warning Orange:  #F59E0B  ███
Danger Red:      #EF4444  ███
Background:      #F8F9FA  ███
Card White:      #FFFFFF  ███
Border:          #E2E8F0  ███
Muted Text:      #64748B  ███
```

### Tipografia
```
Font Family: Inter
H1: 32px / Semibold / #1A2332
H2: 24px / Semibold / #1A2332
H3: 18px / Semibold / #1A2332
Body: 14px / Regular / #1A2332
Small: 12px / Regular / #64748B
```

### Espaçamento
```
Container Padding: 32px
Section Gap: 32px
Card Padding: 24px
Element Gap: 16px
Card Radius: 8px
```

---

## TELA 1: Dashboard Executivo

### Layout (1440 x 900px)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────┐                                                    [🔍 Busca]  [🔔]  👤 │
│ │   [PR]   │  Dashboard Executivo                                                   │
│ │  Pace    │                                                                         │
│ │  Route   │  ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────────┐│
│ │          │  │ Cobertura Operacional│ │ Performance Conversão│ │  Alertas Ativos ││
│ │ OPERAÇÃO │  │        87%           │ │        34%           │ │        8        ││
│ │ Dashboard│  │ 342 de 394 clientes  │ │ Acima da meta (30%)  │ │ Requer atenção  ││
│ │ Reps     │  └──────────────────────┘ └──────────────────────┘ └─────────────────┘│
│ │ Territór.│                                                                         │
│ │ Clientes │  Ações Prioritárias                                        Ver todas → │
│ │ Auditoria│  ┌─────────────────────────────────────────────────────────────────┐  │
│ │          │  │ ✨ 27 clientes premium fora do ciclo ideal                      │  │
│ │ PERFORMA.│  │    Ação imediata pode recuperar R$ 1.2M em oportunidades       │  │
│ │ Cobertura│  │                                              Ver clientes →     │  │
│ │ Metas    │  └─────────────────────────────────────────────────────────────────┘  │
│ │          │  ┌─────────────────────────────────────────────────────────────────┐  │
│ │ INTELIG. │  │ ✨ Região Sul perdeu 12% de cobertura                           │  │
│ │ Motor IA │  │    Redistribuição de carteira recomendada                       │  │
│ │ Insights │  │                                        Analisar território →     │  │
│ │          │  └─────────────────────────────────────────────────────────────────┘  │
│ │ ADMIN    │                                                                         │
│ │ Usuários │  Visão Regional                                                         │
│ │ Formulár.│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Campanha │  │ São Paulo    │ │ Rio Janeiro  │ │ Sul          │ │ Nordeste     │ │
│ │ Config   │  │ ●            │ │ ●            │ │ ●            │ │ ●            │ │
│ │          │  │ Cobertura 92%│ │ Cobertura 88%│ │ Cobertura 76%│ │ Cobertura 81%│ │
│ └──────────┘  │ Reps: 8      │ │ Reps: 6      │ │ Reps: 7      │ │ Reps: 5      │ │
│               └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Sidebar (240px width, #FFFFFF)**
- Logo: 64px height, navy circle com "PR"
- Grupos de menu com labels: 10px font, uppercase, #64748B
- Items de menu: 14px, padding 12px, hover #F8FAFC
- Item ativo: background #1E3A5F, text #FFFFFF

**Header (64px height, #FFFFFF, border-bottom #E2E8F0)**
- Search input: 400px width, #F1F3F5 background
- Icons: 20px, #64748B

**Cards de Métrica (border-radius 8px)**
- Primeira: border-left 3px solid #10B981
- Segunda: border-left 3px solid #10B981  
- Terceira: border-left 3px solid #F59E0B
- Padding: 24px
- Número principal: 36px/Semibold
- Label: 14px/#64748B
- Sublabel: 12px/#64748B

**Cards de Insights IA**
- Background: #DBEAFE (AI blue light)
- Border: 1px solid #3B82F6 opacity 30%
- Icon sparkles: #3B82F6
- Padding: 20px
- Hover: border opacity 50%

**Cards Regionais**
- White background, border #E2E8F0
- Dot indicator: 8px circle (green/blue/orange based on status)
- Hover: shadow-sm transition

---

## TELA 2: Gestão de Territórios

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  Gestão de Territórios                          [+ Novo Território]     │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │                                                                    │ │
│           │  │                      MAPA TERRITORIAL                              │ │
│           │  │                                                                    │ │
│           │  │         [Visualização interativa de regiões, sobreposições]        │ │
│           │  │                                                                    │ │
│           │  │              🗺️  Mapa mostrando distribuição territorial           │ │
│           │  │                                                                    │ │
│           │  │                                                                    │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  ⚠️ Desequilíbrio territorial detectado                                 │
│           │     Território "Rio de Janeiro - Centro" possui 214 clientes (média 132)│
│           │     Sugestão: redistribuir 45 clientes para otimizar cobertura          │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ TERRITÓRIO        REP.           CLIENTES  COBERTURA  FATURAMENTO  │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ SP - Zona Sul    Carlos Silva      156      92%      R$ 1.2M  ✓   │ │
│           │  │ SP - Zona Leste  Ana Santos         89      88%      R$ 780K  ✓   │ │
│           │  │ RJ - Centro      João Oliveira     214      78%      R$ 1.5M  ⚠   │ │
│           │  │ MG - BH          Maria Costa        67      91%      R$ 520K  ⚡   │ │
│           │  │ PR - Curitiba    Pedro Ferreira    134      88%      R$ 890K  ✓   │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│           │  │ 🗺️ Territórios│ │ 👥 Reps       │ │ 🏢 Clientes   │ │ 📈 Cobertura  │  │
│           │  │      12       │ │      26       │ │    1.847      │ │     87%       │  │
│           │  │   5 regiões   │ │ 100% alocados │ │  1.623 ativos │ │ +3% vs mês    │  │
│           │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Mapa (height 400px)**
- Background: gradient from #F1F3F5 to #E8EBF0
- Overlay decorativo: circles blur opacity 10%
- Center: Icon MapPin 64px + texto descritivo

**Alert Banner (warning)**
- Background: #FEF3C7
- Border: 1px #F59E0B opacity 30%
- Icon: AlertTriangle #92400E
- Padding: 20px

**Tabela**
- Header: background #F1F3F5, 12px uppercase #64748B
- Rows: hover #F8FAFC
- Status badges:
  - Balanceado: green background
  - Sobrecarregado: red background
  - Subutilizado: orange background
- Coverage bar: height 6px, rounded-full

---

## TELA 3: Detalhe do Território

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  ← Voltar para Territórios                                              │
│           │                                                                          │
│           │  São Paulo - Zona Sul                            [✏️ Editar] [💾 Salvar]│
│           │  Território gerenciado por Carlos Silva                                 │
│           │                                                                          │
│           │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐              │
│           │  │ Clientes  │ │ Cobertura │ │Faturamento│ │  Status   │              │
│           │  │   156     │ │    92%    │ │ R$ 1.2M   │ │   Ótimo   │              │
│           │  │142 ativos │ │ +5% vs mês│ │  Mensal   │ │Balanceado │              │
│           │  └───────────┘ └───────────┘ └───────────┘ └───────────┘              │
│           │                                                                          │
│           │  ┌─────────────────────────────────────────┐  ┌──────────────────────┐ │
│           │  │  Mapa do Território                     │  │  Configurações       │ │
│           │  │                                         │  │                      │ │
│           │  │        🗺️  Editor de Área              │  │  Representante:      │ │
│           │  │                                         │  │  [Carlos Silva  ▼]   │ │
│           │  │    Desenhe polígonos, associe CEPs     │  │                      │ │
│           │  │    e defina limites geográficos        │  │  Nome do Território: │ │
│           │  │                                         │  │  [SP - Zona Sul   ]  │ │
│           │  │         ◯ ───────── ◯                  │  │                      │ │
│           │  │         │           │                  │  │  Região:             │ │
│           │  │         ◯ ───────── ◯                  │  │  [São Paulo     ▼]   │ │
│           │  │                                         │  │                      │ │
│           │  │                                         │  ├──────────────────────┤ │
│           │  │ [Desenhar Polígono] [Adicionar CEP]    │  │ ✨ Preview Impacto   │ │
│           │  │ [Importar Arquivo]                     │  │                      │ │
│           │  └─────────────────────────────────────────┘  │ Clientes: 156        │ │
│           │                                               │ Órfãos: 0            │ │
│           │  Clientes Associados (156)                    │ Sobreposições: 3     │ │
│           │  ┌────────────────────────────────────────┐   └──────────────────────┘ │
│           │  │ Cliente 1            CEP: 04567-000    R$ 12.5K/mês               │ │
│           │  │ Cliente 2            CEP: 04568-100    R$ 8.3K/mês                │ │
│           │  │ Cliente 3            CEP: 04569-200    R$ 15.7K/mês               │ │
│           │  └────────────────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## TELA 4: Motor de IA

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  Motor de Inteligência                                                  │
│           │  Configure como a IA prioriza visitas e identifica oportunidades        │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ 💡 Como Funciona a Priorização Inteligente                          │ │
│           │  │                                                                     │ │
│           │  │ O sistema analisa múltiplos fatores para sugerir a sequência ideal │ │
│           │  │ de visitas. Ajuste os pesos abaixo para alinhar a IA com a         │ │
│           │  │ estratégia comercial da sua empresa.                                │ │
│           │  │                                                                     │ │
│           │  │ ⚡ Alterações são aplicadas em tempo real no app móvel              │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  Fatores de Priorização de Visitas                                      │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ Momento de Recompra                                            85  │ │
│           │  │ Prioriza clientes próximos da janela ideal de recompra             │ │
│           │  │ ✓ Aumenta taxa de conversão em 23%                                 │ │
│           │  │ ────────────────────────────────●─────────                         │ │
│           │  │ Não priorizar ←──────────────────────────→ Prioridade máxima       │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Potencial de Receita                                           80  │ │
│           │  │ Clientes com maior ticket médio histórico                          │ │
│           │  │ ✓ Foca em clientes de alto valor                                   │ │
│           │  │ ────────────────────────────●──────────────                        │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Risco de Perda                                                 75  │ │
│           │  │ Clientes com sinais de afastamento ou redução de compras           │ │
│           │  │ ✓ Recuperação proativa de carteira                                 │ │
│           │  │ ──────────────────────●────────────────────                        │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Oportunidade de Crescimento                                    70  │ │
│           │  │ Clientes com padrão de compra abaixo do potencial                  │ │
│           │  │ ✓ Expande receita por cliente                                      │ │
│           │  │ ─────────────────●─────────────────────────                        │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Categoria Estratégica                                          65  │ │
│           │  │ Produtos ou linhas prioritárias definidas pela empresa             │ │
│           │  │ ✓ Alinha execução com estratégia                                   │ │
│           │  │ ───────────────●───────────────────────────                        │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Eficiência Geográfica                                          60  │ │
│           │  │ Proximidade e otimização de rota                                   │ │
│           │  │ ✓ Reduz tempo de deslocamento em 18%                               │ │
│           │  │ ──────────●────────────────────────────────                        │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  [Restaurar Padrões]                          [Salvar Configurações]    │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Banner IA**
- Background: #DBEAFE (light blue)
- Border: #3B82F6 opacity 30%
- Icon sparkles: #3B82F6 24px
- Padding: 24px

**Sliders**
- Track: height 8px, #F1F3F5
- Thumb: 20px circle, #1E3A5F, border 3px white, shadow
- Active thumb: shadow-lg
- Number display: 48px/Semibold tabular-nums
- Label: 16px/Medium
- Description: 14px/#64748B
- Impact text: 12px/#10B981

---

## TELA 5: Auditoria Operacional

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  Auditoria Operacional                                                  │
│           │  Análise de padrões e governança de execução                            │
│           │                                                                          │
│           │  ℹ️  Esta ferramenta identifica padrões operacionais que podem indicar  │
│           │     necessidade de ajustes, treinamento ou suporte.                     │
│           │                                                                          │
│           │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐              │
│           │  │ Visitas   │ │ Execução  │ │Para Revisão││   Alta    │              │
│           │  │  Hoje     │ │  Normal   │ │           │ │Severidade │              │
│           │  │   127     │ │    96%    │ │     4     │ │     2     │              │
│           │  │+12% ontem │ │122 visitas│ │  Atenção  │ │ Investigar│              │
│           │  └───────────┘ └───────────┘ └───────────┘ └───────────┘              │
│           │                                                                          │
│           │  [Todas ▼] [Todos Reps ▼] [Últimos 7 dias ▼]                           │
│           │                                                                          │
│           │  Ocorrências Identificadas                                              │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ 🔴 Check-in fora do raio                    28/05/2026 • 08:30     │ │
│           │  │    Maria Costa • Atacadão Norte                                    │ │
│           │  │    📍 850m do endereço                         [Ver Detalhes]      │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ 🟡 Visita muito curta                        27/05/2026 • 14:20    │ │
│           │  │    Pedro Ferreira • Mercado Central                                │ │
│           │  │    📍 6 minutos                                [Ver Detalhes]      │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ 🔴 Rota não executada                        27/05/2026            │ │
│           │  │    João Oliveira • Multiple (8 clientes)                           │ │
│           │  │    📍 Região Norte                             [Ver Detalhes]      │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ 🟡 Baixa atividade                           26/05/2026            │ │
│           │  │    Ana Santos • ---                                                │ │
│           │  │    📍 Apenas 3 visitas                         [Ver Detalhes]      │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  Fluxo de Investigação                                                  │
│           │  ① Resumo ──→ ② Mapa ──→ ③ Timeline ──→ ④ Evidências                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Info Banner**
- Background: #DBEAFE
- Border: #3B82F6 opacity 30%
- Icon: Info 20px #3B82F6

**Severity Badges**
- Alta: 48px square, #FEE2E2 background, red AlertTriangle icon
- Média: 48px square, #FEF3C7 background, orange Clock icon
- Baixa: 48px square, #F1F3F5 background, gray Info icon

**Occurrence Cards**
- White background, border #E2E8F0
- Hover: background #F8FAFC
- Padding: 24px
- Severity icon: left aligned

---

## TELA 6: Form Builder

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  Formulários de Visita                          [+ Novo Formulário]     │
│           │  Configure questionários personalizados para cada tipo de visita        │
│           │                                                                          │
│           │  ┌──────────────┐  ┌──────────────────────────────────────────────────┐ │
│           │  │ Formulários  │  │ Visita Padrão                  [Preview] [Publicar]│ │
│           │  │              │  │                                                   │ │
│           │  │ ┌──────────┐ │  │ ⋮⋮ Observações da Visita                ✓ Obrig.│ │
│           │  │ │Visita    │ │  │    Texto longo                         [Editar] │ │
│           │  │ │Padrão    │ │  │                                                   │ │
│           │  │ │● Ativo   │ │  │ ⋮⋮ Cliente estava aberto?              ✓ Obrig.│ │
│           │  │ │8 campos  │ │  │    Sim/Não                             [Editar] │ │
│           │  │ │2 dias    │ │  │                                                   │ │
│           │  │ └──────────┘ │  │ ⋮⋮ Nível de Estoque                             │ │
│           │  │              │  │    Múltipla escolha                    [Editar] │ │
│           │  │ ┌──────────┐ │  │                                                   │ │
│           │  │ │Auditoria │ │  │ ⋮⋮ Foto da Fachada                     ✓ Obrig.│ │
│           │  │ │PDV       │ │  │    Foto                                [Editar] │ │
│           │  │ │● Ativo   │ │  │                                                   │ │
│           │  │ │12 campos │ │  ├───────────────────────────────────────────────────┤ │
│           │  │ │1 semana  │ │  │ Adicionar Campo                                   │ │
│           │  │ └──────────┘ │  │                                                   │ │
│           │  │              │  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │ │
│           │  │ ┌──────────┐ │  │ │ Aa      │ │ ☑       │ │ ☰       │ │ 📷      │ │ │
│           │  │ │Prospecção│ │  │ │ Texto   │ │Múltipla │ │Checklist│ │ Foto    │ │ │
│           │  │ │○ Rascunho│ │  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │ │
│           │  │ │6 campos  │ │  └───────────────────────────────────────────────────┘ │
│           │  │ │3 dias    │ │                                                        │
│           │  │ └──────────┘ │  Configurações                                         │
│           │  │              │  ┌───────────────────────────────────────────────────┐ │
│           │  └──────────────┘  │ ☑ Obrigar foto da fachada                         │ │
│           │                    │   Representante não pode finalizar sem foto       │ │
│           │                    ├───────────────────────────────────────────────────┤ │
│           │                    │ ☑ Permitir visita offline                         │ │
│           │                    │   Dados sincronizam quando conectar               │ │
│           │                    └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Form List (left column 320px)**
- Cards: white, border #E2E8F0, padding 16px
- Active card: border #1E3A5F, background #F8FAFC
- Status badge: 
  - Ativo: green dot + text
  - Rascunho: orange dot + text

**Form Editor (main area)**
- Field cards: background #F1F3F5, padding 16px
- Drag handle: opacity 0 → 100 on hover
- Required badge: #FEE2E2 background, #991B1B text

**Field Type Buttons**
- Border #E2E8F0, padding 12px
- Icon: 20px, #1E3A5F
- Hover: background #F8FAFC

---

## TELA 7: Campanhas

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  Campanhas e Incentivos                          [+ Nova Campanha]      │
│           │  Gestão de metas, campanhas e programas de incentivo                    │
│           │                                                                          │
│           │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                    │
│           │  │🎯 Campanhas  │ │📅 Agendadas   │ │📈 Performance │                    │
│           │  │   Ativas     │ │              │ │    Média      │                    │
│           │  │      2       │ │      1       │ │     56%       │                    │
│           │  └──────────────┘ └──────────────┘ └──────────────┘                    │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ Expansão Q2 2026                                       ● Ativa     │ │
│           │  │ 📅 01/04 - 30/06/2026    🎯 Meta de Vendas       [Ver Detalhes]   │ │
│           │  │                                                                    │ │
│           │  │ Meta: R$ 2.5M              Progresso:                         67% │ │
│           │  │ ─────────────────────────────────────────●──────────────────       │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ Black Friday Premium                                  ○ Agendada  │ │
│           │  │ 📅 15/11 - 30/11/2026    🎯 Incentivo            [Ver Detalhes]   │ │
│           │  │                                                                    │ │
│           │  │ Meta: +30% vendas          Progresso:                          0% │ │
│           │  │ ─────────────────────────────────────────────────────────────      │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ Recuperação Sul                                       ● Ativa     │ │
│           │  │ 📅 01/05 - 31/05/2026    🎯 Regional             [Ver Detalhes]   │ │
│           │  │                                                                    │ │
│           │  │ Meta: 85% cobertura        Progresso:                         45% │ │
│           │  │ ────────────────────●─────────────────────────────────────────     │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │                         ➕                                          │ │
│           │  │               Criar Nova Campanha                                  │ │
│           │  │   Configure metas, períodos, regras de incentivo e acompanhe       │ │
│           │  │                 resultados em tempo real                           │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Campaign Cards**
- White background, border #E2E8F0
- Padding: 24px
- Status badge:
  - Ativa: green circle + text
  - Agendada: orange circle + text
- Progress bar: height 12px, rounded-full
  - 70%+: green
  - 40-70%: blue
  - <40%: orange

**Empty State**
- Border: dashed 2px #E2E8F0
- Opacity: 60%
- Icon: 64px circle, #F1F3F5 background
- Text: center aligned, #64748B

---

## TELA 8: Clientes

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar] │  Clientes                                              [↓ Exportar]     │
│           │  Carteira consolidada e gestão de relacionamento                        │
│           │                                                                          │
│           │  [Todos 487] [Em Risco 23] [Sem Visita 30d+ 45] [Alto Potencial 67]    │
│           │                                                                          │
│           │  [🔍 Buscar cliente, região ou representante...]  [⚙️ Filtros Avançados]│
│           │                                                                          │
│           │  ┌────────────────────────────────────────────────────────────────────┐ │
│           │  │ CLIENTE              CAT.    REP.        ÚVLT. VIS  FREQ  RECEITA  │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Supermercado Estrela Premium Carlos Silva 2d atrás  Alta  R$ 45.2K│ │
│           │  │                                                            ● Ativo │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Distribuidora Central Premium Ana Santos  15d atrás Média  R$ 38.5K│ │
│           │  │                                                          ● Atenção │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Mercado São João    Standard João Oliv.   5d atrás  Média  R$ 22.3K│ │
│           │  │                                                            ● Ativo │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Atacadão Norte      Premium Maria Costa  28d atrás  Baixa  R$ 52.1K│ │
│           │  │                                                            ● Risco │ │
│           │  ├────────────────────────────────────────────────────────────────────┤ │
│           │  │ Empório Gourmet     Standard Pedro Ferr.  7d atrás  Média  R$ 18.7K│ │
│           │  │                                                            ● Ativo │ │
│           │  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Especificações

**Filter Pills**
- Background: white, border #E2E8F0
- Active: background #1E3A5F, text white
- Padding: 8px 16px, border-radius 999px
- Count: opacity 70%

**Category Badges**
- Premium: #1E3A5F10 background (navy opacity 10%), #1E3A5F text
- Standard: #F1F3F5 background, #1A2332 text
- Small padding: 4px 8px, border-radius 4px

**Status Badges (right aligned)**
- Ativo: green circle + green text
- Atenção: orange circle + orange text  
- Risco: red circle + red text
- Font size: 12px

**Table**
- Header: background #F1F3F5, 10px uppercase
- Row height: 64px
- Hover: background #F8FAFC
- Client name: clickable, #1E3A5F, hover underline

---

## Componentes Globais Reutilizáveis

### Buttons

**Primary**
```
Background: #1E3A5F
Text: #FFFFFF
Padding: 10px 20px
Border-radius: 8px
Font: 14px/Medium
Hover: #2C4E75
```

**Secondary**
```
Background: transparent
Border: 1px #E2E8F0
Text: #1A2332
Padding: 10px 20px
Hover: background #F8FAFC
```

### Input Fields
```
Background: #FFFFFF
Border: 1px #E2E8F0
Padding: 10px 12px
Border-radius: 8px
Font: 14px/Regular
Focus: ring 2px #1E3A5F opacity 20%
Placeholder: #94A3B8
```

### Search Bar
```
Background: #F1F3F5
Border: none
Padding: 10px 12px 10px 40px
Icon: 16px #64748B absolute left 12px
Width: 100% max 600px
```

### Cards
```
Background: #FFFFFF
Border: 1px #E2E8F0
Border-radius: 8px
Padding: 24px
Shadow: none
Hover: shadow-sm (0 1px 3px rgba(0,0,0,0.05))
```

---

## Grid System

```
Container: max-width 1400px, padding 32px
Columns: 12 column grid, gap 24px

Layout patterns:
- 1 column: full width
- 2 columns: 1fr 1fr
- 3 columns: 1fr 1fr 1fr  
- 4 columns: 1fr 1fr 1fr 1fr
- Sidebar + Main: 240px 1fr
- 2:1 ratio: 2fr 1fr
```

---

## Responsive Breakpoints

```
Desktop:  1440px+ (default)
Laptop:   1024px - 1439px
Tablet:   768px - 1023px
Mobile:   < 768px

Mobile adjustments:
- Sidebar: collapse to icons only or bottom nav
- Grid: single column
- Cards: full width
- Table: scroll horizontal or card view
- Padding: 16px instead of 32px
```

---

## Animations & Transitions

```css
/* All interactive elements */
transition: all 0.2s ease;

/* Hover states */
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(0,0,0,0.08);

/* Loading states */
opacity: 0.6;
cursor: wait;

/* Page transitions */
fade: opacity 0.3s ease;
```

---

## Acessibilidade

- Contraste mínimo: 4.5:1 para texto
- Focus visible: ring 2px #1E3A5F
- Estados interativos claros
- Labels descritivos
- Navegação por teclado
- ARIA labels quando necessário

---

FIM DOS WIREFRAMES
