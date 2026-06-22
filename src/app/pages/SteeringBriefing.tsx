import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft, Plus, MoreVertical, TrendingUp, RefreshCw, DollarSign,
  Map, Gem, Settings2, Users, Globe, Calendar, Sparkles, Eye, PencilLine,
  Search, X,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

// ── Types ─────────────────────────────────────────────────────────────────────

type BriefingStatus = 'Ativo' | 'Rascunho' | 'Encerrado';
type StrategyMode = 'Crescimento' | 'Recuperação' | 'Rentabilidade' | 'Coleção' | 'Cobertura' | 'Personalizado';
type Scope = 'Todos os representantes' | 'Por região' | 'Por representante';

interface Briefing {
  id: string;
  name: string;
  description: string;
  strategy: StrategyMode;
  scope: Scope;
  scopeDetail: string;
  startDate: string;
  endDate: string;
  status: BriefingStatus;
  adherence: number;
  audience: number;
  origin: 'user' | 'ai';
  editedByUser?: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_BRIEFINGS: Briefing[] = [
  {
    id: '1', name: 'Lançamento SS26',
    description: 'Apresentar a coleção Moleca SS26 como prioridade nas visitas. Destacar os novos modelos e condições especiais de lançamento disponíveis até o fim do mês.',
    strategy: 'Coleção', scope: 'Todos os representantes', scopeDetail: 'Todos os representantes',
    startDate: '2026-06-01', endDate: '2026-06-30', status: 'Ativo', adherence: 72, audience: 38,
    origin: 'ai', editedByUser: false,
  },
  {
    id: '2', name: 'Inverno 2026',
    description: 'Oferecer condições especiais da linha de inverno para clientes com histórico de compra de calçados fechados.',
    strategy: 'Rentabilidade', scope: 'Por região', scopeDetail: 'Região Sul — 46 representantes',
    startDate: '2026-06-10', endDate: '2026-07-15', status: 'Ativo', adherence: 68, audience: 46,
    origin: 'ai', editedByUser: true,
  },
  {
    id: '3', name: 'Reativação de clientes',
    description: 'Abordar clientes sem compra nos últimos 80 dias com proposta de reativação e condições facilitadas.',
    strategy: 'Recuperação', scope: 'Todos os representantes', scopeDetail: 'Todos os representantes',
    startDate: '2026-06-15', endDate: '2026-07-20', status: 'Ativo', adherence: 58, audience: 38,
    origin: 'user',
  },
  {
    id: '4', name: 'Foco em Mix',
    description: 'Ampliar a presença de categorias estratégicas na carteira de clientes que ainda não exploraram determinadas linhas.',
    strategy: 'Coleção', scope: 'Por representante', scopeDetail: 'Grupo de clientes — 524 clientes',
    startDate: '2026-06-01', endDate: '2026-07-31', status: 'Ativo', adherence: 65, audience: 22,
    origin: 'user',
  },
  {
    id: '5', name: 'Cobertura de Novos Clientes',
    description: 'Priorizar visitas a clientes ainda não atendidos no mês, especialmente aqueles com alto potencial na Região Nordeste.',
    strategy: 'Cobertura', scope: 'Por região', scopeDetail: 'Região Nordeste — 62 representantes',
    startDate: '2026-06-01', endDate: '2026-06-30', status: 'Ativo', adherence: 60, audience: 62,
    origin: 'ai', editedByUser: false,
  },
  {
    id: '6', name: 'Campanha Verão — Pré-layout',
    description: 'Rascunho de instrução para a campanha de verão. Aguardando aprovação final do time de marketing.',
    strategy: 'Crescimento', scope: 'Todos os representantes', scopeDetail: 'Todos os representantes',
    startDate: '2026-08-01', endDate: '2026-09-30', status: 'Rascunho', adherence: 0, audience: 38,
    origin: 'user',
  },
  {
    id: '7', name: 'Black Friday 2025',
    description: 'Instrução especial para a campanha de Black Friday com metas de conversão agressivas.',
    strategy: 'Crescimento', scope: 'Todos os representantes', scopeDetail: 'Todos os representantes',
    startDate: '2025-11-01', endDate: '2025-11-30', status: 'Encerrado', adherence: 81, audience: 38,
    origin: 'ai', editedByUser: false,
  },
];

const STRATEGY_ICONS: Record<StrategyMode, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Crescimento: TrendingUp, Recuperação: RefreshCw, Rentabilidade: DollarSign,
  Coleção: Gem, Cobertura: Map, Personalizado: Settings2,
};

const STRATEGY_STYLE: Record<StrategyMode, { bg: string; text: string }> = {
  Crescimento:   { bg: '#E6F1FB', text: '#185FA5' },
  Recuperação:   { bg: '#EAF3DE', text: '#3B6D11' },
  Rentabilidade: { bg: '#FAEEDA', text: '#854F0B' },
  Coleção:       { bg: '#F3EEFF', text: '#7C3AED' },
  Cobertura:     { bg: '#E0F7FA', text: '#0E7490' },
  Personalizado: { bg: '#F3F4F6', text: '#6B7280' },
};

const STATUS_STYLE: Record<BriefingStatus, string> = {
  Ativo:     'bg-success-light text-success-foreground',
  Rascunho:  'bg-secondary text-muted-foreground',
  Encerrado: 'bg-secondary text-muted-foreground',
};

const EMPTY_BRIEFING: Omit<Briefing, 'id' | 'adherence'> = {
  name: '', description: '', strategy: 'Crescimento',
  scope: 'Todos os representantes', scopeDetail: 'Todos os representantes',
  startDate: '', endDate: '', status: 'Rascunho', audience: 38,
  origin: 'user',
};

type Tab = 'Ativo' | 'Rascunho' | 'Encerrado';
type OriginFilter = 'all' | 'user' | 'ai' | 'ai-edited';

// ── Component ─────────────────────────────────────────────────────────────────

export function SteeringBriefing() {
  const [tab, setTab]               = useState<Tab>('Ativo');
  const [briefings, setBriefings]   = useState(INITIAL_BRIEFINGS);
  const [view, setView]             = useState<'list' | 'editor'>('list');
  const [editing, setEditing]       = useState<Briefing | null>(null);
  const [form, setForm]             = useState<Omit<Briefing, 'id' | 'adherence'>>(EMPTY_BRIEFING);
  const [vigenciaOpen, setVigenciaOpen] = useState(false);
  const [isActive, setIsActive]     = useState(true);
  const [search, setSearch]         = useState('');
  const [originFilter, setOriginFilter] = useState<OriginFilter>('all');
  const [strategyFilter, setStrategyFilter] = useState<StrategyMode | 'all'>('all');

  const openCreate = () => {
    setForm({ ...EMPTY_BRIEFING });
    setEditing(null);
    setView('editor');
  };

  const openEdit = (b: Briefing) => {
    setForm({ name: b.name, description: b.description, strategy: b.strategy, scope: b.scope, scopeDetail: b.scopeDetail, startDate: b.startDate, endDate: b.endDate, status: b.status, audience: b.audience });
    setEditing(b);
    setView('editor');
  };

  const handleSave = (asDraft = false) => {
    const status: BriefingStatus = asDraft ? 'Rascunho' : 'Ativo';
    if (editing) {
      const editedByUser = editing.origin === 'ai' ? true : undefined;
      setBriefings(prev => prev.map(b => b.id === editing.id ? { ...b, ...form, status, editedByUser } : b));
    } else {
      setBriefings(prev => [...prev, { ...form, id: String(Date.now()), adherence: 0, status, origin: 'user' }]);
    }
    setView('list');
  };

  const handleDelete = (id: string) => setBriefings(prev => prev.filter(b => b.id !== id));

  const filtered = briefings.filter(b => {
    if (b.status !== tab) return false;

    if (originFilter === 'user' && b.origin !== 'user') return false;
    if (originFilter === 'ai' && !(b.origin === 'ai' && !b.editedByUser)) return false;
    if (originFilter === 'ai-edited' && !(b.origin === 'ai' && b.editedByUser)) return false;

    if (strategyFilter !== 'all' && b.strategy !== strategyFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.strategy.toLowerCase().includes(q) ||
        b.scopeDetail.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const hasActiveFilters = search.trim() !== '' || originFilter !== 'all' || strategyFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setOriginFilter('all');
    setStrategyFilter('all');
  };

  // ── List view ──────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/steering" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-1">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Voltar para Direcionamento
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">Briefing estratégico</h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Nova instrução
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex gap-1">
            {(['Ativo', 'Rascunho', 'Encerrado'] as Tab[]).map((t) => {
              const count = briefings.filter(b => b.status === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 pb-3 pt-1 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                    tab === t ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t === 'Ativo' ? 'Ativos' : t === 'Rascunho' ? 'Rascunhos' : 'Encerrados'}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                    tab === t ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                  }`}>{count}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome, estratégia, escopo..."
              className="w-full pl-8 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Origin filter */}
          <div className="flex items-center gap-1 p-0.5 bg-secondary border border-border rounded-lg">
            {([
              { value: 'all',       label: 'Todos' },
              { value: 'user',      label: 'Criado por usuário' },
              { value: 'ai',        label: '✦ IA' },
              { value: 'ai-edited', label: '✎ IA editado' },
            ] as { value: OriginFilter; label: string }[]).map(opt => (
              <button
                key={opt.value}
                onClick={() => setOriginFilter(opt.value)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                  originFilter === opt.value
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Strategy filter */}
          <select
            value={strategyFilter}
            onChange={e => setStrategyFilter(e.target.value as StrategyMode | 'all')}
            className="px-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Todas as estratégias</option>
            {(Object.keys(STRATEGY_ICONS) as StrategyMode[]).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary border border-border"
            >
              <X className="w-3 h-3" strokeWidth={1.5} />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Instrução</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Estratégia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Aplicado para</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Período</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                {tab !== 'Rascunho' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Aderência</th>
                )}
                <th className="px-6 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-sm text-muted-foreground">
                    Nenhuma instrução encontrada.
                  </td>
                </tr>
              ) : filtered.map((b) => {
                const Icon = STRATEGY_ICONS[b.strategy];
                const stratStyle = STRATEGY_STYLE[b.strategy];
                return (
                  <tr key={b.id} className="hover:bg-secondary/40 transition-colors cursor-pointer" onClick={() => openEdit(b)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{b.name}</span>
                        {b.origin === 'ai' && !b.editedByUser && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-violet-50 text-violet-600 border border-violet-100 flex-shrink-0">
                            <Sparkles className="w-2.5 h-2.5" strokeWidth={1.5} />
                            IA
                          </span>
                        )}
                        {b.origin === 'ai' && b.editedByUser && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-600 border border-amber-100 flex-shrink-0">
                            <PencilLine className="w-2.5 h-2.5" strokeWidth={1.5} />
                            IA · editado
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">{b.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: stratStyle.bg, color: stratStyle.text }}>
                        <Icon className="w-3 h-3" strokeWidth={1.5} />
                        {b.strategy}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        {b.scope === 'Todos os representantes' ? <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} /> : <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />}
                        <span className="text-xs text-foreground truncate max-w-[160px]">{b.scopeDetail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                        {new Date(b.startDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} – {new Date(b.endDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLE[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    {tab !== 'Rascunho' && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${b.adherence}%` }} />
                          </div>
                          <span className="text-sm font-semibold tabular-nums text-foreground w-10 text-right">{b.adherence}%</span>
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                            <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-1" align="end">
                          <button onClick={() => openEdit(b)} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground">Editar</button>
                          <button onClick={() => handleDelete(b.id)} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-red-50 transition-colors text-red-600">Excluir</button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <p className="text-xs text-muted-foreground">
          Mostrando {filtered.length} {filtered.length === 1 ? 'instrução' : 'instruções'}
          {hasActiveFilters && ' (filtrado)'}
        </p>
      </div>
    );
  }

  // ── Editor view ────────────────────────────────────────────────────────────
  const StratIcon = STRATEGY_ICONS[form.strategy];
  const stratStyle = STRATEGY_STYLE[form.strategy];
  const previewText = form.description || 'O briefing gerado pela IA será exibido aqui com base no contexto que você definir.';
  const hasContent = form.name.trim().length > 0 && form.description.trim().length > 0;

  return (
    <div className="p-8 space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
        <div>
          <button onClick={() => setView('list')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Voltar para Briefing estratégico
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          <Popover open={vigenciaOpen} onOpenChange={setVigenciaOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-xs hover:bg-secondary transition-colors">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                <span className="font-medium text-foreground whitespace-nowrap">
                  {isActive ? 'Instrução ativa' : 'Inativa'}
                </span>
                {form.startDate && form.endDate ? (
                  <span className="text-muted-foreground hidden sm:inline">
                    {new Date(form.startDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} – {new Date(form.endDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </span>
                ) : (
                  <span className="text-muted-foreground hidden sm:inline">Definir período</span>
                )}
                <Calendar className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-0 overflow-hidden">
              <div className="px-4 py-3 space-y-3">
                <div className="text-xs font-semibold text-foreground">Período de vigência</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-muted-foreground block mb-1">Início</label>
                    <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-full text-xs border border-border rounded-lg px-2.5 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground block mb-1">Fim</label>
                    <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="w-full text-xs border border-border rounded-lg px-2.5 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <button onClick={() => setVigenciaOpen(false)} className="w-full py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg transition-colors">
                  Confirmar período
                </button>
              </div>
              <div className="border-t border-border px-4 py-3">
                <div className="text-[11px] text-muted-foreground mb-2">Ação rápida</div>
                {isActive ? (
                  <button onClick={() => { setIsActive(false); setVigenciaOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border hover:bg-red-50 hover:border-red-200 transition-colors text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    Inativar instrução agora
                  </button>
                ) : (
                  <button onClick={() => { setIsActive(true); setVigenciaOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border hover:bg-green-50 hover:border-green-200 transition-colors text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    Reativar instrução
                  </button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <button onClick={() => handleSave(true)} className="px-3 py-2 text-xs border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
            Salvar como rascunho
          </button>
          <button onClick={() => handleSave(false)} disabled={!hasContent} className="px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {editing ? 'Salvar alterações' : 'Publicar instrução'}
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

        {/* Left — form */}
        <div className="space-y-5">
          {/* Name */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Identificação</h2>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Nome da instrução</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ex: Lançamento SS26, Campanha Inverno..."
                className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Estratégia */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Estratégia relacionada</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(STRATEGY_ICONS) as StrategyMode[]).map((s) => {
                  const SIcon = STRATEGY_ICONS[s];
                  const ss = STRATEGY_STYLE[s];
                  const active = form.strategy === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setForm(f => ({ ...f, strategy: s }))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                      style={active
                        ? { backgroundColor: ss.bg, color: ss.text, borderColor: ss.text + '60' }
                        : { backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
                      }
                    >
                      <SIcon className="w-3 h-3" strokeWidth={1.5} />
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Context */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Contexto da instrução</h2>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">O que o representante deve saber antes de cada visita?</label>
              <textarea
                rows={5}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Descreva o contexto que a IA deve incorporar ao briefing pré-visita. Ex: destacar o lançamento da linha SS26, condições especiais de campanha, produtos em foco..."
                className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-[11px] text-muted-foreground">{form.description.length}/500 caracteres</p>
            </div>
          </div>

          {/* Targeting */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Escopo</h2>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Aplicar para</label>
              <select
                value={form.scope}
                onChange={e => setForm(f => ({ ...f, scope: e.target.value as Scope, scopeDetail: e.target.value }))}
                className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Todos os representantes">Todos os representantes</option>
                <option value="Por região">Por região</option>
                <option value="Por representante">Por representante específico</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right — preview + stats */}
        <div className="space-y-4">

          {/* Preview */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prévia do briefing</span>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stratStyle.bg }}>
                  <StratIcon className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: stratStyle.text }} />
                </div>
                <span className="text-xs font-semibold text-foreground">{form.name || 'Nome da instrução'}</span>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-ai-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-xs text-foreground leading-relaxed">{previewText}</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">Assim o representante verá o briefing antes de cada visita.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estimativa de alcance</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-lg p-3 text-center">
                <div className="text-2xl font-semibold text-foreground">{form.audience}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Representantes</div>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <div className="text-2xl font-semibold text-foreground">~{Math.round(form.audience * 18.4)}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Visitas/semana</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Aderência média esperada</span>
                <span className="font-semibold text-foreground">65%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">Baseado em instruções similares anteriores.</p>
            </div>
          </div>

          {/* Strategy summary */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resumo</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estratégia</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-medium text-[11px]" style={{ backgroundColor: stratStyle.bg, color: stratStyle.text }}>
                  <StratIcon className="w-3 h-3" strokeWidth={1.5} />
                  {form.strategy}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Escopo</span>
                <span className="font-medium text-foreground">{form.scope === 'Todos os representantes' ? 'Todos' : form.scope}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Vigência</span>
                <span className="font-medium text-foreground">
                  {form.startDate && form.endDate
                    ? `${new Date(form.startDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} – ${new Date(form.endDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}`
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
