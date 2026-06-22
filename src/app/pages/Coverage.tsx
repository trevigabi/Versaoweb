import { PageHeader } from '../components/PageHeader';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function Coverage() {
  const [activeTab, setActiveTab] = useState<'region' | 'representative'>('region');

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Cobertura Operacional"
        description="Análise de cobertura de carteira e territórios"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-success/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-10 h-10 text-success" strokeWidth={1.5} />
            <div className="text-sm text-muted-foreground">Cobertura Total</div>
          </div>
          <div className="text-4xl font-semibold text-foreground mb-1">87%</div>
          <div className="text-sm text-success">+5% vs mês anterior</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-10 h-10 text-primary" strokeWidth={1.5} />
            <div className="text-sm text-muted-foreground">Clientes Cobertos</div>
          </div>
          <div className="text-4xl font-semibold text-foreground mb-1">1.623</div>
          <div className="text-sm text-muted-foreground">de 1.847 total</div>
        </div>
        <div className="bg-card border border-warning/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-10 h-10 text-warning" strokeWidth={1.5} />
            <div className="text-sm text-muted-foreground">Sem Visita 30d+</div>
          </div>
          <div className="text-4xl font-semibold text-foreground mb-1">224</div>
          <div className="text-sm text-warning">Requer atenção</div>
        </div>
      </div>

      {/* Coverage Tabs */}
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
              Por Região
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
            <div className="space-y-4">
              {[
                { region: 'São Paulo', coverage: 92, clients: 456 },
                { region: 'Rio de Janeiro', coverage: 88, clients: 342 },
                { region: 'Minas Gerais', coverage: 85, clients: 389 },
                { region: 'Sul', coverage: 76, clients: 267 },
                { region: 'Nordeste', coverage: 81, clients: 393 },
              ].map((item) => (
                <div key={item.region} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-foreground">{item.region}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{item.clients} clientes</span>
                      <span className="font-medium text-foreground">{item.coverage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full ${
                          item.coverage >= 90
                            ? 'bg-success'
                            : item.coverage >= 80
                            ? 'bg-primary'
                            : 'bg-warning'
                        }`}
                        style={{ width: `${item.coverage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'representative' && (
            <div className="space-y-4">
              {[
                { name: 'Ana Souza', coverage: 78 },
                { name: 'Carlos Mendes', coverage: 65 },
                { name: 'Fernanda Lima', coverage: 89 },
                { name: 'Patrícia Rocha', coverage: 81 },
                { name: 'João Oliveira', coverage: 72 },
                { name: 'Roberto Dias', coverage: 58 },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-40 text-sm font-medium text-foreground">{item.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-end text-sm mb-1.5">
                      <span className="font-medium text-foreground">{item.coverage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full ${
                          item.coverage >= 80
                            ? 'bg-success'
                            : item.coverage >= 70
                            ? 'bg-primary'
                            : 'bg-warning'
                        }`}
                        style={{ width: `${item.coverage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
