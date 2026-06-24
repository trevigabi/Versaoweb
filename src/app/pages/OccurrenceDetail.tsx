import { Link, useParams } from 'react-router';
import { ArrowLeft, X, Flag, FileText, MessageSquare, Check, AlertCircle } from 'lucide-react';

// Mock data - in real app, this would come from API based on ID
const getOccurrenceData = (id: string) => {
  const occurrences: { [key: string]: any } = {
    '1': {
      type: 'Rota não executada',
      representative: 'João Oliveira',
      client: '8 clientes',
      date: '27/05/2026',
      severity: 'high',
      planned: 8,
      visited: 2,
      notVisited: 6,
      executionRate: 25,
      justification: 'Nenhuma informada',
      pattern: {
        incompleteRoutes: 3,
        executionRate: 71,
        regionalReps: 2,
      },
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
        { text: 'Ficha do cliente aberta', time: '14h20', detail: 'único sinal registrado', status: 'check' },
        { text: 'Nenhuma anotação', detail: 'Sem texto, áudio ou foto', status: 'x' },
        { text: 'Nenhum follow-up criado', detail: 'Sem próxima ação definida', status: 'x' },
        { text: 'Nenhum resultado classificado', detail: 'Visita sem encerramento', status: 'x' },
      ],
      pattern: {
        shortVisits: 4,
        avgShortDuration: '6 min',
        teamAvg: '38 min',
      },
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
      pattern: {
        consecutiveWeeks: '3ª',
        clientsNoContact: 8,
        regionalReps: 0,
      },
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
        { text: 'Visita — resultado positivo — há 112 dias', detail: 'Pedido R$ 5.200 — linha Moleca', status: 'check' },
        { text: 'Visita — resultado positivo — há 150 dias', detail: 'Pedido R$ 3.800 — Conforto', status: 'check' },
        { text: 'Ligação — sem retorno — há 180 dias', detail: 'Tentativa de contato sem sucesso', status: 'x' },
      ],
      pattern: {
        aiScore: 94,
        daysUntilInactive: 68,
        avgTicket: 'R$ 4.500',
      },
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
        old: { clients: 8, percent: 12 },
      },
      priorityClients: [
        { name: 'Calçados Bom Pé', days: 78, score: 88, status: 'Crítico' },
        { name: 'Moda Norte', days: 62, score: 75, status: 'Risco' },
        { name: 'Casa do Sapato', days: 91, score: 92, status: 'Crítico' },
      ],
      pattern: {
        uncoveredPercent: 31,
        over60Days: 8,
        teamAvg: 89,
      },
    },
  };
  return occurrences[id] || occurrences['1'];
};

export function OccurrenceDetail() {
  const { id } = useParams();
  const occurrence = getOccurrenceData(id || '1');

  const severityConfig = {
    high: { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Alta' },
    medium: { bg: 'bg-warning-light', text: 'text-warning-foreground', label: 'Média' },
  }[occurrence.severity];

  return (
    <div className="p-8 space-y-10">
      <Link
        to="/field-audit"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        Voltar para Auditoria
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{occurrence.type}</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
            <X className="w-4 h-4" strokeWidth={1.5} />
            Dispensar
          </button>
          <button className="px-5 py-3 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
            <Flag className="w-4 h-4" strokeWidth={1.5} />
            Sinalizar
          </button>
          <button className="px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
            Contactar
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Context Sections */}
        <div className="lg:col-span-2 space-y-8">

          {/* Rota não executada */}
          {occurrence.type === 'Rota não executada' && (
            <>
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  O que aconteceu — Rota planejada vs. executada
                </h3>
                <div className="h-72 bg-gradient-to-br from-success-light/30 to-secondary rounded-xl flex items-center justify-center relative overflow-hidden mb-8">
                  {/* Map visualization */}
                  <div className="absolute inset-0 p-12">
                    {/* Route pins */}
                    <div className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-success border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-lg">1</div>
                    <div className="absolute top-1/3 left-2/5 w-10 h-10 rounded-full bg-success border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-lg">2</div>
                    <div className="absolute top-2/5 left-1/2 w-10 h-10 rounded-full bg-danger border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-lg">3</div>
                    <div className="absolute bottom-1/3 right-1/3 w-10 h-10 rounded-full bg-danger border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-lg">4</div>
                    <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full bg-danger border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-lg">5</div>
                    {/* Route lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path d="M 80 60 L 130 80" stroke="#10B981" strokeWidth="3" fill="none" />
                      <path d="M 130 80 L 180 100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-border" style={{ borderTop: '2px dashed #94A3B8' }}></div>
                    <span className="text-muted-foreground">Planejada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-success"></div>
                    <span className="text-muted-foreground">Executada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">Visitado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-danger"></div>
                    <span className="text-muted-foreground">Não visitado</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-secondary rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-foreground mb-2">{occurrence.planned} clientes</div>
                    <div className="text-sm text-muted-foreground">Planejados</div>
                  </div>
                  <div className="bg-danger-light rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-danger mb-2">{occurrence.visited} visitados</div>
                    <div className="text-sm text-muted-foreground">{occurrence.notVisited} não visitados</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  Contexto — Padrão ou caso isolado?
                </h3>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-warning mb-2">{occurrence.pattern.incompleteRoutes}</div>
                    <div className="text-sm text-muted-foreground mb-1">Rotas incompletas últimos 60 dias</div>
                    <div className="text-xs text-warning font-medium">Frequência moderada</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-warning mb-2">{occurrence.pattern.executionRate}%</div>
                    <div className="text-sm text-muted-foreground mb-1">Taxa de execução mês atual</div>
                    <div className="text-xs text-warning font-medium">Abaixo da média da equipe</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-foreground mb-2">{occurrence.pattern.regionalReps}</div>
                    <div className="text-sm text-muted-foreground mb-1">Outros reps mesma situação</div>
                    <div className="text-xs text-foreground font-medium">Não é padrão regional</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Atividade nos últimos 30 dias
                </div>
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-lg ${
                        i % 4 === 0 ? 'bg-success-light' : i % 3 === 0 ? 'bg-warning-light' : 'bg-secondary'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-success-light"></div>
                    <span className="text-muted-foreground">Rota executada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-warning-light"></div>
                    <span className="text-muted-foreground">Incompleta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-secondary"></div>
                    <span className="text-muted-foreground">Sem rota</span>
                  </div>
                </div>
                <div className="p-5 bg-warning-light/40 border border-warning/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-warning-foreground leading-relaxed">
                    João está abaixo da média de execução desde abril. Outros reps da mesma região não apresentam o mesmo padrão — recomendado conversar antes de qualquer ação formal.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Visita muito curta */}
          {occurrence.type === 'Visita muito curta' && (
            <>
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  O que aconteceu — Sinais detectados na visita
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-danger-light rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-danger mb-2">{occurrence.duration}</div>
                    <div className="text-sm text-muted-foreground">Duração detectada</div>
                  </div>
                  <div className="bg-secondary rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-foreground mb-2">{occurrence.avgDuration}</div>
                    <div className="text-sm text-muted-foreground">Média histórica neste cliente</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-5 uppercase tracking-wider">
                  Sinais detectados durante a visita
                </div>
                <div className="space-y-5">
                  {occurrence.signals?.map((signal: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                      <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                        signal.status === 'check' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                      }`}>
                        {signal.status === 'check' ? <Check className="w-4 h-4" strokeWidth={2} /> : <X className="w-4 h-4" strokeWidth={2} />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground mb-1">{signal.text}</div>
                        <div className="text-xs text-muted-foreground">{signal.time ? `${signal.time} — ${signal.detail}` : signal.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  Contexto — Padrão ou caso isolado?
                </h3>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.shortVisits}</div>
                    <div className="text-sm text-muted-foreground mb-2">Visitas muito curtas</div>
                    <div className="text-xs text-danger font-medium">Frequência alta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.avgShortDuration}</div>
                    <div className="text-sm text-muted-foreground mb-2">Duração média</div>
                    <div className="text-xs text-danger font-medium">Mínimo histórico</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-foreground mb-2">{occurrence.pattern.teamAvg}</div>
                    <div className="text-sm text-muted-foreground mb-2">Média geral</div>
                    <div className="text-xs text-foreground font-medium">Referência normal</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Atividade nos últimos 30 dias
                </div>
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-lg ${
                        i % 3 === 0 ? 'bg-danger-light' : i % 4 === 0 ? 'bg-warning-light' : 'bg-success-light'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-success-light"></div>
                    <span className="text-muted-foreground">Visita normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-danger-light"></div>
                    <span className="text-muted-foreground">Visita curta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-secondary"></div>
                    <span className="text-muted-foreground">Sem registro</span>
                  </div>
                </div>
                <div className="p-5 bg-danger-light/40 border border-danger/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-danger-foreground leading-relaxed">
                    Maria apresenta frequência crescente de visitas com pouquíssimos sinais registrados. O padrão sugere que a presença está sendo confirmada sem que a visita esteja de fato acontecendo de forma completa.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Baixa atividade */}
          {occurrence.type === 'Baixa atividade' && (
            <>
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  O que aconteceu — Calendário de atividade
                </h3>
                <div className="grid grid-cols-7 gap-3 mb-8">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-muted-foreground mb-3 font-medium">{day}</div>
                      <div className={`aspect-square rounded-xl ${
                        i % 3 === 0 ? 'bg-danger-light' : i % 2 === 0 ? 'bg-warning-light' : 'bg-success-light'
                      }`}></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-success-light"></div>
                    <span>Atividade normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-warning-light"></div>
                    <span>Baixa atividade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-danger-light"></div>
                    <span>Sem registro</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.visits}</div>
                    <div className="text-sm text-muted-foreground">Visitas esta semana</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-foreground mb-2">{occurrence.avgVisits}</div>
                    <div className="text-sm text-muted-foreground">Média histórica/semana</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">-63%</div>
                    <div className="text-sm text-muted-foreground">Vs. média pessoal</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  Contexto — Padrão ou caso isolado?
                </h3>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.consecutiveWeeks}</div>
                    <div className="text-sm text-muted-foreground mb-2">Semana consecutiva</div>
                    <div className="text-xs text-danger font-medium">Tendência preocupante</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-warning mb-2">{occurrence.pattern.clientsNoContact}</div>
                    <div className="text-sm text-muted-foreground mb-2">Clientes sem contato</div>
                    <div className="text-xs text-warning font-medium">Carteira em risco</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-foreground mb-2">{occurrence.pattern.regionalReps}</div>
                    <div className="text-sm text-muted-foreground mb-2">Outros reps com queda</div>
                    <div className="text-xs text-foreground font-medium">Não é regional</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Atividade nos últimos 30 dias
                </div>
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-lg ${
                        i < 10 ? 'bg-success-light' : i < 20 ? 'bg-warning-light' : 'bg-danger-light'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-success-light"></div>
                    <span>Semana normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-warning-light"></div>
                    <span>Semana fraca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-secondary"></div>
                    <span>Fim de semana</span>
                  </div>
                </div>
                <div className="p-5 bg-warning-light/40 border border-warning/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-warning-foreground leading-relaxed">
                    Queda progressiva nas últimas 3 semanas sem justificativa registrada. Outros representantes da região estão com atividade normal. Recomendado verificar se há alguma situação pessoal antes de qualquer ação operacional.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Cliente crítico sem visita */}
          {occurrence.type === 'Cliente crítico sem visita' && (
            <>
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  O que aconteceu — Histórico do cliente
                </h3>
                <div className="grid grid-cols-3 gap-6 mb-10">
                  <div className="bg-danger-light rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-danger mb-2">{occurrence.daysWithoutVisit} dias</div>
                    <div className="text-sm text-muted-foreground">Sem interação detectada</div>
                  </div>
                  <div className="bg-secondary rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-foreground mb-2">{occurrence.historicalFreq} dias</div>
                    <div className="text-sm text-muted-foreground">Frequência histórica</div>
                  </div>
                  <div className="bg-danger-light rounded-xl p-6 text-center">
                    <div className="text-2xl font-semibold text-danger mb-2">{occurrence.aiScore}</div>
                    <div className="text-sm text-muted-foreground">Score IA — alta propensão</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-5 uppercase tracking-wider">
                  Últimas interações registradas
                </div>
                <div className="space-y-5">
                  {occurrence.interactions?.map((interaction: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                      <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                        interaction.status === 'check' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                      }`}>
                        {interaction.status === 'check' ? <Check className="w-4 h-4" strokeWidth={2} /> : <X className="w-4 h-4" strokeWidth={2} />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground mb-1">{interaction.text}</div>
                        <div className="text-xs text-muted-foreground">{interaction.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  Contexto — Padrão ou caso isolado?
                </h3>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.aiScore}</div>
                    <div className="text-sm text-muted-foreground mb-2">Score IA de propensão</div>
                    <div className="text-xs text-danger font-medium">Alta probabilidade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.daysUntilInactive} dias</div>
                    <div className="text-sm text-muted-foreground mb-2">Até inativação por janela</div>
                    <div className="text-xs text-danger font-medium">Urgente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-success mb-2">{occurrence.pattern.avgTicket}</div>
                    <div className="text-sm text-muted-foreground mb-2">Ticket médio histórico</div>
                    <div className="text-xs text-success font-medium">Cliente valioso</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Atividade nos últimos 30 dias
                </div>
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="h-8 rounded-lg bg-danger-light"></div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-success-light"></div>
                    <span>Interação registrada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-danger-light"></div>
                    <span>Sem interação</span>
                  </div>
                </div>
                <div className="p-5 bg-ai-accent-light border border-ai-accent/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-ai-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-foreground leading-relaxed">
                    Cliente com score 94 e histórico sólido de compras. A ausência prolongada combinada com a alta propensão indica oportunidade real de recompra. Prioridade alta para a próxima rota do representante.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Carteira descoberta */}
          {occurrence.type === 'Carteira descoberta' && (
            <>
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  O que aconteceu — Distribuição de cobertura
                </h3>
                <div className="space-y-6 mb-10">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-muted-foreground">Com contato recente (até 30 dias)</span>
                      <span className="font-semibold text-foreground">{occurrence.coverage.recent.clients} clientes — {occurrence.coverage.recent.percent}%</span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: `${occurrence.coverage.recent.percent}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-muted-foreground">Sem contato há 31-60 dias</span>
                      <span className="font-semibold text-foreground">{occurrence.coverage.medium.clients} clientes — {occurrence.coverage.medium.percent}%</span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: `${occurrence.coverage.medium.percent}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-muted-foreground">Sem contato há mais de 60 dias</span>
                      <span className="font-semibold text-foreground">{occurrence.coverage.old.clients} clientes — {occurrence.coverage.old.percent}%</span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-danger rounded-full" style={{ width: `${occurrence.coverage.old.percent}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-5 uppercase tracking-wider">
                  Clientes prioritários sem cobertura
                </div>
                <div className="space-y-3">
                  {occurrence.priorityClients?.map((client: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{client.name}</div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-muted-foreground">{client.days} dias sem visita</span>
                        <span className="text-foreground font-semibold">Score {client.score}</span>
                        <span className={`px-3 py-1.5 rounded-lg font-medium ${
                          client.status === 'Crítico' ? 'bg-danger-light text-danger-foreground' : 'bg-warning-light text-warning-foreground'
                        }`}>{client.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
                  Contexto — Padrão ou caso isolado?
                </h3>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.uncoveredPercent}%</div>
                    <div className="text-sm text-muted-foreground mb-2">Carteira sem cobertura últimos 45 dias</div>
                    <div className="text-xs text-danger font-medium">Abaixo da meta (15%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-danger mb-2">{occurrence.pattern.over60Days}</div>
                    <div className="text-sm text-muted-foreground mb-2">Clientes há mais de 60 dias sem visita</div>
                    <div className="text-xs text-danger font-medium">Risco alto</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-semibold text-success mb-2">{occurrence.pattern.teamAvg}%</div>
                    <div className="text-sm text-muted-foreground mb-2">Média da equipe no mesmo período</div>
                    <div className="text-xs text-success font-medium">Referência normal</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Atividade nos últimos 30 dias
                </div>
                <div className="grid grid-cols-10 gap-2 mb-4">
                  {[...Array(30)].map((_, i) => (
                    null
                  ))}
                </div>
                
                <div className="p-5 bg-warning-light/40 border border-warning/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-warning-foreground leading-relaxed">
                    Carlos está concentrando visitas nos mesmos clientes e deixando uma parte relevante da carteira descoberta. 3 clientes de alto score já estão há mais de 60 dias sem nenhum contato detectado.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">Resumo</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Representante</span>
                <span className="font-medium text-foreground">{occurrence.representative}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium text-foreground">{occurrence.date}</span>
              </div>
              {occurrence.planned !== undefined && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Planejados</span>
                    <span className="font-medium text-foreground">{occurrence.planned} clientes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Visitados</span>
                    <span className="font-medium text-danger">{occurrence.visited} ({occurrence.executionRate}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Não visitados</span>
                    <span className="font-medium text-foreground">{occurrence.notVisited}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Justificativa</span>
                    <span className="font-medium text-foreground">{occurrence.justification}</span>
                  </div>
                </>
              )}
              {occurrence.client && occurrence.client !== '---' && !occurrence.planned && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cliente</span>
                  <span className="font-medium text-foreground">{occurrence.client}</span>
                </div>
              )}
              {occurrence.territory && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Território</span>
                  <span className="font-medium text-foreground">{occurrence.territory}</span>
                </div>
              )}
              {occurrence.period && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Período</span>
                  <span className="font-medium text-foreground">{occurrence.period}</span>
                </div>
              )}
              {occurrence.daysWithoutVisit && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sem visita há</span>
                  <span className="font-medium text-danger">{occurrence.daysWithoutVisit} dias</span>
                </div>
              )}
              {occurrence.totalClients && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total da carteira</span>
                    <span className="font-medium text-foreground">{occurrence.totalClients} clientes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sem cobertura</span>
                    <span className="font-medium text-danger">{occurrence.uncovered} clientes (31%)</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">Ações Disponíveis</h3>
            <div className="space-y-4">
              {occurrence.type === 'Rota não executada' && (
                <>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Dispensar ocorrência</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Falso positivo ou contexto já conhecido.</div>
                    </div>
                  </button>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Sinalizar para acompanhamento</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Fica na fila do gestor para revisão futura.</div>
                    </div>
                  </button>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Reagendar clientes críticos</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Incluir clientes de alto risco na próxima rota.</div>
                    </div>
                  </button>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Contactar representante</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Conversa direta — sem expor o contexto.</div>
                    </div>
                  </button>
                </>
              )}
              {occurrence.type === 'Cliente crítico sem visita' && (
                <>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Incluir na próxima rota</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Prioridade alta — cliente de alto valor.</div>
                    </div>
                  </button>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Sinalizar como urgente</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Garantir visita antes da janela de inativação.</div>
                    </div>
                  </button>
                </>
              )}
              {occurrence.type === 'Visita muito curta' && (
                <>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Dispensar ocorrência</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Contexto externo pode justificar a brevidade.</div>
                    </div>
                  </button>
                  <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Flag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">Sinalizar para acompanhamento</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Monitorar se padrão se repete neste cliente.</div>
                    </div>
                  </button>
                </>
              )}
              {occurrence.type === 'Carteira descoberta' && (
                <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-1">Sugerir rota de recuperação</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">Priorizar clientes descobertos na próxima semana.</div>
                  </div>
                </button>
              )}
              <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground mb-1">Contactar representante</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {occurrence.type === 'Visita muito curta' ? 'Verificar o que aconteceu sem expor auditoria.' :
                     occurrence.type === 'Baixa atividade' ? 'Verificar contexto pessoal antes de agir.' :
                     'Alertar sobre a oportunidade identificada.'}
                  </div>
                </div>
              </button>
              <button className="w-full flex items-start gap-4 p-4 border border-border rounded-xl text-left hover:bg-secondary transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground mb-1">
                    {occurrence.type === 'Cliente crítico sem visita' ? 'Ver ficha completa' : 'Ver histórico completo'}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {occurrence.type === 'Cliente crítico sem visita' ? 'Histórico detalhado do cliente.' :
                     occurrence.type === 'Visita muito curta' ? 'Acessar todas as visitas a este cliente.' :
                     occurrence.type === 'Carteira descoberta' ? 'Visualizar distribuição geográfica.' :
                     'Detalhes completos do histórico.'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">Nota Interna</h3>
            <textarea
              placeholder="Adicione contexto que o sistema não capturou..."
              className="w-full px-4 py-4 bg-secondary border-0 rounded-xl text-sm resize-none leading-relaxed"
              rows={5}
            />
            <div className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Visível apenas para gestores
            </div>
            <button className="mt-5 w-full px-4 py-3 bg-secondary rounded-xl text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
