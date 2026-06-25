import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import {
  Plus, TrendingUp, RefreshCw, DollarSign,
  Tag, Map, Settings2, Calendar, MoreVertical, AlignLeft,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

// ── Types ─────────────────────────────────────────────────────────────────────

type RuleStatus = 'Ativa' | 'Futura' | 'Expirada';
type ScopeType = 'region' | 'rep' | 'national';
type ModeId = 'Recuperação' | 'Crescimento' | 'Rentabilidade' | 'Coleção' | 'Cobertura' | 'Personalizado';
type BriefingStatus = 'Configurado' | 'Rascunho' | '—';

interface Strategy {
  id: string;
  name: string;
  scopeType: ScopeType;
  scopeLabel: string;
  mode: ModeId;
  status: RuleStatus;
  startDate: string;
  endDate: string;
  vigenciaLabel: string;
  briefingStatus: BriefingStatus;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_STRATEGIES: Strategy[] = [
  {
    id: '1', name: 'Sul — Recuperação',
    scopeType: 'region', scopeLabel: 'Região Sul • 2 exceções',
    mode: 'Recuperação', status: 'Ativa',
    startDate: '01/06/2026', endDate: '30/06/2026', vigenciaLabel: '18 dias restantes',
    briefingStatus: 'Configurado',
  },
  {
    id: '2', name: 'Rep João Silva',
    scopeType: 'rep', scopeLabel: '1 representante • 3 clientes',
    mode: 'Crescimento', status: 'Ativa',
    startDate: '15/06/2026', endDate: '31/07/2026', vigenciaLabel: 'Começa em 3 dias',
    briefingStatus: 'Rascunho',
  },
  {
    id: '3', name: 'Nordeste — Coleção Verão',
    scopeType: 'region', scopeLabel: 'Região Nordeste',
    mode: 'Coleção', status: 'Futura',
    startDate: '01/07/2026', endDate: '31/08/2026', vigenciaLabel: 'Começa em 19 dias',
    briefingStatus: '—',
  },
  {
    id: '4', name: 'Nacional — Q1 2026',
    scopeType: 'national', scopeLabel: 'Todos os representantes',
    mode: 'Rentabilidade', status: 'Expirada',
    startDate: '01/01/2026', endDate: '31/03/2026', vigenciaLabel: 'Encerrou há 73 dias',
    briefingStatus: 'Configurado',
  },
];

// ── Visual maps ───────────────────────────────────────────────────────────────

const MODE_ICONS: Record<ModeId, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Recuperação: RefreshCw, Crescimento: TrendingUp, Rentabilidade: DollarSign,
  Coleção: Tag, Cobertura: Map, Personalizado: Settings2,
};

const MODE_STYLE: Record<ModeId, { bg: string; text: string }> = {
  Crescimento:   { bg: '#F5F5F4', text: '#44403C' },
  Recuperação:   { bg: '#F5F5F4', text: '#44403C' },
  Rentabilidade: { bg: '#F5F5F4', text: '#44403C' },
  Coleção:       { bg: '#F5F5F4', text: '#44403C' },
  Cobertura:     { bg: '#F5F5F4', text: '#44403C' },
  Personalizado: { bg: '#F5F5F4', text: '#78716C' },
};

const STATUS_STYLES: Record<RuleStatus, React.CSSProperties> = {
  Ativa:    { backgroundColor: '#FDF2F2', color: '#BE1520' },
  Futura:   { backgroundColor: '#F5F5F4', color: '#44403C' },
  Expirada: { border: '1px solid var(--border)', color: 'var(--muted-foreground)' },
};

const BRIEFING_STYLE: Record<BriefingStatus, string> = {
  'Configurado': 'bg-success-light text-success-foreground',
  'Rascunho':    'bg-warning-light text-warning-foreground',
  '—':           'text-muted-foreground',
};

type Filter = 'Todas' | 'Ativas' | 'Futuras' | 'Expiradas';
const FILTERS: Filter[] = ['Todas', 'Ativas', 'Futuras', 'Expiradas'];

// ── Component ─────────────────────────────────────────────────────────────────

export function SteeringRoute() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('Todas');
  const [strategies, setStrategies] = useState(INITIAL_STRATEGIES);

  const filtered = strategies.filter((r) => {
    if (activeFilter === 'Todas') return true;
    if (activeFilter === 'Ativas') return r.status === 'Ativa';
    if (activeFilter === 'Futuras') return r.status === 'Futura';
    if (activeFilter === 'Expiradas') return r.status === 'Expirada';
    return true;
  });

  const handleDelete = (id: string) => setStrategies((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Replanejamento estratégico"
        description="Estratégias que unificam o direcionamento de rotas e o briefing contextual para cada representante."
        actions={
          <button
            onClick={() => navigate('/direcionamento/nova')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Nova estratégia
          </button>
        }
      />

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-1">
          {FILTERS.map((f) => {
            const count = f === 'Todas' ? strategies.length : strategies.filter(r =>
              f === 'Ativas' ? r.status === 'Ativa' :
              f === 'Futuras' ? r.status === 'Futura' :
              r.status === 'Expirada'
            ).length;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 pb-3 pt-1 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                  activeFilter === f ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                  activeFilter === f ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                }`}>{count}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Estratégia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Modo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Briefing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vigência</th>
              <th className="px-6 py-3 w-14" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-sm text-muted-foreground">
                  Nenhuma estratégia encontrada.
                </td>
              </tr>
            ) : (
              filtered.map((strategy) => {
                const ModeIcon = MODE_ICONS[strategy.mode];
                const modeStyle = MODE_STYLE[strategy.mode];
                return (
                  <tr
                    key={strategy.id}
                    onClick={() => navigate(`/direcionamento/${strategy.id}`)}
                    className="hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    {/* Estratégia */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground">{strategy.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{strategy.scopeLabel}</div>
                    </td>

                    {/* Modo */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: modeStyle.bg, color: modeStyle.text }}>
                        <ModeIcon className="w-3 h-3" strokeWidth={1.5} />
                        {strategy.mode}
                      </span>
                    </td>

                    {/* Status direcionamento */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={STATUS_STYLES[strategy.status]}>
                        {strategy.status}
                      </span>
                    </td>

                    {/* Briefing status */}
                    <td className="px-6 py-4">
                      {strategy.briefingStatus === '—' ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/direcionamento/${strategy.id}?tab=briefing`); }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          <AlignLeft className="w-3 h-3" strokeWidth={1.5} />
                          Adicionar briefing
                        </button>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${BRIEFING_STYLE[strategy.briefingStatus]}`}>
                          <AlignLeft className="w-3 h-3" strokeWidth={1.5} />
                          {strategy.briefingStatus}
                        </span>
                      )}
                    </td>

                    {/* Vigência */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                        {strategy.startDate} — {strategy.endDate}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 ml-5">{strategy.vigenciaLabel}</div>
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                            <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-1" align="end">
                          <button onClick={() => navigate(`/direcionamento/${strategy.id}`)} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground">Editar</button>
                          <button onClick={() => navigate(`/direcionamento/${strategy.id}?tab=briefing`)} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground">Editar briefing</button>
                          <button onClick={() => navigate(`/direcionamento/nova?from=${strategy.id}`)} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground">Duplicar</button>
                          <button onClick={() => handleDelete(strategy.id)} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-red-50 transition-colors text-red-600">Excluir</button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'estratégia' : 'estratégias'}</p>
    </div>
  );
}
