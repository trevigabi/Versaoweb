import { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  ArrowLeft, X, Check, AlertCircle, ChevronRight,
  MapPin, Clock, User, Calendar, Send, RefreshCw,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const stopsData = [
  { id: 1, client: 'Supermercado Rondon',      status: 'visited', time: '08:15 (35 min)',    address: 'Av. Brasil, 1500 - Centro',            type: 'Venda Ativa',         notes: 'Check-in e check-out validados via GPS com sucesso.' },
  { id: 2, client: 'Mercearia Silva & Santos', status: 'visited', time: '09:30 (22 min)',    address: 'Rua Alagoas, 422 - Bairro Alto',       type: 'Reposição de Gôndola', notes: 'Visita executada perfeitamente no período da manhã.' },
  { id: 3, client: 'Hortifruti Pomar Verde',   status: 'missed',  time: 'Planejado: 10:45', address: 'Av. das Nações, 89 - Jd. Europa',      type: 'Venda Ativa',         notes: 'Ausência de justificativa. Rota foi quebrada a partir deste ponto.' },
  { id: 4, client: 'Mini Mercado do Bairro',   status: 'missed',  time: 'Planejado: 11:30', address: 'Rua Ceará, 105 - Vila Nova',            type: 'Cobrança',            notes: 'Não visitado. Veículo seguiu rumo oposto ao roteiro.' },
  { id: 5, client: 'Drogaria Poupa Farma',     status: 'missed',  time: 'Planejado: 13:00', address: 'Av. Paulista, 3100 - Bela Vista',      type: 'Venda Ativa',         notes: 'Representante encerrou geolocalização no aplicativo.' },
  { id: 6, client: 'Panificadora Doce Sabor',  status: 'missed',  time: 'Planejado: 14:15', address: 'Rua Minas Gerais, 77 - Consolação',    type: 'Relacionamento',      notes: 'Não visitado devido ao desvio não justificado.' },
  { id: 7, client: 'Conveniência Posto Central',status:'missed',  time: 'Planejado: 15:30', address: 'Av. 9 de Julho, 450 - Centro',          type: 'Venda Ativa',         notes: 'Nenhum ponto de geolocalização capturado na área.' },
  { id: 8, client: 'Atacadão Alimentos S/A',   status: 'missed',  time: 'Planejado: 16:45', address: 'Av. Marginal Direita, 900 - Industrial',type: 'Venda Ativa',         notes: 'Trajeto final totalmente descontinuado pelo operador.' },
];

const historyData = [
  { day: 1,  status: 'complete',   date: '26/05' }, { day: 2,  status: 'complete',   date: '25/05' }, { day: 3,  status: 'incomplete', date: '24/05' },
  { day: 4,  status: 'complete',   date: '23/05' }, { day: 5,  status: 'noroute',    date: '22/05' }, { day: 6,  status: 'noroute',    date: '21/05' },
  { day: 7,  status: 'complete',   date: '20/05' }, { day: 8,  status: 'complete',   date: '19/05' }, { day: 9,  status: 'complete',   date: '18/05' },
  { day: 10, status: 'complete',   date: '17/05' }, { day: 11, status: 'incomplete', date: '16/05' }, { day: 12, status: 'noroute',    date: '15/05' },
  { day: 13, status: 'complete',   date: '14/05' }, { day: 14, status: 'complete',   date: '13/05' }, { day: 15, status: 'complete',   date: '12/05' },
  { day: 16, status: 'complete',   date: '11/05' }, { day: 17, status: 'complete',   date: '10/05' }, { day: 18, status: 'noroute',    date: '09/05' },
  { day: 19, status: 'complete',   date: '08/05' }, { day: 20, status: 'complete',   date: '07/05' }, { day: 21, status: 'incomplete', date: '06/05' },
  { day: 22, status: 'complete',   date: '05/05' }, { day: 23, status: 'complete',   date: '04/05' }, { day: 24, status: 'noroute',    date: '03/05' },
  { day: 25, status: 'complete',   date: '02/05' }, { day: 26, status: 'complete',   date: '01/05' }, { day: 27, status: 'complete',   date: '30/04' },
  { day: 28, status: 'complete',   date: '29/04' }, { day: 29, status: 'complete',   date: '28/04' }, { day: 30, status: 'complete',   date: '27/04' },
];

const getOccurrenceData = (id: string) => {
  const occurrences: Record<string, any> = {
    '1': {
      type: 'Rota não executada',
      representative: 'João Oliveira',
      date: '27/05/2026',
      severity: 'high',
      planned: 8, visited: 2, notVisited: 6, executionRate: 25,
      justification: 'Nenhuma informada',
      pattern: { incompleteRoutes: 3, executionRate: 71, regionalReps: 2 },
    },
    '2': {
      type: 'Visita muito curta',
      representative: 'Maria Costa',
      client: 'Mercado Central',
      date: '27/05/2026',
      severity: 'medium',
      duration: '6 min',
      avgDuration: '42 min',
      signals: [
        { text: 'Ficha do cliente aberta',       time: '14h20', detail: 'único sinal registrado',   status: 'check' },
        { text: 'Nenhuma anotação',               detail: 'Sem texto, áudio ou foto',               status: 'x' },
        { text: 'Nenhum follow-up criado',        detail: 'Sem próxima ação definida',              status: 'x' },
        { text: 'Nenhum resultado classificado',  detail: 'Visita sem encerramento',                status: 'x' },
      ],
      pattern: { shortVisits: 4, avgShortDuration: '6 min', teamAvg: '38 min' },
    },
    '3': {
      type: 'Baixa atividade',
      representative: 'Ana Santos',
      client: '---',
      date: '26/05/2026',
      severity: 'medium',
      period: 'Semana 22/mai–28/mai',
      visits: 3,
      avgVisits: 8.2,
      pattern: { consecutiveWeeks: '3ª', clientsNoContact: 8, regionalReps: 0 },
    },
    '4': {
      type: 'Cliente crítico sem visita',
      representative: 'Pedro Ferreira',
      client: 'Calçados Premium',
      date: '25/05/2026',
      severity: 'high',
      daysWithoutVisit: 112,
      historicalFreq: 38,
      aiScore: 94,
      interactions: [
        { text: 'Visita — resultado positivo — há 112 dias', detail: 'Pedido R$ 5.200 — linha Moleca',          status: 'check' },
        { text: 'Visita — resultado positivo — há 150 dias', detail: 'Pedido R$ 3.800 — Conforto',              status: 'check' },
        { text: 'Ligação — sem retorno — há 180 dias',       detail: 'Tentativa de contato sem sucesso',        status: 'x' },
      ],
      pattern: { aiScore: 94, daysUntilInactive: 68, avgTicket: 'R$ 4.500' },
    },
    '5': {
      type: 'Carteira descoberta',
      representative: 'Carlos Mendes',
      territory: 'Litoral Norte',
      date: '24/05/2026',
      severity: 'medium',
      totalClients: 64,
      uncovered: 20,
      coverage: {
        recent: { clients: 44, percent: 69 },
        medium: { clients: 12, percent: 19 },
        old:    { clients: 8,  percent: 12 },
      },
      priorityClients: [
        { name: 'Calçados Bom Pé', days: 78, score: 88, status: 'Crítico' },
        { name: 'Moda Norte',       days: 62, score: 75, status: 'Risco'   },
        { name: 'Casa do Sapato',   days: 91, score: 92, status: 'Crítico' },
      ],
      pattern: { uncoveredPercent: 31, over60Days: 8, teamAvg: 89 },
    },
  };
  return occurrences[id] || occurrences['1'];
};

const resolutionActions = [
  { id: 'dispense',   label: 'Dispensar Ocorrência',     description: 'Falso positivo ou justificativa aceitável do gestor.' },
  { id: 'flag',       label: 'Sinalizar para Gestor',     description: 'Encaminhar para a fila de feedback do supervisor.' },
  { id: 'notify',     label: 'Notificar Representante',   description: 'Dispara um alerta no aplicativo solicitando explicação.' },
  { id: 'reschedule', label: 'Reagendar Críticos',        description: 'Insere clientes não visitados como prioridade máxima amanhã.' },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

/** Card wrapper com título de seção */
function OccurrenceSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}

/** Grade de métricas grandes (valor + label + sub) */
interface Stat {
  value: string | number;
  label: string;
  sub?: string;
  highlight?: boolean; // usa text-primary quando true
}

function StatGrid({ stats, cols = 3 }: { stats: Stat[]; cols?: 2 | 3 }) {
  const gridClass = cols === 2 ? 'grid-cols-2' : 'grid-cols-3';
  return (
    <div className={`grid ${gridClass} gap-5`}>
      {stats.map((s, i) => (
        <div key={i} className="bg-secondary rounded-xl p-5 text-center">
          <div className={`text-2xl font-bold mb-1 ${s.highlight ? 'text-primary' : 'text-foreground'}`}>
            {s.value}
          </div>
          <div className="text-sm text-muted-foreground">{s.label}</div>
          {s.sub && <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}

/** Tabela de sinais/interações com ícone check/x */
interface SignalRow {
  text: string;
  detail: string;
  time?: string;
  status: 'check' | 'x';
}

function SignalTable({ rows, colLabel }: { rows: SignalRow[]; colLabel: string }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left text-xs font-semibold text-muted-foreground pb-2 pr-4 w-8">—</th>
          <th className="text-left text-xs font-semibold text-muted-foreground pb-2 pr-4">{colLabel}</th>
          <th className="text-left text-xs font-semibold text-muted-foreground pb-2">Detalhe</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="py-3 pr-4">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                row.status === 'check' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
              }`}>
                {row.status === 'check'
                  ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  : <X className="w-3.5 h-3.5" strokeWidth={2.5} />}
              </span>
            </td>
            <td className="py-3 pr-4 font-medium text-foreground">{row.text}</td>
            <td className="py-3 text-muted-foreground text-xs">
              {row.time ? `${row.time} — ${row.detail}` : row.detail}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Banner de insight / análise */
function InsightBanner({ text }: { text: string }) {
  return (
    <div className="p-4 bg-secondary border border-border rounded-xl flex items-start gap-3 mt-6">
      <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  );
}

/** Barras de cobertura com label e percentual */
interface CoverageBar {
  label: string;
  clients: number;
  percent: number;
  muted?: boolean; // usa muted-foreground como fill quando true
}

function CoverageBarList({ bars }: { bars: CoverageBar[] }) {
  return (
    <div className="space-y-5">
      {bars.map((bar, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">{bar.label}</span>
            <span className="font-semibold text-foreground">{bar.clients} clientes — {bar.percent}%</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${bar.muted ? 'bg-border' : 'bg-primary'}`}
              style={{ width: `${bar.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Tabela genérica com colunas configuráveis */
interface TableCol<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

function DataTable<T>({ cols, rows }: { cols: TableCol<T>[]; rows: T[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border">
          {cols.map((col, i) => (
            <th
              key={i}
              className={`text-${col.align ?? 'left'} text-xs font-semibold text-muted-foreground pb-2 pr-4 last:pr-0`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((row, i) => (
          <tr key={i}>
            {cols.map((col, j) => (
              <td key={j} className={`py-3 pr-4 last:pr-0 text-${col.align ?? 'left'}`}>
                {col.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Layout de 2 colunas: conteúdo + painel de resolução */
function OccurrenceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">{children}</div>
      <div className="lg:col-span-1">
        <ResolutionPanel />
      </div>
    </div>
  );
}

// ─── Resolution Panel ─────────────────────────────────────────────────────────

function ResolutionPanel() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [auditNote, setAuditNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction) { setValidationError('Selecione uma ação final para prosseguir.'); return; }
    if (!auditNote.trim()) { setValidationError('O preenchimento da observação é obrigatório.'); return; }
    setValidationError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-6">
      <div className="p-5 border-b border-border bg-foreground text-background">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Send className="w-4 h-4 opacity-70" strokeWidth={1.5} />
          Painel de Resolução
        </h2>
        <p className="text-xs opacity-50 mt-1">Registre sua observação e aplique uma ação definitiva.</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Observação do Auditor <span className="text-danger">*</span>
            </label>
            <textarea
              value={auditNote}
              onChange={e => setAuditNote(e.target.value)}
              placeholder="Ex: Representante finalizou mais cedo por questões pessoais..."
              className="w-full min-h-[100px] px-4 py-3 text-sm bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 outline-none resize-none placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Ação Final
            </label>
            <div className="space-y-2">
              {resolutionActions.map((action) => (
                <label
                  key={action.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedAction === action.id
                      ? 'border-foreground bg-secondary ring-1 ring-foreground/10'
                      : 'border-border hover:border-foreground/30 bg-card'
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution-action"
                    value={action.id}
                    checked={selectedAction === action.id}
                    onChange={() => { setSelectedAction(action.id); setValidationError(''); }}
                    className="mt-0.5 accent-foreground"
                  />
                  <div>
                    <span className="text-sm font-semibold text-foreground block">{action.label}</span>
                    <span className="text-xs text-muted-foreground mt-0.5 block leading-relaxed">{action.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {validationError && (
            <div className="p-3 bg-danger-light border border-danger/20 text-danger-foreground text-xs rounded-xl font-medium">
              {validationError}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-foreground hover:opacity-90 text-background py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" strokeWidth={1.5} />
            Concluir Auditoria
          </button>
        </form>
      ) : (
        <div className="p-5 space-y-4">
          <div className="p-4 bg-secondary border border-border rounded-xl">
            <p className="font-semibold flex items-center gap-1.5 text-foreground mb-1">
              <Check className="w-4 h-4" strokeWidth={2.5} /> Auditoria Concluída
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A ocorrência foi atualizada com sucesso. Todos os envolvidos foram notificados.
            </p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setSelectedAction(null); setAuditNote(''); }}
            className="w-full py-3 px-4 border border-border text-foreground hover:bg-secondary font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.5} /> Reabrir Auditoria
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Occurrence type views ────────────────────────────────────────────────────

function RotaNaoExecutada({ occurrence }: { occurrence: any }) {
  const [selectedStop, setSelectedStop] = useState(3);
  const stop = stopsData.find(s => s.id === selectedStop)!;

  return (
    <OccurrenceShell>
      {/* Timeline */}
      <OccurrenceSection title="Análise Linear da Rota do Dia">
        <p className="text-xs text-muted-foreground -mt-4 mb-6">
          Sequência de visitas do dia. Clique em cada parada para ver o diagnóstico.
        </p>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Executada
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border inline-block" /> Não Executada
          </span>
        </div>

        {/* Stops */}
        <div className="relative mb-6 bg-secondary/40 rounded-xl p-4">
          <div className="absolute top-9 left-9 right-9 h-px bg-border z-0" />
          <div className="absolute top-9 left-9 h-px bg-primary z-0" style={{ width: 'calc(14%)' }} />
          <div className="relative z-10 flex justify-between gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
            {stopsData.map((s) => {
              const isSelected = selectedStop === s.id;
              const isVisited = s.status === 'visited';
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStop(s.id)}
                  className="flex flex-col items-center min-w-[70px] focus:outline-none"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all ${
                    isVisited ? 'bg-primary' : 'bg-foreground/30'
                  } ${isSelected ? 'ring-2 ring-offset-2 ring-foreground scale-110' : ''}`}>
                    {s.id}
                  </div>
                  <span className={`text-[10px] font-medium mt-2 truncate w-16 text-center ${isSelected ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                    {s.client.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    {isVisited ? s.time.split(' ')[0] : 'Pendente'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stop detail */}
        <div className="bg-secondary/40 border border-border rounded-xl p-5">
          <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-border">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parada #{stop.id}</span>
              <h3 className="text-base font-semibold text-foreground mt-0.5">{stop.client}</h3>
            </div>
            <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 border ${
              stop.status === 'visited'
                ? 'bg-secondary text-foreground border-border'
                : 'bg-danger-light text-danger-foreground border-danger/20'
            }`}>
              {stop.status === 'visited'
                ? <><Check className="w-3 h-3" strokeWidth={2.5} /> Visita Confirmada</>
                : <><X className="w-3 h-3" strokeWidth={2.5} /> Não Visitado</>}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Endereço</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                <span className="truncate">{stop.address}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Horário</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                {stop.time}
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Tipo de Tarefa</span>
              <span className="font-medium text-foreground">{stop.type}</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Auditoria</span>
            <p className={`text-sm leading-relaxed ${stop.status === 'missed' ? 'text-danger-foreground' : 'text-foreground'}`}>
              {stop.notes}
            </p>
          </div>
        </div>
      </OccurrenceSection>

      {/* Recurrence */}
      <OccurrenceSection title="Análise de Recorrência — Últimos 30 dias">
        <p className="text-xs text-muted-foreground -mt-4 mb-6">
          Avalie se o desvio é um caso isolado ou padrão de {occurrence.representative}.
        </p>

        <StatGrid stats={[
          { value: `${occurrence.pattern.incompleteRoutes} Rotas`, label: 'Desvios Recentes',  sub: 'Frequência moderada (60d)' },
          { value: `${occurrence.pattern.executionRate}% Mês`,     label: 'Taxa de Execução',   sub: 'Abaixo da média (85%)', highlight: true },
          { value: `${occurrence.pattern.regionalReps} Casos`,     label: 'Região',             sub: 'Não é padrão regional' },
        ]} />

        {/* Activity calendar */}
        <div className="mt-6">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
            Atividade diária nos últimos 30 dias
          </span>
          <div className="bg-secondary rounded-xl p-4">
            <div className="flex flex-wrap gap-2">
              {historyData.map((day) => {
                const colorClass =
                  day.status === 'complete'   ? 'bg-primary' :
                  day.status === 'incomplete' ? 'bg-muted-foreground' : 'bg-border';
                const label =
                  day.status === 'complete'   ? 'Execução 100%' :
                  day.status === 'incomplete' ? 'Desvio de Rota' : 'Sem Rota';
                return (
                  <div key={day.day} className="relative group">
                    <div className={`w-7 h-7 rounded-md cursor-default flex items-center justify-center text-[10px] font-bold text-white ${colorClass}`}>
                      {day.day}
                    </div>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-foreground text-background text-[10px] py-1 px-2 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {day.date} — {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border text-xs text-muted-foreground justify-between items-center">
              <span>30 dias analisados</span>
              <div className="flex gap-3">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Completa</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted-foreground inline-block" /> Incompleta</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-border inline-block" /> Sem Rota</span>
              </div>
            </div>
          </div>
        </div>

        <InsightBanner text={`${occurrence.representative} está abaixo da média de execução desde abril de 2026. Outros representantes da mesma região operam acima de 90%. O sistema sugere que este não é um problema operacional — é um desvio individual.`} />
      </OccurrenceSection>
    </OccurrenceShell>
  );
}

function VisitaMuitoCurta({ occurrence }: { occurrence: any }) {
  return (
    <OccurrenceShell>
      <OccurrenceSection title="O que aconteceu — Sinais detectados na visita">
        <StatGrid cols={2} stats={[
          { value: occurrence.duration,    label: 'Duração detectada',              highlight: true },
          { value: occurrence.avgDuration, label: 'Média histórica neste cliente' },
        ]} />
        <div className="mt-6">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Sinais detectados</div>
          <SignalTable colLabel="Sinal" rows={occurrence.signals} />
        </div>
      </OccurrenceSection>

      <OccurrenceSection title="Contexto — Padrão ou caso isolado?">
        <StatGrid stats={[
          { value: occurrence.pattern.shortVisits,      label: 'Visitas muito curtas', sub: 'Frequência alta',    highlight: true },
          { value: occurrence.pattern.avgShortDuration, label: 'Duração média',        sub: 'Mínimo histórico',   highlight: true },
          { value: occurrence.pattern.teamAvg,          label: 'Média geral',          sub: 'Referência' },
        ]} />
        <InsightBanner text={`${occurrence.representative} apresenta frequência crescente de visitas com pouquíssimos sinais registrados. O padrão sugere presença confirmada sem visita completa de fato.`} />
      </OccurrenceSection>
    </OccurrenceShell>
  );
}

function BaixaAtividade({ occurrence }: { occurrence: any }) {
  return (
    <OccurrenceShell>
      <OccurrenceSection title="O que aconteceu — Calendário de atividade">
        <StatGrid stats={[
          { value: occurrence.visits,    label: 'Visitas esta semana',    highlight: true },
          { value: occurrence.avgVisits, label: 'Média histórica/semana' },
          { value: '-63%',               label: 'Vs. média pessoal',      highlight: true },
        ]} />
      </OccurrenceSection>

      <OccurrenceSection title="Contexto — Padrão ou caso isolado?">
        <StatGrid stats={[
          { value: occurrence.pattern.consecutiveWeeks, label: 'Semana consecutiva',     sub: 'Tendência preocupante', highlight: true },
          { value: occurrence.pattern.clientsNoContact, label: 'Clientes sem contato',   sub: 'Carteira em risco' },
          { value: occurrence.pattern.regionalReps,     label: 'Outros reps com queda',  sub: 'Não é regional' },
        ]} />
        <InsightBanner text="Queda progressiva nas últimas 3 semanas sem justificativa. Outros representantes da região estão com atividade normal." />
      </OccurrenceSection>
    </OccurrenceShell>
  );
}

function ClienteCriticoSemVisita({ occurrence }: { occurrence: any }) {
  return (
    <OccurrenceShell>
      <OccurrenceSection title="O que aconteceu — Histórico do cliente">
        <StatGrid stats={[
          { value: `${occurrence.daysWithoutVisit}d`, label: 'Sem interação',       highlight: true },
          { value: `${occurrence.historicalFreq}d`,   label: 'Frequência histórica' },
          { value: occurrence.aiScore,                label: 'Score IA' },
        ]} />
        <div className="mt-6">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Últimas interações</div>
          <SignalTable colLabel="Interação" rows={occurrence.interactions} />
        </div>
      </OccurrenceSection>

      <OccurrenceSection title="Contexto — Risco de inativação">
        <StatGrid stats={[
          { value: occurrence.pattern.aiScore,          label: 'Score de risco IA',      highlight: true },
          { value: `${occurrence.pattern.daysUntilInactive}d`, label: 'Dias até inativação' },
          { value: occurrence.pattern.avgTicket,        label: 'Ticket médio histórico' },
        ]} />
        <InsightBanner text={`${occurrence.client} está próximo do limiar de inativação. Histórico de compras indica alto valor para carteira — recomenda-se visita prioritária esta semana.`} />
      </OccurrenceSection>
    </OccurrenceShell>
  );
}

function CarteiraDescoberta({ occurrence }: { occurrence: any }) {
  type PriorityClient = { name: string; days: number; score: number; status: string };

  const clientCols: TableCol<PriorityClient>[] = [
    { header: 'Cliente',     render: r => <span className="font-medium text-foreground">{r.name}</span> },
    { header: 'Sem visita',  render: r => <span className="text-muted-foreground">{r.days}d</span> },
    { header: 'Score',       render: r => <span className="font-semibold text-foreground">{r.score}</span> },
    {
      header: 'Status',
      render: r => (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
          r.status === 'Crítico' ? 'bg-danger-light text-danger-foreground' : 'bg-secondary text-muted-foreground'
        }`}>
          {r.status}
        </span>
      ),
    },
  ];

  return (
    <OccurrenceShell>
      <OccurrenceSection title="O que aconteceu — Distribuição de cobertura">
        <CoverageBarList bars={[
          { label: 'Com contato recente (até 30 dias)', ...occurrence.coverage.recent },
          { label: 'Sem contato há 31–60 dias',          ...occurrence.coverage.medium, muted: true },
          { label: 'Sem contato há mais de 60 dias',     ...occurrence.coverage.old,    muted: true },
        ]} />
        <div className="mt-8">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Clientes prioritários sem cobertura</div>
          <DataTable<PriorityClient> cols={clientCols} rows={occurrence.priorityClients} />
        </div>
      </OccurrenceSection>

      <OccurrenceSection title="Contexto — Padrão ou caso isolado?">
        <StatGrid stats={[
          { value: `${occurrence.pattern.uncoveredPercent}%`, label: 'Carteira descoberta',  highlight: true },
          { value: occurrence.pattern.over60Days,             label: 'Clientes há +60 dias', highlight: true },
          { value: `${occurrence.pattern.teamAvg}%`,          label: 'Média do time' },
        ]} />
        <InsightBanner text={`${occurrence.representative} está com ${occurrence.pattern.uncoveredPercent}% da carteira sem cobertura — acima do limite aceitável. A média do time é ${occurrence.pattern.teamAvg}%.`} />
      </OccurrenceSection>
    </OccurrenceShell>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const OCCURRENCE_VIEWS: Record<string, React.ComponentType<{ occurrence: any }>> = {
  'Rota não executada':      RotaNaoExecutada,
  'Visita muito curta':      VisitaMuitoCurta,
  'Baixa atividade':         BaixaAtividade,
  'Cliente crítico sem visita': ClienteCriticoSemVisita,
  'Carteira descoberta':     CarteiraDescoberta,
};

export function OccurrenceDetail() {
  const { id } = useParams();
  const occurrence = getOccurrenceData(id || '1');
  const OccurrenceView = OCCURRENCE_VIEWS[occurrence.type];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/field-audit" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          Auditoria de Campo
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-semibold">Desvio Detectado</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <h1 className="text-2xl font-semibold text-foreground">{occurrence.type}</h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 bg-secondary border border-border rounded-xl px-5 py-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-muted-foreground text-xs">Representante:</span>
            <span className="font-semibold text-foreground">{occurrence.representative}</span>
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-muted-foreground text-xs">Data:</span>
            <span className="font-semibold text-foreground">{occurrence.date}</span>
          </div>
          {occurrence.planned !== undefined && (
            <>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground text-xs">Progresso:</span>
                <span className="font-bold text-primary">{occurrence.visited} de {occurrence.planned} visitados ({occurrence.executionRate}%)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content — driven by occurrence type */}
      {OccurrenceView ? <OccurrenceView occurrence={occurrence} /> : null}
    </div>
  );
}
