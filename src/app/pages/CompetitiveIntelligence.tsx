import { useState } from 'react';
import { Filter, Download, ChevronDown, ChevronUp, X } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const competitors = [
  { name: 'Concorrente A', mentions: 142, change: '+12%', trend: 'up', regions: ['Sul', 'São Paulo'], tactic: 'Preço agressivo em calçados infantis' },
  { name: 'Concorrente B', mentions: 89, change: '-5%', trend: 'down', regions: ['Nordeste'], tactic: 'Promoção de liquidação de estoque' },
  { name: 'Concorrente C', mentions: 67, change: '+8%', trend: 'up', regions: ['Sudeste', 'Centro-Oeste'], tactic: 'Lançamento de linha casual' },
  { name: 'Concorrente D', mentions: 45, change: '0%', trend: 'stable', regions: ['Rio de Janeiro'], tactic: 'Sem mudanças identificadas' },
];

const objections = [
  { reason: 'Preço mais alto', frequency: 34, region: 'Sul', detail: 'Concentrado em produtos premium com ticket > R$ 200. Conversão ainda alta (92%) — valor percebido é positivo.' },
  { reason: 'Prazo de entrega', frequency: 28, region: 'Nordeste', detail: 'Principal queixa em clientes novos. Negociações com transportadoras em andamento.' },
  { reason: 'Condições de pagamento', frequency: 22, region: 'Sudeste', detail: 'Solicitações de prazo maior (60/90 dias). Avaliar política para clientes estratégicos.' },
  { reason: 'Disponibilidade de estoque', frequency: 18, region: 'Centro-Oeste', detail: 'Itens da linha Molekinha com recorrência de ruptura em junho.' },
];

const opportunities = [
  {
    title: 'Cross-sell infantil',
    description: '127 clientes com perfil compatível',
    potential: 'R$ 340K',
    clients: ['Farmácia Central', 'Rede Saúde Sul', 'Drogaria Moderna'],
    ticket: 'R$ 2.677 médio',
    action: 'Apresentar linha Moleca SS26 junto com a próxima recompra de adultos.',
  },
  {
    title: 'Reconquista de inativos',
    description: '43 clientes sem compra há 90 dias',
    potential: 'R$ 180K',
    clients: ['Saúde & Vida', 'Farmácias Unidas', 'Drogaria Popular'],
    ticket: 'R$ 4.186 médio',
    action: 'Visita prioritária com oferta de reativação e condição especial de retorno.',
  },
  {
    title: 'Upsell premium',
    description: '85 clientes Standard com potencial',
    potential: 'R$ 520K',
    clients: ['Drogaria Moderna', 'Rede Saúde Sul', 'Saúde & Vida'],
    ticket: 'R$ 6.118 médio',
    action: 'Propor migração para linha Beira Rio Conforto com demonstração de produto.',
  },
];

const kpis = [
  {
    id: 'potential',
    label: 'Potencial identificado',
    value: 'R$ 1,04M',
    sub: '+23% vs mês anterior',
    detail: [
      { label: 'Cross-sell infantil', value: 'R$ 340K' },
      { label: 'Reconquista de inativos', value: 'R$ 180K' },
      { label: 'Upsell premium', value: 'R$ 520K' },
    ],
  },
  {
    id: 'eligible',
    label: 'Clientes elegíveis',
    value: '255',
    sub: 'em 3 oportunidades',
    detail: [
      { label: 'Cross-sell infantil', value: '127 clientes' },
      { label: 'Reconquista de inativos', value: '43 clientes' },
      { label: 'Upsell premium', value: '85 clientes' },
    ],
  },
  {
    id: 'winrate',
    label: 'Taxa de vitória',
    value: '87%',
    sub: '+2pp vs mês anterior',
    detail: [
      { label: 'Sul', value: '91%' },
      { label: 'Sudeste', value: '88%' },
      { label: 'Nordeste', value: '82%' },
      { label: 'Centro-Oeste', value: '85%' },
    ],
  },
];

export function CompetitiveIntelligence() {
  const [activeKpi, setActiveKpi] = useState<string | null>(null);
  const [activeCompetitor, setActiveCompetitor] = useState<string | null>(null);
  const [activeObjection, setActiveObjection] = useState<string | null>(null);
  const [activeOpportunity, setActiveOpportunity] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Insights comerciais"
        description="Atualizado em 09 de junho de 2026"
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
              <Filter className="w-4 h-4" strokeWidth={1.5} />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Exportar
            </button>
          </>
        }
      />

      {/* Featured insight */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Insight principal da semana
        </div>
        <div className="text-lg font-semibold text-foreground mb-2">
          Categoria infantil cresce 18% acima da média nacional
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Produtos da linha infantil apresentam crescimento consistente enquanto demais categorias crescem 7%. Janela de captura identificada para os próximos 30 dias.
        </p>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}>Oportunidade</span>
          <span className="px-2.5 py-1 rounded-full bg-card text-muted-foreground text-xs font-medium border border-border">Nacional</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const open = activeKpi === kpi.id;
          return (
            <div key={kpi.id}>
              <button
                onClick={() => setActiveKpi(open ? null : kpi.id)}
                className={`w-full text-left bg-card border rounded-lg p-5 hover:bg-secondary/30 transition-colors ${open ? 'border-primary' : 'border-border'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  {open
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />}
                </div>
                <div className="text-3xl font-semibold text-foreground">{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{kpi.sub}</div>
              </button>
              {open && (
                <div className="mt-2 bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Breakdown</span>
                    <button
                      onClick={() => setActiveKpi(null)}
                      className="p-1 hover:bg-secondary rounded transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {kpi.detail.map((d) => (
                      <div key={d.label} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{d.label}</span>
                        <span className="font-medium text-foreground">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Competitors + Objections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitors */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Concorrência no campo</h3>
          </div>
          <div className="divide-y divide-border">
            {competitors.map((c) => {
              const open = activeCompetitor === c.name;
              return (
                <div key={c.name}>
                  <button
                    onClick={() => setActiveCompetitor(open ? null : c.name)}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground mb-1.5">{c.name}</div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(c.mentions / 142) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{c.mentions}</span>
                      <span className="text-xs font-medium text-foreground">
                        {c.change}
                      </span>
                    </div>
                  </button>
                  {open && (
                    <div className="px-6 pb-3 bg-secondary/20">
                      <div className="bg-secondary rounded-lg px-4 py-3 space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Regiões: <span className="text-foreground">{c.regions.join(', ')}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tática identificada: <span className="text-foreground">{c.tactic}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Objections */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Principais objeções</h3>
          </div>
          <div className="divide-y divide-border">
            {objections.map((o) => {
              const open = activeObjection === o.reason;
              return (
                <div key={o.reason}>
                  <button
                    onClick={() => setActiveObjection(open ? null : o.reason)}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground mb-1.5">{o.reason}</div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(o.frequency / 34) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{o.frequency} casos</span>
                      <span className="text-xs text-muted-foreground">{o.region}</span>
                    </div>
                  </button>
                  {open && (
                    <div className="px-6 pb-3 bg-secondary/20">
                      <div className="bg-secondary rounded-lg px-4 py-3">
                        <p className="text-xs text-foreground">{o.detail}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Oportunidades comerciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((opp) => {
            const open = activeOpportunity === opp.title;
            return (
              <div key={opp.title}>
                <button
                  onClick={() => setActiveOpportunity(open ? null : opp.title)}
                  className={`w-full text-left bg-card border rounded-lg p-5 hover:bg-secondary/30 transition-colors ${open ? 'border-primary' : 'border-border'}`}
                >
                  <div className="font-medium text-foreground mb-1">{opp.title}</div>
                  <div className="text-sm text-muted-foreground mb-3">{opp.description}</div>
                  <div className="text-lg font-semibold text-foreground">{opp.potential}</div>
                </button>
                {open && (
                  <div className="mt-2 bg-card border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Detalhes</span>
                      <button
                        onClick={() => setActiveOpportunity(null)}
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs text-muted-foreground">Clientes elegíveis</div>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.clients.map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded bg-secondary text-xs text-foreground">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ticket esperado</span>
                      <span className="font-medium text-foreground">{opp.ticket}</span>
                    </div>
                    <div className="bg-secondary rounded-lg px-3 py-2">
                      <p className="text-xs text-foreground">{opp.action}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
