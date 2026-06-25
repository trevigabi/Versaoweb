import { PageHeader } from '../components/PageHeader';
import { Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

function GoalStatusBadge({ status }: { status: string }) {
  const config = {
    success: { bg: 'bg-success-light', text: 'text-success-foreground', label: 'No Prazo' },
    warning: { bg: 'bg-warning-light', text: 'text-warning-foreground', label: 'Atenção' },
    danger: { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Atrasado' },
  }[status] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Normal' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

export function Goals() {
  const [activeTab, setActiveTab] = useState<'region' | 'representative'>('region');

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Metas e Objetivos"
        description="Acompanhamento de metas regionais e individuais"
      />

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Meta Total Q2</div>
          <div className="text-3xl font-semibold text-foreground mb-2">R$ 8.5M</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">No ritmo</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Realizado</div>
          <div className="text-3xl font-semibold text-foreground mb-2">R$ 5.8M</div>
          <div className="text-sm text-muted-foreground">68% do total</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Projeção</div>
          <div className="text-3xl font-semibold text-foreground mb-2">R$ 8.9M</div>
          <div className="text-sm text-primary">+5% acima da meta</div>
        </div>
      </div>

      {/* Daily Evolution and Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Evolution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-6">Evolução diária</h3>
          <div className="h-48 rounded-lg flex items-end justify-between gap-0.5 px-2 bg-secondary/30">
            {[45, 52, 48, 61, 58, 67, 63, 71, 68, 75, 72, 78, 74, 82, 79, 85, 81, 88, 84, 91, 87, 94, 90, 97, 93, 89, 92, 95, 91, 96].map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary/70 hover:bg-primary rounded-t transition-all duration-200 cursor-pointer"
                style={{ height: `${value}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Scenarios */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-6">Cenários</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Otimista</div>
                <div className="text-base font-semibold text-foreground">R$ 1,15M</div>
              </div>
              <div className="text-xl font-semibold text-primary">92%</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Realista</div>
                <div className="text-base font-semibold text-foreground">R$ 1,08M</div>
              </div>
              <div className="text-xl font-semibold text-foreground">85%</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Pessimista</div>
                <div className="text-base font-semibold text-foreground">R$ 980k</div>
              </div>
              <div className="text-xl font-semibold text-muted-foreground">73%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Tabs */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="border-b border-border px-2">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('region')}
              className={`px-4 pb-3 pt-1 text-sm font-medium transition-colors relative ${
                activeTab === 'region'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Metas Regionais
            </button>
            <button
              onClick={() => setActiveTab('representative')}
              className={`px-4 pb-3 pt-1 text-sm font-medium transition-colors relative ${
                activeTab === 'representative'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Por Representante
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'region' && (
            <div className="space-y-6">
              {[
                { region: 'São Paulo', goal: 'R$ 2.8M', achieved: 'R$ 2.5M', progress: 89 },
                { region: 'Rio de Janeiro', goal: 'R$ 1.9M', achieved: 'R$ 1.3M', progress: 68 },
                { region: 'Minas Gerais', goal: 'R$ 1.6M', achieved: 'R$ 1.1M', progress: 69 },
                { region: 'Sul', goal: 'R$ 1.4M', achieved: 'R$ 0.9M', progress: 64 },
              ].map((item) => (
                <div key={item.region}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-foreground">{item.region}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {item.achieved} / {item.goal}
                      </span>
                      <span className="font-semibold text-foreground w-12 text-right">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'representative' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Representante
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Meta
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Realizado
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      %
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'Ana Souza', goal: 'R$ 120k', achieved: 'R$ 108k', progress: 90, status: 'success' },
                    { name: 'Fernanda Lima', goal: 'R$ 150k', achieved: 'R$ 162k', progress: 108, status: 'success' },
                    { name: 'Patrícia Rocha', goal: 'R$ 130k', achieved: 'R$ 98k', progress: 75, status: 'warning' },
                    { name: 'Carlos Mendes', goal: 'R$ 100k', achieved: 'R$ 61k', progress: 61, status: 'danger' },
                    { name: 'Roberto Dias', goal: 'R$ 90k', achieved: 'R$ 49k', progress: 54, status: 'danger' },
                  ].map((item) => (
                    <tr key={item.name} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium text-primary">{item.name}</span>
                      </td>
                      <td className="px-4 py-4 text-right text-sm text-foreground">{item.goal}</td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-foreground">{item.achieved}</td>
                      <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{item.progress}%</td>
                      <td className="px-4 py-4 text-center">
                        <GoalStatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
