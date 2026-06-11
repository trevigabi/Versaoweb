import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { RotateCcw, Save } from 'lucide-react';

type Weight = 'Alta' | 'Média' | 'Baixa';

const propensityVariables: { label: string; defaultWeight: Weight }[] = [
  { label: 'RFM — recência, frequência e valor', defaultWeight: 'Alta' },
  { label: 'Sazonalidade histórica', defaultWeight: 'Alta' },
  { label: 'Mix gap — linhas não compradas', defaultWeight: 'Média' },
  { label: 'Contexto financeiro — limite e inadimplência', defaultWeight: 'Alta' },
  { label: 'Benchmark regional — clientes similares', defaultWeight: 'Média' },
];

const inactivityDefaults = [
  { label: 'Janela de inatividade (dias)', value: 180 },
  { label: 'Alerta Atenção — dias antes', value: 30 },
  { label: 'Alerta Risco — dias antes', value: 15 },
  { label: 'Alerta Crítico — dias antes', value: 5 },
];

const featuresDefault = [
  { id: 'briefing', label: 'Briefing pré-visita', active: true },
  { id: 'nba', label: 'Next best action', active: true },
  { id: 'anomaly', label: 'Detecção de anomalias', active: true },
  { id: 'vision', label: 'Visão computacional', active: false },
];

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
        active ? 'bg-primary' : 'bg-secondary'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          active ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export function AIEngine() {
  const [weights, setWeights] = useState<Weight[]>(
    propensityVariables.map((v) => v.defaultWeight)
  );
  const [inactivity, setInactivity] = useState(inactivityDefaults.map((d) => d.value));
  const [features, setFeatures] = useState(featuresDefault.map((f) => f.active));

  const handleReset = () => {
    setWeights(propensityVariables.map((v) => v.defaultWeight));
    setInactivity(inactivityDefaults.map((d) => d.value));
    setFeatures(featuresDefault.map((f) => f.active));
  };

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Parâmetros de IA"
        description="Configure os modelos e regras que orientam as sugestões do sistema"
        actions={
          <>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
              Restaurar padrões
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
              <Save className="w-4 h-4" strokeWidth={1.5} />
              Salvar configurações
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left card — Propensity Score */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Propensity Score: pesos por variável</h3>
          </div>
          <div className="divide-y divide-border">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto] px-6 py-2 bg-secondary/50">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Variável</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-24 text-center">Peso</span>
            </div>
            {propensityVariables.map((variable, i) => (
              <div key={variable.label} className="grid grid-cols-[1fr_auto] items-center px-6 py-3 gap-4">
                <span className="text-sm text-foreground">{variable.label}</span>
                <select
                  value={weights[i]}
                  onChange={(e) => {
                    const next = [...weights];
                    next[i] = e.target.value as Weight;
                    setWeights(next);
                  }}
                  className="w-24 text-sm border border-border rounded-lg px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Right card — Inactivity rules + Active features */}
        <div className="space-y-6">
          {/* Inactivity rules */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Regras de inatividade</h3>
            </div>
            <div className="divide-y divide-border">
              {inactivityDefaults.map((rule, i) => (
                <div key={rule.label} className="flex items-center justify-between px-6 py-3 gap-4">
                  <span className="text-sm text-foreground">{rule.label}</span>
                  <input
                    type="number"
                    value={inactivity[i]}
                    onChange={(e) => {
                      const next = [...inactivity];
                      next[i] = Number(e.target.value);
                      setInactivity(next);
                    }}
                    className="w-20 text-sm text-right border border-border rounded-lg px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Active features */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Funcionalidades ativas</h3>
            </div>
            <div className="divide-y divide-border">
              {featuresDefault.map((feature, i) => (
                <div key={feature.id} className="flex items-center justify-between px-6 py-3">
                  <span className="text-sm text-foreground">{feature.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {features[i] ? 'Ativo' : 'Inativo'}
                    </span>
                    <Toggle
                      active={features[i]}
                      onChange={() => {
                        const next = [...features];
                        next[i] = !next[i];
                        setFeatures(next);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
