import { useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router';
import { ChevronDown, ChevronUp, X, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

// ── Types ────────────────────────────────────────────────────────────────────

type WeightValue = 'Despriorizar' | 'Ignorar' | 'Baixa' | 'Média' | 'Alta';

// ── Static data ──────────────────────────────────────────────────────────────

const AVAILABLE_REGIONS = ['Sul', 'Nordeste', 'Sudeste', 'Centro-Oeste', 'Norte', 'Nacional'];
const AVAILABLE_REPS = ['João Silva', 'Ana Costa', 'Carlos Mendes', 'Beatriz Lima'];
const AVAILABLE_CLIENTS = ['Farmácia Central', 'Drogaria Moderna', 'Sapataria União', 'Calçados Express'];

const MODES = [
  { id: 'Crescimento', hint: 'Prioriza clientes com maior potencial de expansão de mix e volume.' },
  { id: 'Recuperação', hint: 'Foca em clientes em risco de inativação ou com queda de compra.' },
  { id: 'Rentabilidade', hint: 'Direciona para clientes com maior retorno financeiro e baixo risco.' },
  { id: 'Cobertura', hint: 'Garante presença mínima em todas as regiões e clientes do território.' },
  { id: 'Coleção', hint: 'Prioriza visitas para apresentar a coleção atual a clientes estratégicos.' },
  { id: 'Personalizado', hint: 'Configure manualmente os pesos de cada variável.' },
];

const DIMENSIONS = [
  {
    id: 'carteira',
    label: 'Carteira e retenção',
    emoji: '❤️',
    variables: [
      { id: 'risco-inativacao', label: 'Risco de inativação', description: 'Clientes sem compra próximos da janela de inatividade' },
      { id: 'cliente-reativavel', label: 'Cliente reativável', description: 'Inativo recente com histórico de alto faturamento' },
      { id: 'nps-baixo', label: 'NPS baixo na última visita', description: 'Cliente com insatisfação registrada pelo rep' },
    ],
  },
  {
    id: 'performance',
    label: 'Performance comercial',
    emoji: '📈',
    variables: [
      { id: 'maior-ticket', label: 'Maior ticket histórico', description: 'Clientes com maior volume médio de pedido' },
      { id: 'prob-fechamento', label: 'Probabilidade alta de fechamento', description: 'Score de propensão acima de 80%' },
      { id: 'queda-volume', label: 'Queda de volume no último ciclo', description: 'Pedido abaixo de 70% da média histórica' },
    ],
  },
  {
    id: 'mix',
    label: 'Mix e coleção',
    emoji: '👟',
    variables: [
      { id: 'mix-gap', label: 'Mix gap — categoria não explorada', description: 'Cliente nunca comprou determinada linha' },
      { id: 'colecao-nova', label: 'Nova coleção não apresentada', description: 'Cliente ainda não recebeu apresentação da coleção atual' },
    ],
  },
  {
    id: 'credito',
    label: 'Crédito e saúde financeira',
    emoji: '💳',
    variables: [
      { id: 'limite-disponivel', label: 'Limite disponível alto', description: 'Cliente com crédito liberado para novos pedidos' },
      { id: 'inadimplencia', label: 'Inadimplência recente', description: 'Cliente com pagamento em atraso nos últimos 60 dias' },
    ],
  },
  {
    id: 'cobertura',
    label: 'Cobertura territorial',
    emoji: '🗺️',
    variables: [
      { id: 'regiao-pouco-visitada', label: 'Região pouco visitada no mês', description: 'Área com menos de 30% de cobertura no ciclo atual' },
      { id: 'sem-visita-30', label: 'Cliente sem visita há mais de 30 dias', description: 'Fora da frequência esperada de visita' },
    ],
  },
];

const ALL_VAR_IDS = DIMENSIONS.flatMap((d) => d.variables.map((v) => v.id));

const DEFAULT_WEIGHTS: Record<string, WeightValue> = Object.fromEntries(
  ALL_VAR_IDS.map((id) => [id, 'Ignorar'])
);

const MODE_PRESETS: Record<string, Record<string, WeightValue>> = {
  Crescimento: {
    'risco-inativacao': 'Média', 'cliente-reativavel': 'Alta', 'nps-baixo': 'Baixa',
    'maior-ticket': 'Alta', 'prob-fechamento': 'Alta', 'queda-volume': 'Média',
    'mix-gap': 'Alta', 'colecao-nova': 'Média',
    'limite-disponivel': 'Alta', 'inadimplencia': 'Despriorizar',
    'regiao-pouco-visitada': 'Baixa', 'sem-visita-30': 'Baixa',
  },
  Recuperação: {
    'risco-inativacao': 'Alta', 'cliente-reativavel': 'Alta', 'nps-baixo': 'Alta',
    'maior-ticket': 'Média', 'prob-fechamento': 'Baixa', 'queda-volume': 'Alta',
    'mix-gap': 'Baixa', 'colecao-nova': 'Baixa',
    'limite-disponivel': 'Média', 'inadimplencia': 'Média',
    'regiao-pouco-visitada': 'Média', 'sem-visita-30': 'Alta',
  },
  Rentabilidade: {
    'risco-inativacao': 'Baixa', 'cliente-reativavel': 'Média', 'nps-baixo': 'Média',
    'maior-ticket': 'Alta', 'prob-fechamento': 'Alta', 'queda-volume': 'Média',
    'mix-gap': 'Média', 'colecao-nova': 'Baixa',
    'limite-disponivel': 'Alta', 'inadimplencia': 'Despriorizar',
    'regiao-pouco-visitada': 'Ignorar', 'sem-visita-30': 'Baixa',
  },
  Cobertura: {
    'risco-inativacao': 'Média', 'cliente-reativavel': 'Média', 'nps-baixo': 'Baixa',
    'maior-ticket': 'Baixa', 'prob-fechamento': 'Baixa', 'queda-volume': 'Baixa',
    'mix-gap': 'Baixa', 'colecao-nova': 'Baixa',
    'limite-disponivel': 'Ignorar', 'inadimplencia': 'Ignorar',
    'regiao-pouco-visitada': 'Alta', 'sem-visita-30': 'Alta',
  },
  Coleção: {
    'risco-inativacao': 'Baixa', 'cliente-reativavel': 'Média', 'nps-baixo': 'Baixa',
    'maior-ticket': 'Alta', 'prob-fechamento': 'Média', 'queda-volume': 'Baixa',
    'mix-gap': 'Alta', 'colecao-nova': 'Alta',
    'limite-disponivel': 'Média', 'inadimplencia': 'Despriorizar',
    'regiao-pouco-visitada': 'Baixa', 'sem-visita-30': 'Média',
  },
  Personalizado: { ...DEFAULT_WEIGHTS },
};

const EXISTING_RULES_DATA = [
  { id: '1', name: 'Sul — Recuperação', regions: ['Sul'], reps: [] as string[], start: '2026-06-01', end: '2026-06-30' },
  { id: '2', name: 'Rep João Silva', regions: [] as string[], reps: ['João Silva'], start: '2026-06-15', end: '2026-07-31' },
  { id: '3', name: 'Nordeste — Coleção Verão', regions: ['Nordeste'], reps: [] as string[], start: '2026-07-01', end: '2026-08-31' },
  { id: '4', name: 'Nacional — Q1 2026', regions: ['Nacional'], reps: [] as string[], start: '2026-01-01', end: '2026-03-31' },
];

const RULE_PREFILL: Record<string, { name: string; regions: string[]; reps: string[] }> = {
  '1': { name: 'Sul — Recuperação (cópia)', regions: ['Sul'], reps: [] },
  '2': { name: 'Rep João Silva (cópia)', regions: [], reps: ['João Silva'] },
  '3': { name: 'Nordeste — Coleção Verão (cópia)', regions: ['Nordeste'], reps: [] },
  '4': { name: 'Nacional — Q1 2026 (cópia)', regions: [], reps: [] },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDimensionSummary(varIds: string[], weights: Record<string, WeightValue>): string {
  const counts: Partial<Record<WeightValue, number>> = {};
  for (const id of varIds) {
    const w = weights[id] ?? 'Ignorar';
    if (w !== 'Ignorar') counts[w] = (counts[w] ?? 0) + 1;
  }
  if (Object.keys(counts).length === 0) return 'não configurado';
  return Object.entries(counts)
    .map(([w, n]) => `${n} ${w.toLowerCase()}`)
    .join(' · ');
}

function datesOverlap(s1: string, e1: string, s2: string, e2: string) {
  return s1 <= e2 && e1 >= s2;
}

interface ConflictResult {
  conflict: boolean;
  ruleName?: string;
  scopeLabel?: string;
  ruleStart?: string;
  ruleEnd?: string;
}

function detectConflict(
  regions: string[],
  reps: string[],
  start: string,
  end: string,
  excludeId?: string
): ConflictResult {
  if (!start || !end) return { conflict: false };
  for (const rule of EXISTING_RULES_DATA) {
    if (rule.id === excludeId) continue;
    const scopeOverlap =
      rule.regions.some((r) => regions.includes(r) || regions.includes('Nacional') || r === 'Nacional') ||
      rule.reps.some((r) => reps.includes(r));
    if (scopeOverlap && datesOverlap(start, end, rule.start, rule.end)) {
      return {
        conflict: true,
        ruleName: rule.name,
        scopeLabel: [...rule.regions, ...rule.reps].join(', '),
        ruleStart: rule.start,
        ruleEnd: rule.end,
      };
    }
  }
  return { conflict: false };
}

// ── Sub-components ───────────────────────────────────────────────────────────

const WEIGHT_OPTIONS: WeightValue[] = ['Despriorizar', 'Ignorar', 'Baixa', 'Média', 'Alta'];

const WEIGHT_ACTIVE_STYLES: Record<WeightValue, React.CSSProperties> = {
  Despriorizar: { backgroundColor: '#FCEBEB', color: '#A32D2D', borderColor: '#F09595' },
  Ignorar:      { backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' },
  Baixa:        { backgroundColor: '#EAF3DE', color: '#3B6D11', borderColor: '#97C459' },
  Média:        { backgroundColor: '#FAEEDA', color: '#854F0B', borderColor: '#EF9F27' },
  Alta:         { backgroundColor: '#E6F1FB', color: '#185FA5', borderColor: '#85B7EB' },
};

const WEIGHT_INACTIVE: React.CSSProperties = {
  borderWidth: '0.5px', borderStyle: 'solid',
  borderColor: 'var(--border)', backgroundColor: 'transparent', color: 'var(--muted-foreground)',
};

function WeightSelector({ value, onChange }: { value: WeightValue; onChange: (v: WeightValue) => void }) {
  return (
    <div className="flex gap-1 flex-shrink-0 flex-wrap">
      {WEIGHT_OPTIONS.map((opt) => {
        const isActive = value === opt;
        const style: React.CSSProperties = isActive
          ? { borderWidth: '0.5px', borderStyle: 'solid', ...WEIGHT_ACTIVE_STYLES[opt] }
          : WEIGHT_INACTIVE;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="px-2.5 py-1 text-[11px] font-medium transition-colors rounded-full whitespace-nowrap"
            style={style}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function TagInput({
  tags,
  available,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[];
  available: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const remaining = available.filter((a) => !tags.includes(a));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 border border-border rounded-lg bg-background">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground"
          >
            {tag}
            <button onClick={() => onRemove(tag)} className="hover:text-red-500 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-muted-foreground hover:bg-secondary transition-colors border border-dashed border-border">
            <Plus className="w-3 h-3" />
            {tags.length === 0 ? placeholder : 'Adicionar'}
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-52 p-1.5" align="start">
        {remaining.length === 0 ? (
          <p className="text-xs text-muted-foreground px-2 py-1.5">Todos adicionados</p>
        ) : (
          remaining.map((opt) => (
            <button
              key={opt}
              onClick={() => { onAdd(opt); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
            >
              {opt}
            </button>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}

function ExceptionInput({
  tags,
  available,
  onAdd,
  onRemove,
  label,
}: {
  tags: string[];
  available: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const remaining = available.filter((a) => !tags.includes(a));

  return (
    <div className="mt-2 border border-dashed border-border rounded-lg p-3 space-y-2">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: '#FAEEDA', border: '1px solid #EF9F27', color: '#92400e' }}
            >
              {tag}
              <button onClick={() => onRemove(tag)} className="hover:opacity-60 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <PopoverTrigger asChild>
            <button className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-muted-foreground hover:bg-secondary transition-colors border border-dashed border-border">
              <Plus className="w-3 h-3" />
              Adicionar
            </button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-52 p-1.5" align="start">
          {remaining.length === 0 ? (
            <p className="text-xs text-muted-foreground px-2 py-1.5">Nenhuma opção disponível</p>
          ) : (
            remaining.map((opt) => (
              <button
                key={opt}
                onClick={() => { onAdd(opt); setOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
              >
                {opt}
              </button>
            ))
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Stepper({ step }: { step: 1 | 2 }) {
  const step1Done = step > 1;

  const circleStyle = (state: 'done' | 'active' | 'pending'): React.CSSProperties => {
    if (state === 'done')   return { backgroundColor: '#3B6D11', color: '#fff' };
    if (state === 'active') return { backgroundColor: '#185FA5', color: '#fff' };
    return { backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--muted-foreground)' };
  };

  return (
    <div className="flex items-center gap-3">
      {/* Step 1 */}
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
          style={circleStyle(step1Done ? 'done' : 'active')}
        >
          1
        </div>
        <span
          className="text-[13px] font-medium"
          style={{ color: step1Done ? '#3B6D11' : 'var(--foreground)' }}
        >
          Escopo e vigência
        </span>
      </div>

      {/* Connector */}
      <div
        style={{
          width: 40, height: '0.5px',
          backgroundColor: step1Done ? '#3B6D11' : 'var(--border)',
        }}
      />

      {/* Step 2 */}
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
          style={circleStyle(step === 2 ? 'active' : 'pending')}
        >
          2
        </div>
        <span
          className="text-[13px]"
          style={{ color: step === 2 ? 'var(--foreground)' : 'var(--muted-foreground)' }}
        >
          Pesos de priorização
        </span>
      </div>
    </div>
  );
}

function DimensionAccordion({
  dimension,
  isOpen,
  onToggle,
  weights,
  onWeightChange,
}: {
  dimension: (typeof DIMENSIONS)[0];
  isOpen: boolean;
  onToggle: () => void;
  weights: Record<string, WeightValue>;
  onWeightChange: (varId: string, v: WeightValue) => void;
}) {
  const summary = getDimensionSummary(dimension.variables.map((v) => v.id), weights);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-card hover:bg-secondary/30 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-sm leading-none" style={{ color: 'var(--muted-foreground)' }}>
            {dimension.emoji}
          </span>
          <div>
            <div className="text-[13px] font-medium text-foreground">{dimension.label}</div>
            <div className="text-[11px] mt-0.5 text-muted-foreground">{summary}</div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-border divide-y divide-border">
          {dimension.variables.map((variable) => (
            <div key={variable.id} className="px-5 py-4 flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-foreground">{variable.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{variable.description}</div>
              </div>
              <WeightSelector
                value={weights[variable.id] ?? 'Ignorar'}
                onChange={(v) => onWeightChange(variable.id, v)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

interface FormState {
  name: string;
  regions: string[];
  regionExceptions: string[];
  reps: string[];
  repExceptions: string[];
  clients: string[];
  startDate: string;
  endDate: string;
  mode: string;
  weights: Record<string, WeightValue>;
}

export function SteeringRuleEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isNew = !id || id === 'nova';
  const fromId = searchParams.get('from');

  const [step, setStep] = useState<1 | 2>(1);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(['carteira']));

  const [form, setForm] = useState<FormState>(() => {
    if (fromId && RULE_PREFILL[fromId]) {
      const src = RULE_PREFILL[fromId];
      return {
        name: src.name,
        regions: src.regions,
        regionExceptions: [],
        reps: src.reps,
        repExceptions: [],
        clients: [],
        startDate: '',
        endDate: '',
        mode: '',
        weights: { ...DEFAULT_WEIGHTS },
      };
    }
    return {
      name: '',
      regions: [],
      regionExceptions: [],
      reps: [],
      repExceptions: [],
      clients: [],
      startDate: '',
      endDate: '',
      mode: '',
      weights: { ...DEFAULT_WEIGHTS },
    };
  });

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const conflict = detectConflict(
    form.regions,
    form.reps,
    form.startDate,
    form.endDate,
    isNew ? undefined : id
  );

  const hasScope =
    form.regions.length > 0 || form.reps.length > 0 || form.clients.length > 0;

  const step1Valid =
    form.name.trim() !== '' &&
    hasScope &&
    form.startDate !== '' &&
    form.endDate !== '' &&
    !conflict.conflict;

  const handleModeSelect = (modeId: string) => {
    setField('mode', modeId);
    if (MODE_PRESETS[modeId]) {
      setField('weights', { ...MODE_PRESETS[modeId] });
    }
  };

  const toggleAccordion = (dimId: string) =>
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      next.has(dimId) ? next.delete(dimId) : next.add(dimId);
      return next;
    });

  const scopePills = [
    ...form.regions,
    ...(form.regionExceptions.length > 0
      ? [`+ ${form.regionExceptions.length} exceção${form.regionExceptions.length > 1 ? 'ões' : ''}`]
      : []),
    ...form.reps,
    ...(form.repExceptions.length > 0
      ? [`+ ${form.repExceptions.length} cliente${form.repExceptions.length > 1 ? 's' : ''}`]
      : []),
    ...form.clients,
    ...(form.startDate && form.endDate ? [`${form.startDate} — ${form.endDate}`] : []),
  ];

  const pageTitle = isNew ? 'Nova regra' : (form.name || 'Editar regra');

  const scopePillStyle: React.CSSProperties = {
    borderWidth: '0.5px', borderStyle: 'solid',
    borderColor: 'var(--border)',
    backgroundColor: 'var(--background)',
    color: 'var(--muted-foreground)',
  };

  const modePillActive: React.CSSProperties = {
    borderWidth: '0.5px', borderStyle: 'solid',
    borderColor: '#185FA5', backgroundColor: '#E6F1FB', color: '#0C447C',
  };

  const modePillInactive: React.CSSProperties = {
    borderWidth: '0.5px', borderStyle: 'solid',
    borderColor: 'var(--border)', backgroundColor: 'var(--background)', color: 'var(--muted-foreground)',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link to="/direcionamento" className="text-muted-foreground hover:text-foreground transition-colors">
          Direcionamento de rota
        </Link>
        <span className="text-muted-foreground">›</span>
        <span className="text-foreground">{pageTitle}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">{pageTitle}</h1>
        <button
          onClick={() => navigate('/direcionamento')}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
        >
          Cancelar
        </button>
      </div>

      {/* Stepper */}
      <Stepper step={step} />

      {/* ── STEP 1 ─────────────────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-4 max-w-2xl">
          {/* Nome */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Nome da regra</h2>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="Ex: Nordeste — Coleção Verão"
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Escopo */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Escopo de aplicação</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Combine regiões, representantes e clientes. Adicione exceções quando necessário.
              </p>
            </div>

            {/* Regiões */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Regiões
              </label>
              <TagInput
                tags={form.regions}
                available={AVAILABLE_REGIONS}
                onAdd={(r) => setField('regions', [...form.regions, r])}
                onRemove={(r) => setField('regions', form.regions.filter((x) => x !== r))}
                placeholder="Selecionar região"
              />
              {form.regions.length > 0 && (
                <ExceptionInput
                  tags={form.regionExceptions}
                  available={AVAILABLE_REPS}
                  onAdd={(r) => setField('regionExceptions', [...form.regionExceptions, r])}
                  onRemove={(r) =>
                    setField('regionExceptions', form.regionExceptions.filter((x) => x !== r))
                  }
                  label="Incluir fora desta região"
                />
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Representantes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Representantes
              </label>
              <TagInput
                tags={form.reps}
                available={AVAILABLE_REPS}
                onAdd={(r) => setField('reps', [...form.reps, r])}
                onRemove={(r) => setField('reps', form.reps.filter((x) => x !== r))}
                placeholder="Selecionar representante"
              />
              {form.reps.length > 0 && (
                <ExceptionInput
                  tags={form.repExceptions}
                  available={AVAILABLE_CLIENTS}
                  onAdd={(c) => setField('repExceptions', [...form.repExceptions, c])}
                  onRemove={(c) =>
                    setField('repExceptions', form.repExceptions.filter((x) => x !== c))
                  }
                  label="Incluir clientes fora destes reps"
                />
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Clientes pontuais */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Clientes pontuais
              </label>
              <TagInput
                tags={form.clients}
                available={AVAILABLE_CLIENTS}
                onAdd={(c) => setField('clients', [...form.clients, c])}
                onRemove={(c) => setField('clients', form.clients.filter((x) => x !== c))}
                placeholder="Selecionar cliente"
              />
            </div>
          </div>

          {/* Vigência */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Vigência</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Início</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setField('startDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Fim</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setField('endDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            {conflict.conflict && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="flex-shrink-0">⚠️</span>
                <p className="text-sm text-red-700">
                  Conflito com <strong>'{conflict.ruleName}'</strong> que cobre{' '}
                  {conflict.scopeLabel} de {conflict.ruleStart} a {conflict.ruleEnd}.{' '}
                  Ajuste o período ou o escopo antes de continuar.
                </p>
              </div>
            )}
          </div>

          {/* Footer step 1 */}
          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próximo — Pesos →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2 ─────────────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6 max-w-2xl">
          {/* Scope summary pills */}
          {scopePills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {scopePills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={scopePillStyle}
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {/* Modo estratégico */}
          <div className="space-y-3">
            <h2 className="text-[13px] font-medium text-foreground">Modo estratégico</h2>
            <div className="flex flex-wrap gap-2">
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className="transition-colors rounded-full text-[13px]"
                  style={{
                    padding: '6px 14px',
                    ...(form.mode === mode.id ? modePillActive : modePillInactive),
                  }}
                >
                  {mode.id}
                </button>
              ))}
            </div>
            {form.mode && (
              <p className="text-[11px] text-muted-foreground">
                {MODES.find((m) => m.id === form.mode)?.hint}
              </p>
            )}
          </div>

          {/* Acordeões de pesos */}
          <div className="space-y-2">
            {DIMENSIONS.map((dim) => (
              <DimensionAccordion
                key={dim.id}
                dimension={dim}
                isOpen={openAccordions.has(dim.id)}
                onToggle={() => toggleAccordion(dim.id)}
                weights={form.weights}
                onWeightChange={(varId, v) =>
                  setForm((prev) => ({ ...prev, weights: { ...prev.weights, [varId]: v } }))
                }
              />
            ))}
          </div>

          {/* Footer step 2 */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              ← Voltar
            </button>
            <button
              onClick={() => navigate('/direcionamento')}
              className="px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#185FA5' }}
            >
              Salvar regra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
