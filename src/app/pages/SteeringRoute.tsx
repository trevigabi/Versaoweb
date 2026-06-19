import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import {
  Plus, TrendingUp, RefreshCw, DollarSign,
  Tag, Map, Settings2, Calendar, MoreVertical,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

// ── Types ────────────────────────────────────────────────────────────────────

type RuleStatus = 'Ativa' | 'Futura' | 'Expirada';
type ScopeType = 'region' | 'rep' | 'national';
type ModeId = 'Recuperação' | 'Crescimento' | 'Rentabilidade' | 'Coleção' | 'Cobertura' | 'Personalizado';

interface SteeringRule {
  id: string;
  name: string;
  scopeType: ScopeType;
  scopeLabel: string;
  mode: ModeId;
  status: RuleStatus;
  startDate: string;
  endDate: string;
  vigenciaLabel: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_RULES: SteeringRule[] = [
  {
    id: '1',
    name: 'Sul — Recuperação',
    scopeType: 'region',
    scopeLabel: 'Região Sul • 2 exceções',
    mode: 'Recuperação',
    status: 'Ativa',
    startDate: '01/06/2026',
    endDate: '30/06/2026',
    vigenciaLabel: '18 dias restantes',
  },
  {
    id: '2',
    name: 'Rep João Silva',
    scopeType: 'rep',
    scopeLabel: '1 representante • 3 clientes',
    mode: 'Crescimento',
    status: 'Ativa',
    startDate: '15/06/2026',
    endDate: '31/07/2026',
    vigenciaLabel: 'Começa em 3 dias',
  },
  {
    id: '3',
    name: 'Nordeste — Coleção Verão',
    scopeType: 'region',
    scopeLabel: 'Região Nordeste',
    mode: 'Coleção',
    status: 'Futura',
    startDate: '01/07/2026',
    endDate: '31/08/2026',
    vigenciaLabel: 'Começa em 19 dias',
  },
  {
    id: '4',
    name: 'Nacional — Q1 2026',
    scopeType: 'national',
    scopeLabel: 'Todos os representantes',
    mode: 'Rentabilidade',
    status: 'Expirada',
    startDate: '01/01/2026',
    endDate: '31/03/2026',
    vigenciaLabel: 'Encerrou há 73 dias',
  },
];

// ── Visual maps ───────────────────────────────────────────────────────────────


const MODE_ICONS: Record<ModeId, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Recuperação: RefreshCw,
  Crescimento: TrendingUp,
  Rentabilidade: DollarSign,
  Coleção: Tag,
  Cobertura: Map,
  Personalizado: Settings2,
};

const STATUS_STYLES: Record<RuleStatus, React.CSSProperties> = {
  Ativa:    { backgroundColor: '#EAF3DE', color: '#3B6D11' },
  Futura:   { backgroundColor: '#E6F1FB', color: '#185FA5' },
  Expirada: { border: '1px solid var(--border)', color: 'var(--muted-foreground)' },
};

type Filter = 'Todas' | 'Ativas' | 'Futuras' | 'Expiradas';
const FILTERS: Filter[] = ['Todas', 'Ativas', 'Futuras', 'Expiradas'];

// ── Component ─────────────────────────────────────────────────────────────────

export function SteeringRoute() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('Todas');
  const [rules, setRules] = useState(INITIAL_RULES);

  const filtered = rules.filter((r) => {
    if (activeFilter === 'Todas') return true;
    if (activeFilter === 'Ativas') return r.status === 'Ativa';
    if (activeFilter === 'Futuras') return r.status === 'Futura';
    if (activeFilter === 'Expiradas') return r.status === 'Expirada';
    return true;
  });

  const handleDuplicate = (rule: SteeringRule) => {
    navigate(`/direcionamento/nova?from=${rule.id}`);
  };

  const handleDelete = (ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
  };

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Replanejamento estratégico"
        description="Regras que definem como a IA prioriza visitas para cada escopo"
        actions={
          <button
            onClick={() => navigate('/direcionamento/nova')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Nova regra
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'regra' : 'regras'}
        </span>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Regra
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Modo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Vigência
              </th>
              <th className="px-6 py-3 w-14" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-14 text-center text-sm text-muted-foreground">
                  Nenhuma regra encontrada.
                </td>
              </tr>
            ) : (
              filtered.map((rule) => {
                const ModeIcon = MODE_ICONS[rule.mode];
                return (
                  <tr
                    key={rule.id}
                    onClick={() => navigate(`/direcionamento/${rule.id}`)}
                    className="hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    {/* Regra */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground">{rule.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{rule.scopeLabel}</div>
                    </td>

                    {/* Modo */}
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: '#FAEEDA', color: '#854F0B' }}
                      >
                        <ModeIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {rule.mode}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={STATUS_STYLES[rule.status]}
                      >
                        {rule.status}
                      </span>
                    </td>

                    {/* Vigência */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                        {rule.startDate} — {rule.endDate}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 ml-5">
                        {rule.vigenciaLabel}
                      </div>
                    </td>

                    {/* Ações */}
                    <td
                      className="px-4 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                            <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-36 p-1" align="end">
                          <button
                            onClick={() => navigate(`/direcionamento/${rule.id}`)}
                            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDuplicate(rule)}
                            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                          >
                            Duplicar
                          </button>
                          <button
                            onClick={() => handleDelete(rule.id)}
                            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-red-50 transition-colors text-red-600"
                          >
                            Excluir
                          </button>
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
    </div>
  );
}
