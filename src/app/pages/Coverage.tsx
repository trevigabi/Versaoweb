import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Download, Calendar } from 'lucide-react';

const trendData = [
  { month: 'Abr', pct: 72 },
  { month: 'Mai', pct: 81 },
  { month: 'Jun', pct: 87 },
];

const longestAbsent = [
  { client: 'Silva Calçados', rep: 'Ana Souza', days: 112 },
  { client: 'Moda Norte', rep: 'Carlos Mendes', days: 98 },
  { client: 'Calçados Bom Pé', rep: 'Ana Souza', days: 87 },
  { client: 'Casa do Sapato', rep: 'Roberto Dias', days: 76 },
];

const byRegion = [
  { region: 'São Paulo', clients: 456, pct: 92 },
  { region: 'Rio de Janeiro', clients: 342, pct: 88 },
  { region: 'Minas Gerais', clients: 389, pct: 85 },
  { region: 'Sul', clients: 267, pct: 76 },
  { region: 'Nordeste', clients: 393, pct: 81 },
];

const byRep = [
  { name: 'Ana Souza', territory: 'Serra Gaúcha', pct: 87 },
  { name: 'Fernanda Lima', territory: 'Blumenau', pct: 89 },
  { name: 'Patrícia Rocha', territory: 'Porto Alegre', pct: 81 },
  { name: 'Carlos Mendes', territory: 'Litoral Norte', pct: 65 },
  { name: 'Roberto Dias', territory: 'Curitiba', pct: 58 },
];

function barColor(pct: number) {
  if (pct >= 85) return 'bg-success';
  if (pct >= 75) return 'bg-primary';
  if (pct >= 65) return 'bg-warning';
  return 'bg-danger';
}

export function Coverage() {
  const [activeTab, setActiveTab] = useState<'region' | 'representative'>('region');

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Cobertura operacional"
        description="Saúde do território e análise de carteira"
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              Últimos 30 dias
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Exportar
            </button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-success/30 rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Cobertura total</div>
          <div className="text-4xl font-semibold text-foreground mb-2">87%</div>
          <div className="text-sm text-success">+5% vs mês anterior</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Clientes cobertos</div>
          <div className="text-4xl font-semibold text-foreground mb-2">1.623</div>
          <div className="text-sm text-muted-foreground">de 1.847 total</div>
        </div>
        <div className="bg-card border border-warning/30 rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Sem visita há 30d+</div>
          <div className="text-4xl font-semibold text-warning mb-2">224</div>
          <div className="text-sm text-warning">Requer atenção</div>
        </div>
      </div>

      {/* Trend chart + Longest absent */}
      <div className="grid grid-cols-2 gap-6">
        {/* Trend chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-foreground mb-6">Tendência de cobertura — 3 meses</h3>
          <div className="flex items-end justify-around gap-6 h-32">
            {trendData.map((d) => (
              <div key={d.month} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-xs font-medium text-success">{d.pct}%</span>
                <div className="w-full rounded-t bg-success" style={{ height: `${(d.pct / 100) * 112}px` }} />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Longest absent */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground">Clientes há mais tempo sem visita</h3>
          </div>
          <div className="divide-y divide-border">
            {longestAbsent.map((item) => (
              <div key={item.client} className="flex items-center justify-between px-6 py-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{item.client}</div>
                  <div className="text-xs text-muted-foreground">{item.rep}</div>
                </div>
                <span className="text-sm font-semibold text-warning">{item.days} dias</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs card */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border flex">
          {(['region', 'representative'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'region' ? 'Por região' : 'Por representante'}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4">
          {activeTab === 'region' &&
            byRegion.map((item) => (
              <div key={item.region} className="flex items-center gap-4">
                <div className="w-36 text-sm font-medium text-foreground flex-shrink-0">{item.region}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{item.clients} clientes</span>
                    <span className="font-medium text-foreground">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${barColor(item.pct)}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}

          {activeTab === 'representative' &&
            byRep.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-36 flex-shrink-0">
                  <div className="text-sm font-medium text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.territory}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-end text-sm mb-1.5">
                    <span className="font-medium text-foreground">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${barColor(item.pct)}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
