import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  TrendingUp, RefreshCw, DollarSign, Map, Settings2,
  Users2, Package, CreditCard, BarChart2, Gem,
  ChevronDown, ChevronUp, ArrowRight, Info, Calendar,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

type DimensionLevel = 'Alta' | 'Média' | 'Baixa';

interface DimensionWeight {
  pct: number;
  level: DimensionLevel;
}

interface ImpactProfile {
  label: string;
  description: string;
  pct: number;
  positive: boolean;
  color: string;
}

type ClientType = 'alto' | 'churn' | 'colecao' | 'outros';

// ── Static data ──────────────────────────────────────────────────────────────

const MODES: { id: string; label: string; description: string; icon: LucideIcon }[] = [
  { id: 'Crescimento',   label: 'Crescimento',   description: 'Aumentar vendas e explorar oportunidades', icon: TrendingUp },
  { id: 'Recuperação',   label: 'Recuperação',   description: 'Recuperar clientes e reativar carteira',   icon: RefreshCw },
  { id: 'Coleção',       label: 'Coleção',       description: 'Impulsionar coleção nova e mix',           icon: Gem },
  { id: 'Rentabilidade', label: 'Rentabilidade', description: 'Aumentar ticket e melhorar margem',        icon: DollarSign },
  { id: 'Cobertura',     label: 'Cobertura',     description: 'Aumentar presença e cobertura territorial',icon: Map },
  { id: 'Personalizado', label: 'Personalizado', description: 'Definir minha própria estratégia',         icon: Settings2 },
];

const DIMENSIONS: { id: string; label: string; description: string; icon: LucideIcon; color: string }[] = [
  { id: 'retencao',    label: 'Retenção de carteira',  description: 'Foco em evitar churn e recuperar clientes',          icon: Users2,    color: '#3B6D11' },
  { id: 'performance', label: 'Performance comercial', description: 'Foco em aumentar vendas e ticket médio',              icon: BarChart2,  color: '#185FA5' },
  { id: 'mix',         label: 'Mix e coleção',         description: 'Foco em coleção nova, mix e cross-sell',              icon: Gem,        color: '#7C3AED' },
  { id: 'credito',     label: 'Crédito e risco',       description: 'Foco em inadimplência e saúde financeira',            icon: CreditCard, color: '#B45309' },
  { id: 'cobertura',   label: 'Cobertura territorial', description: 'Foco em frequência de visita e áreas descobertas',   icon: Map,        color: '#0E7490' },
];

const CRITERIA_DETAIL: Record<string, string[]> = {
  retencao:    ['Risco de inativação', 'Cliente reativável', 'NPS baixo na última visita'],
  performance: ['Maior ticket histórico', 'Probabilidade alta de fechamento', 'Queda de volume no último ciclo'],
  mix:         ['Mix gap — categoria não explorada', 'Nova coleção não apresentada'],
  credito:     ['Limite disponível alto', 'Inadimplência recente'],
  cobertura:   ['Região pouco visitada no mês', 'Cliente sem visita há mais de 30 dias'],
};

const DEFAULT_WEIGHTS: Record<string, DimensionWeight> = {
  retencao:    { pct: 20, level: 'Média' },
  performance: { pct: 20, level: 'Média' },
  mix:         { pct: 20, level: 'Média' },
  credito:     { pct: 20, level: 'Média' },
  cobertura:   { pct: 20, level: 'Média' },
};

const MODE_WEIGHTS: Record<string, Record<string, DimensionWeight>> = {
  Crescimento: {
    retencao:    { pct: 30, level: 'Alta'  },
    performance: { pct: 25, level: 'Média' },
    mix:         { pct: 25, level: 'Alta'  },
    credito:     { pct: 10, level: 'Baixa' },
    cobertura:   { pct: 10, level: 'Média' },
  },
  Recuperação: {
    retencao:    { pct: 40, level: 'Alta'  },
    performance: { pct: 20, level: 'Média' },
    mix:         { pct: 10, level: 'Baixa' },
    credito:     { pct: 15, level: 'Média' },
    cobertura:   { pct: 15, level: 'Baixa' },
  },
  Rentabilidade: {
    retencao:    { pct: 15, level: 'Baixa' },
    performance: { pct: 35, level: 'Alta'  },
    mix:         { pct: 20, level: 'Média' },
    credito:     { pct: 25, level: 'Alta'  },
    cobertura:   { pct: 5,  level: 'Baixa' },
  },
  Cobertura: {
    retencao:    { pct: 15, level: 'Baixa' },
    performance: { pct: 15, level: 'Baixa' },
    mix:         { pct: 20, level: 'Média' },
    credito:     { pct: 10, level: 'Baixa' },
    cobertura:   { pct: 40, level: 'Alta'  },
  },
  Coleção: {
    retencao:    { pct: 15, level: 'Baixa' },
    performance: { pct: 25, level: 'Alta'  },
    mix:         { pct: 35, level: 'Alta'  },
    credito:     { pct: 10, level: 'Baixa' },
    cobertura:   { pct: 15, level: 'Média' },
  },
  Personalizado: { ...DEFAULT_WEIGHTS },
};

const MODE_IMPACT: Record<string, ImpactProfile[]> = {
  Crescimento: [
    { label: 'Clientes com potencial de coleção nova', description: 'Maior chance de compra da nova coleção',       pct: 38, positive: true,  color: '#185FA5' },
    { label: 'Clientes com risco de churn',            description: 'Clientes com sinais de perda de compra',       pct: 24, positive: true,  color: '#3B6D11' },
    { label: 'Clientes com maior ticket potencial',    description: 'Histórico e perfil de maior volume',           pct: 18, positive: true,  color: '#3B6D11' },
    { label: 'Clientes com gap de mix',                description: 'Oportunidades de cross-sell e aumento de mix', pct: 16, positive: true,  color: '#7C3AED' },
    { label: 'Clientes inadimplentes',                 description: 'Serão menos priorizados nas rotas',            pct: 12, positive: false, color: '#B45309' },
  ],
  Recuperação: [
    { label: 'Clientes em risco de inativação',        description: 'Próximos da janela de inatividade',            pct: 45, positive: true,  color: '#3B6D11' },
    { label: 'Clientes inativos reativáveis',          description: 'Histórico de alto faturamento',                pct: 32, positive: true,  color: '#3B6D11' },
    { label: 'Clientes com NPS baixo',                 description: 'Insatisfação registrada recentemente',         pct: 22, positive: true,  color: '#B45309' },
    { label: 'Clientes sem compra há 60+ dias',        description: 'Fora da frequência esperada',                  pct: 18, positive: true,  color: '#3B6D11' },
    { label: 'Novos clientes sem histórico',           description: 'Priorizados apenas em cobertura básica',       pct: 15, positive: false, color: '#6B7280' },
  ],
  Rentabilidade: [
    { label: 'Clientes com maior margem',              description: 'Alto ticket e baixo risco de crédito',         pct: 42, positive: true,  color: '#3B6D11' },
    { label: 'Clientes com limite disponível',         description: 'Crédito liberado para novos pedidos',          pct: 28, positive: true,  color: '#185FA5' },
    { label: 'Alta probabilidade de fechamento',       description: 'Score de propensão acima de 80%',              pct: 20, positive: true,  color: '#3B6D11' },
    { label: 'Clientes em risco financeiro',           description: 'Pagamentos em atraso nos últimos 60 dias',     pct: 18, positive: false, color: '#B45309' },
    { label: 'Clientes de baixo volume histórico',     description: 'Pedidos abaixo da média da carteira',          pct: 14, positive: false, color: '#6B7280' },
  ],
  Cobertura: [
    { label: 'Regiões com baixa cobertura',            description: 'Menos de 30% de cobertura no ciclo',           pct: 48, positive: true,  color: '#0E7490' },
    { label: 'Clientes sem visita há 30+ dias',        description: 'Fora da frequência esperada de visita',        pct: 35, positive: true,  color: '#3B6D11' },
    { label: 'Áreas com potencial inexplorado',        description: 'Alta concentração de não visitados',           pct: 25, positive: true,  color: '#0E7490' },
    { label: 'Clientes de alto ticket',                description: 'Reduzidos em prol da cobertura',              pct: 20, positive: false, color: '#6B7280' },
    { label: 'Clientes já na frequência ideal',        description: 'Mantidos na rotina atual',                     pct: 12, positive: false, color: '#6B7280' },
  ],
  Coleção: [
    { label: 'Sem apresentação da coleção atual',      description: 'Ainda não receberam a coleção atual',          pct: 52, positive: true,  color: '#7C3AED' },
    { label: 'Clientes com gap de mix',                description: 'Nunca compraram determinada linha',            pct: 30, positive: true,  color: '#7C3AED' },
    { label: 'Maior ticket histórico',                 description: 'Perfil de alto volume de compra',              pct: 22, positive: true,  color: '#3B6D11' },
    { label: 'Clientes inadimplentes',                 description: 'Apresentação da coleção postergada',           pct: 16, positive: false, color: '#B45309' },
    { label: 'Clientes já atualizados',                description: 'Já receberam apresentação completa',           pct: 10, positive: false, color: '#6B7280' },
  ],
  Personalizado: [
    { label: 'Clientes priorizados pela configuração', description: 'Baseado nos pesos definidos manualmente',      pct: 30, positive: true,  color: '#185FA5' },
    { label: 'Clientes de alta atenção',               description: 'Indicadores de risco ou oportunidade',        pct: 25, positive: true,  color: '#3B6D11' },
    { label: 'Clientes de oportunidade imediata',      description: 'Propensão de compra identificada',            pct: 20, positive: true,  color: '#7C3AED' },
    { label: 'Clientes de manutenção',                 description: 'Frequência reduzida temporariamente',         pct: 15, positive: false, color: '#6B7280' },
    { label: 'Clientes sem critério definido',         description: 'Aguardando configuração mais específica',     pct: 10, positive: false, color: '#6B7280' },
  ],
};

const CLIENT_COLORS: Record<ClientType, { bg: string; text: string; label: string }> = {
  alto:    { bg: '#EAF3DE', text: '#3B6D11', label: 'Alto potencial' },
  churn:   { bg: '#FCEBEB', text: '#A32D2D', label: 'Risco de churn' },
  colecao: { bg: '#E6F1FB', text: '#185FA5', label: 'Potencial de coleção' },
  outros:  { bg: '#F3F4F6', text: '#6B7280', label: 'Outros' },
};

const BEFORE_ROUTE: { letter: string; type: ClientType }[] = [
  { letter: 'C', type: 'outros'  },
  { letter: 'A', type: 'alto'    },
  { letter: 'B', type: 'outros'  },
  { letter: 'D', type: 'churn'   },
  { letter: 'E', type: 'outros'  },
  { letter: 'G', type: 'alto'    },
  { letter: 'H', type: 'outros'  },
  { letter: 'I', type: 'colecao' },
  { letter: 'J', type: 'outros'  },
];

const AFTER_ROUTE: Record<string, { letter: string; type: ClientType }[]> = {
  Crescimento: [
    { letter: 'A', type: 'alto'    }, { letter: 'B', type: 'colecao' }, { letter: 'F', type: 'colecao' },
    { letter: 'D', type: 'churn'   }, { letter: 'K', type: 'alto'    }, { letter: 'L', type: 'colecao' },
    { letter: 'M', type: 'colecao' }, { letter: 'E', type: 'outros'  }, { letter: 'N', type: 'outros'  },
  ],
  Recuperação: [
    { letter: 'D', type: 'churn'   }, { letter: 'E', type: 'churn'   }, { letter: 'A', type: 'alto'    },
    { letter: 'G', type: 'alto'    }, { letter: 'B', type: 'churn'   }, { letter: 'H', type: 'churn'   },
    { letter: 'I', type: 'colecao' }, { letter: 'C', type: 'outros'  }, { letter: 'J', type: 'outros'  },
  ],
  Rentabilidade: [
    { letter: 'A', type: 'alto'    }, { letter: 'G', type: 'alto'    }, { letter: 'K', type: 'alto'    },
    { letter: 'I', type: 'colecao' }, { letter: 'B', type: 'outros'  }, { letter: 'D', type: 'outros'  },
    { letter: 'E', type: 'outros'  }, { letter: 'H', type: 'outros'  }, { letter: 'J', type: 'outros'  },
  ],
  Cobertura: [
    { letter: 'H', type: 'outros'  }, { letter: 'J', type: 'outros'  }, { letter: 'C', type: 'outros'  },
    { letter: 'E', type: 'outros'  }, { letter: 'B', type: 'colecao' }, { letter: 'A', type: 'alto'    },
    { letter: 'D', type: 'churn'   }, { letter: 'G', type: 'alto'    }, { letter: 'I', type: 'colecao' },
  ],
  Coleção: [
    { letter: 'I', type: 'colecao' }, { letter: 'B', type: 'colecao' }, { letter: 'L', type: 'colecao' },
    { letter: 'A', type: 'alto'    }, { letter: 'G', type: 'alto'    }, { letter: 'K', type: 'colecao' },
    { letter: 'D', type: 'churn'   }, { letter: 'C', type: 'outros'  }, { letter: 'E', type: 'outros'  },
  ],
  Personalizado: [
    { letter: 'A', type: 'alto'    }, { letter: 'D', type: 'churn'   }, { letter: 'I', type: 'colecao' },
    { letter: 'G', type: 'alto'    }, { letter: 'B', type: 'colecao' }, { letter: 'C', type: 'outros'  },
    { letter: 'E', type: 'outros'  }, { letter: 'H', type: 'outros'  }, { letter: 'J', type: 'outros'  },
  ],
};

const LEVEL_STYLES: Record<DimensionLevel, React.CSSProperties> = {
  Alta:  { backgroundColor: '#E6F1FB', color: '#185FA5' },
  Média: { backgroundColor: '#FAEEDA', color: '#854F0B' },
  Baixa: { backgroundColor: '#F3F4F6', color: '#6B7280' },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function redistributePcts(
  weights: Record<string, DimensionWeight>,
  changedId: string,
  newPct: number
): Record<string, DimensionWeight> {
  const others = Object.keys(weights).filter((id) => id !== changedId);
  const othersTotal = others.reduce((sum, id) => sum + weights[id].pct, 0);
  const next: Record<string, DimensionWeight> = { ...weights, [changedId]: { ...weights[changedId], pct: newPct } };
  const remaining = 100 - newPct;

  if (othersTotal === 0) {
    const each = Math.floor(remaining / others.length);
    others.forEach((id) => { next[id] = { ...weights[id], pct: each }; });
    const leftover = remaining - each * others.length;
    if (leftover > 0 && others.length > 0) next[others[0]] = { ...next[others[0]], pct: next[others[0]].pct + leftover };
  } else {
    others.forEach((id) => {
      next[id] = { ...weights[id], pct: Math.round((weights[id].pct / othersTotal) * remaining) };
    });
    const total = Object.values(next).reduce((s, w) => s + w.pct, 0);
    if (total !== 100 && others.length > 0) {
      next[others[0]] = { ...next[others[0]], pct: Math.max(0, next[others[0]].pct + (100 - total)) };
    }
  }

  others.forEach((id) => { if (next[id].pct < 0) next[id] = { ...next[id], pct: 0 }; });
  return next;
}

// ── Main component ───────────────────────────────────────────────────────────

export function SteeringRuleEditor() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('Crescimento');
  const [weights, setWeights] = useState<Record<string, DimensionWeight>>(
    () => ({ ...MODE_WEIGHTS.Crescimento })
  );
  const [showCriteria, setShowCriteria] = useState(false);

  const handleModeSelect = (modeId: string) => {
    setMode(modeId);
    setWeights({ ...MODE_WEIGHTS[modeId] ?? DEFAULT_WEIGHTS });
  };

  const handleSlider = (dimId: string, newPct: number) => {
    setWeights((prev) => redistributePcts(prev, dimId, newPct));
    setMode('Personalizado');
  };

  const handleLevel = (dimId: string, level: DimensionLevel) => {
    setWeights((prev) => ({ ...prev, [dimId]: { ...prev[dimId], level } }));
    setMode('Personalizado');
  };

  const totalPct = Object.values(weights).reduce((s, w) => s + w.pct, 0);
  const impact = MODE_IMPACT[mode] ?? MODE_IMPACT.Personalizado;
  const afterRoute = AFTER_ROUTE[mode] ?? AFTER_ROUTE.Personalizado;
  const currentMode = MODES.find((m) => m.id === mode);

  return (
    <div className="p-8 space-y-7" style={{ maxWidth: 1200 }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 text-sm mb-2 text-muted-foreground">
            <Link to="/steering" className="hover:text-foreground transition-colors">Configuração estratégica</Link>
            <span>›</span>
            <span className="text-foreground">Direcionamento</span>
          </nav>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-foreground">Direcionamento estratégico</h1>
            <Info className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Defina as prioridades que irão influenciar automaticamente a ordem das rotas recomendadas para os representantes.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Active status */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[12px] font-medium text-foreground">Direcionamento ativo</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-[11px] text-muted-foreground">26/08/2026 – 10/10/2026</span>
            <Calendar className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </div>

          <button
            onClick={() => navigate('/direcionamento')}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
          >
            Cancelar
          </button>
          <button
            onClick={() => navigate('/direcionamento')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#185FA5' }}
          >
            Salvar direcionamento
            <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ── Section 1: Mode cards ───────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-foreground">1. Qual o foco principal deste ciclo?</h2>
        <div className="grid grid-cols-6 gap-3">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeSelect(m.id)}
                className="flex items-start gap-3 p-4 rounded-xl border text-left transition-all hover:border-blue-300"
                style={active
                  ? { borderColor: '#185FA5', backgroundColor: '#E6F1FB' }
                  : { borderColor: 'var(--border)', backgroundColor: 'var(--card)' }
                }
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: active ? '#185FA5' : 'var(--secondary)' }}
                >
                  <Icon
                    className="w-4 h-4"
                    strokeWidth={1.5}
                    style={{ color: active ? '#fff' : 'var(--muted-foreground)' }}
                  />
                </div>
                <div>
                  <div
                    className="text-[13px] font-semibold leading-snug"
                    style={{ color: active ? '#0C447C' : 'var(--foreground)' }}
                  >
                    {m.label}
                  </div>
                  <div
                    className="text-[11px] mt-0.5 leading-snug"
                    style={{ color: active ? '#185FA5' : 'var(--muted-foreground)' }}
                  >
                    {m.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[12px] text-muted-foreground">
          Você pode ajustar os pesos abaixo para adaptar a estratégia ao momento atual da empresa.
        </p>
      </section>

      {/* ── Sections 2 + 3 ──────────────────────────────────────────────── */}
      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 360px' }}>

        {/* Section 2: Sliders */}
        <section className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-semibold text-foreground">2. Ajuste as alavancas estratégicas</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Defina o quanto cada grupo de critérios deve influenciar a priorização da IA.{' '}
                <button className="underline underline-offset-2 hover:text-foreground transition-colors">
                  Entenda como funciona
                </button>
              </p>
            </div>
            <span
              className="text-[12px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
              style={totalPct === 100
                ? { backgroundColor: '#EAF3DE', color: '#3B6D11' }
                : { backgroundColor: '#FCEBEB', color: '#A32D2D' }
              }
            >
              Distribuição total: {totalPct}%
            </span>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
            {DIMENSIONS.map((dim) => {
              const w = weights[dim.id] ?? { pct: 20, level: 'Média' as DimensionLevel };
              const Icon = dim.icon;
              const fillPct = Math.min((w.pct / 60) * 100, 100);
              return (
                <div key={dim.id} className="px-5 py-4">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-0.5">
                        <span className="text-[13px] font-medium text-foreground">{dim.label}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[13px] font-semibold text-foreground w-9 text-right">
                            {w.pct}%
                          </span>
                          <select
                            value={w.level}
                            onChange={(e) => handleLevel(dim.id, e.target.value as DimensionLevel)}
                            className="text-[11px] px-2 py-1 rounded-lg border-0 cursor-pointer font-medium focus:outline-none"
                            style={LEVEL_STYLES[w.level]}
                          >
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-[11px] text-muted-foreground mb-3">{dim.description}</div>
                      <input
                        type="range"
                        min={0}
                        max={60}
                        value={w.pct}
                        onChange={(e) => handleSlider(dim.id, Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{
                          accentColor: dim.color,
                          background: `linear-gradient(to right, ${dim.color} 0%, ${dim.color} ${fillPct}%, var(--border) ${fillPct}%, var(--border) 100%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setShowCriteria((v) => !v)}
            className="flex items-center gap-1.5 text-[12px] transition-colors"
            style={{ color: '#185FA5' }}
          >
            {showCriteria
              ? <ChevronUp className="w-3.5 h-3.5" strokeWidth={1.5} />
              : <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
            }
            Ver critérios utilizados em cada grupo
          </button>

          {showCriteria && (
            <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
              {DIMENSIONS.map((dim) => (
                <div key={dim.id} className="flex gap-3">
                  <span
                    className="text-[11px] font-semibold flex-shrink-0 w-32"
                    style={{ color: dim.color }}
                  >
                    {dim.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {CRITERIA_DETAIL[dim.id].join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Impact */}
        <section className="space-y-4">
          <div>
            <h2 className="text-[15px] font-semibold text-foreground">3. Impacto previsto com esta configuração</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Simulação baseada nos dados dos últimos 90 dias da sua operação.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
              style={{ backgroundColor: '#EAF3DE' }}
            >
              <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: '#3B6D11' }} strokeWidth={1.5} />
              <span className="text-[12px] font-medium" style={{ color: '#3B6D11' }}>
                A IA irá priorizar clientes com este perfil:
              </span>
            </div>

            <div className="divide-y divide-border">
              {impact.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: item.color + '18' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-foreground leading-snug">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{item.description}</div>
                  </div>
                  <span
                    className="text-[12px] font-semibold flex-shrink-0 flex items-center gap-0.5"
                    style={{ color: item.positive ? '#3B6D11' : '#A32D2D' }}
                  >
                    {item.positive ? '+' : '-'}{item.pct}%
                    <span className="text-[10px]">{item.positive ? '↑' : '↓'}</span>
                  </span>
                </div>
              ))}
            </div>

            <button
              className="flex items-center gap-1 text-[12px] transition-colors"
              style={{ color: '#185FA5' }}
            >
              Ver detalhes da simulação
              <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
        </section>
      </div>

      {/* ── Bottom: Before/after + Summary ──────────────────────────────── */}
      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 360px' }}>

        {/* Before/after visualization */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div>
            <h3 className="text-[13px] font-semibold text-foreground">
              Como isso se traduz na rota do representante
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Exemplo de impacto na priorização dos clientes na rota diária.
            </p>
          </div>

          <div className="grid gap-4 items-start" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
            {/* Before */}
            <div>
              <div className="text-[11px] font-semibold text-muted-foreground mb-1">
                Antes (configuração atual)
              </div>
              <div className="text-[10px] text-muted-foreground mb-3">
                Prioridade baseada apenas na IA
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BEFORE_ROUTE.map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold"
                    style={{ backgroundColor: CLIENT_COLORS[c.type].bg, color: CLIENT_COLORS[c.type].text }}
                  >
                    {c.letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center mt-8">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
            </div>

            {/* After */}
            <div>
              <div className="text-[11px] font-semibold text-foreground mb-1">
                Depois (nova configuração)
              </div>
              <div className="text-[10px] text-muted-foreground mb-3">
                Prioridade influenciada pela estratégia definida
              </div>
              <div className="flex flex-wrap gap-1.5">
                {afterRoute.map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold"
                    style={{ backgroundColor: CLIENT_COLORS[c.type].bg, color: CLIENT_COLORS[c.type].text }}
                  >
                    {c.letter}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-1">
            {Object.entries(CLIENT_COLORS).map(([type, s]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: s.bg, border: `1px solid ${s.text}` }}
                />
                <span className="text-[11px] text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary panel */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="text-[13px] font-semibold text-foreground">Resumo da estratégia</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">Foco principal</span>
              <span className="text-[13px] font-medium text-foreground">{currentMode?.label ?? '—'}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">Vigência</span>
              <span className="text-[13px] font-medium text-foreground">26/08/2026 – 10/10/2026</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start justify-between gap-4">
              <span className="text-[13px] text-muted-foreground flex-shrink-0">Última atualização</span>
              <span className="text-[13px] font-medium text-foreground text-right">
                26/08/2026 às 14:32 por Gustavo Sales
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
            <Calendar className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            Ver histórico de alterações
          </button>
        </div>
      </div>
    </div>
  );
}
