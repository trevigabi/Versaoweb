# Plan: Unificar Direcionamento + Briefing numa tela única por estratégia

## Context

Atualmente o módulo de Direcionamento comercial tem dois fluxos separados que compartilham os mesmos 6 modos de estratégia (Crescimento, Recuperação, Rentabilidade, Coleção, Cobertura, Personalizado):

- **SteeringRoute** → lista de regras de direcionamento (scope + mode + status)
- **SteeringRuleEditor** → editor de uma regra (sliders de dimensão, impacto, before/after)
- **SteeringBriefing** → lista e editor de briefings (instruções contextuais por estratégia)

O usuário quer unificar esses fluxos: ao criar/editar uma estratégia, o editor único deve conter tanto o **Direcionamento** (configuração de pesos/dimensões) quanto o **Briefing** (instrução textual) — vinculados à mesma estratégia — em abas ou etapas dentro da mesma tela. O topo do editor mantém os cards de seleção de modo e configurações gerais; o conteúdo específico fica em **2 abas**.

## Arquivos afetados

| Arquivo | O que muda |
|---|---|
| `src/app/pages/SteeringRoute.tsx` | Lista unificada: cada entrada exibe modo + status do direcionamento + status do briefing vinculado |
| `src/app/pages/SteeringRuleEditor.tsx` | Vira o editor unificado com 2 abas — "Direcionamento" e "Briefing" |
| `src/app/pages/SteeringBriefing.tsx` | A lista standalone é removida; o editor de briefing vira a aba 2 dentro do SteeringRuleEditor |
| `src/app/App.tsx` | Rota `/steering/briefing` pode ser removida ou redirecionar para `/direcionamento` |
| `src/app/pages/CommercialSteering.tsx` | Atualizar badge/count — só 1 entrada agora ("Direcionamentos") |

## Arquitetura da solução

### 1. Tipo de dados unificado

Criar interface `UnifiedStrategy` que combina os campos de `SteeringRule` + `Briefing`:

```typescript
interface UnifiedStrategy {
  id: string
  name: string
  mode: ModeId
  scopeType: ScopeType
  scopeLabel: string
  startDate: string
  endDate: string
  status: 'Ativa' | 'Futura' | 'Expirada'
  // Direcionamento
  weights: Record<string, DimensionWeight>
  // Briefing
  briefingText: string
  briefingStatus: 'Ativo' | 'Rascunho' | 'Encerrado'
  briefingAdherence: number
}
```

### 2. SteeringRoute — lista unificada

- Mantém filtros por status (Todas/Ativas/Futuras/Expiradas)
- Tabela: Estratégia + nome | Modo | Status | Briefing (badge Ativo/Rascunho/—) | Vigência | Ações
- Clicar em qualquer linha → `/direcionamento/:id` (editor unificado)
- Botão "Nova estratégia" → `/direcionamento/nova`

### 3. SteeringRuleEditor — editor unificado com abas

**Estrutura da tela:**

```
[← Voltar]                                    [Salvar rascunho] [Publicar]

[Cards de modo: Crescimento | Recuperação | ... ] ← topo fixo compartilhado
[Nome] [Escopo] [Vigência (chip+popover)]

[Aba: Direcionamento] [Aba: Briefing]
──────────────────────────────────────
Aba 1 — Direcionamento:
  Seção 2: Sliders de alavancas
  Seção 3: Impacto previsto
  Seção 4: Before/After de clientes

Aba 2 — Briefing:
  Campo de texto da instrução (textarea + 500 chars)
  Prévia do briefing (panel direito)
  Estimativa de alcance
```

- Os cards de modo são renderizados **antes** das abas (compartilhados)
- Nome, Escopo e Vigência ficam no header, também compartilhados
- Cada aba mostra apenas seu conteúdo específico
- Estado do formulário é único; salvar grava tudo junto

### 4. Remoção da lista standalone do SteeringBriefing

- `SteeringBriefing.tsx` pode ser simplificado para apenas re-exportar o editor de briefing como aba, ou o arquivo pode ser mantido como redirect
- A rota `/steering/briefing` pode ser mantida apontando para `/direcionamento` com uma query `?tab=briefing` ou simplesmente redirecionar

## Reuso de código existente

- Toda a lógica de pesos/sliders de `SteeringRuleEditor.tsx` é mantida intacta
- `STRATEGY_ICONS`, `STRATEGY_STYLE`, `MODE_WEIGHTS` permanecem como estão
- O componente de briefing da aba 2 vem diretamente do editor que já existe em `SteeringBriefing.tsx` (seção do formulário)
- O chip de vigência com Popover (já implementado no SteeringRuleEditor e SteeringBriefing) é reusado

## Verificação

1. Acessar `/direcionamento` → ver lista com coluna de briefing
2. Clicar numa estratégia → editor abre na aba "Direcionamento"
3. Clicar na aba "Briefing" → ver/editar instrução contextual
4. Salvar → volta para a lista com ambos os status atualizados
5. Criar nova → `/direcionamento/nova` → editor vazio com abas funcionais
6. `/steering/briefing` → redireciona para `/direcionamento`
