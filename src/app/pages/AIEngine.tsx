import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Save, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

type Weight = 'Alta' | 'Média' | 'Baixa';

const propensityVariables: { label: string; description: string; defaultWeight: Weight }[] = [
  { label: 'RFM', description: 'recência, frequência e valor', defaultWeight: 'Alta' },
  { label: 'Sazonalidade histórica', description: 'padrões de compra por época do ano', defaultWeight: 'Alta' },
  { label: 'Mix gap', description: 'linhas não compradas', defaultWeight: 'Média' },
  { label: 'Contexto financeiro', description: 'inadimplência', defaultWeight: 'Alta' },
  { label: 'Benchmark regional', description: 'clientes similares', defaultWeight: 'Média' },
];

const inactivityConfig: { label: string; dotColor: string | null; defaultValue: number }[] = [
  { label: 'Janela de inatividade', dotColor: null, defaultValue: 180 },
  { label: 'Alerta Atenção', dotColor: '#EF9F27', defaultValue: 30 },
  { label: 'Alerta Risco', dotColor: '#E07A2F', defaultValue: 15 },
  { label: 'Alerta Crítico', dotColor: '#A32D2D', defaultValue: 5 },
];

const featuresConfig = [
  { id: 'briefing', label: 'Briefing pré-visita', description: 'Resumo do cliente antes de cada visita', defaultActive: true },
  { id: 'nba', label: 'Next best action', description: 'Sugestão da próxima ação ideal por cliente', defaultActive: true },
  { id: 'anomaly', label: 'Detecção de anomalias', description: 'Identifica padrões incomuns no comportamento', defaultActive: true },
  { id: 'vision', label: 'Visão computacional', description: 'Análise de imagens em campo', defaultActive: false },
];

const weightStyles: Record<Weight, React.CSSProperties> = {
  Alta:  { backgroundColor: '#E6F1FB', color: '#185FA5' },
  Média: { backgroundColor: '#FAEEDA', color: '#854F0B' },
  Baixa: { backgroundColor: '#EAF3DE', color: '#3B6D11' },
};

function WeightSelector({ value, onChange }: { value: Weight; onChange: (w: Weight) => void }) {
  return (
    <div className="flex rounded-lg border border-border overflow-hidden flex-shrink-0">
      {(['Baixa', 'Média', 'Alta'] as Weight[]).map((option, idx) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${idx > 0 ? 'border-l border-border' : ''} ${value !== option ? 'bg-background text-muted-foreground hover:bg-secondary' : ''}`}
          style={value === option ? weightStyles[option] : undefined}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
        active ? 'bg-primary' : 'bg-muted'
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
  const [inactivity, setInactivity] = useState(inactivityConfig.map((c) => c.defaultValue));
  const [features, setFeatures] = useState(featuresConfig.map((f) => f.defaultActive));

  const counts = {
    Alta: weights.filter((w) => w === 'Alta').length,
    Média: weights.filter((w) => w === 'Média').length,
    Baixa: weights.filter((w) => w === 'Baixa').length,
  };
  const total = weights.length;

  const handleDiscard = () => {
    setWeights(propensityVariables.map((v) => v.defaultWeight));
    setInactivity(inactivityConfig.map((c) => c.defaultValue));
    setFeatures(featuresConfig.map((f) => f.defaultActive));
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-8 space-y-6 flex-1">
        <PageHeader
          title="Parâmetros de Inteligência"
          description="Configure os modelos e regras que orientam as sugestões do sistema"
        />

        <Tabs defaultValue="propensao">
          <TabsList>
            <TabsTrigger value="propensao">Propensão de compra</TabsTrigger>
            <TabsTrigger value="alertas">Alertas de inatividade</TabsTrigger>
            <TabsTrigger value="funcionalidades">Funcionalidades</TabsTrigger>
          </TabsList>

          {/* Tab 1 — Propensão de compra */}
          <TabsContent value="propensao">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              {/* Left — Weights */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Pesos por variável</h3>
                </div>
                <div className="divide-y divide-border">
                  {propensityVariables.map((variable, i) => (
                    <div key={variable.label} className="flex items-center justify-between px-6 py-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{variable.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{variable.description}</div>
                      </div>
                      <WeightSelector
                        value={weights[i]}
                        onChange={(w) => {
                          const next = [...weights];
                          next[i] = w;
                          setWeights(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Impact + Info */}
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Impacto dos pesos</h3>
                  <p className="text-sm">
                    <span className="font-medium" style={{ color: '#185FA5' }}>{counts.Alta} alta</span>
                    <span className="text-muted-foreground"> · </span>
                    <span className="font-medium" style={{ color: '#854F0B' }}>{counts.Média} média</span>
                    <span className="text-muted-foreground"> · </span>
                    <span className="font-medium" style={{ color: '#3B6D11' }}>{counts.Baixa} baixa</span>
                  </p>
                  <div className="flex rounded-full overflow-hidden h-2.5 bg-border gap-px">
                    {counts.Alta > 0 && (
                      <div
                        className="transition-all duration-300"
                        style={{ width: `${(counts.Alta / total) * 100}%`, backgroundColor: '#185FA5' }}
                      />
                    )}
                    {counts.Média > 0 && (
                      <div
                        className="transition-all duration-300"
                        style={{ width: `${(counts.Média / total) * 100}%`, backgroundColor: '#EF9F27' }}
                      />
                    )}
                    {counts.Baixa > 0 && (
                      <div
                        className="transition-all duration-300"
                        style={{ width: `${(counts.Baixa / total) * 100}%`, backgroundColor: '#3B6D11' }}
                      />
                    )}
                  </div>
                  <div className="flex gap-5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#185FA5' }} />
                      Alta
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EF9F27' }} />
                      Média
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B6D11' }} />
                      Baixa
                    </div>
                  </div>
                </div>

                <div className="bg-secondary border border-border rounded-lg p-5">
                  <p className="text-sm text-foreground leading-relaxed">
                    Variáveis com peso <strong>Alta</strong> têm 3× mais influência no score final.
                    O modelo recalcula automaticamente ao salvar.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2 — Alertas de inatividade */}
          <TabsContent value="alertas">
            <div className="pt-4 max-w-lg">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Alertas de inatividade</h3>
                </div>
                <div className="divide-y divide-border">
                  {inactivityConfig.map((config, i) => (
                    <div key={config.label} className="flex items-center justify-between px-6 py-4 gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: config.dotColor ?? 'var(--muted-foreground)' }}
                        />
                        <span className="text-sm text-foreground">{config.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={inactivity[i]}
                          min={1}
                          onChange={(e) => {
                            const next = [...inactivity];
                            next[i] = Number(e.target.value);
                            setInactivity(next);
                          }}
                          className="w-20 text-sm text-right border border-border rounded-lg px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-sm text-muted-foreground w-7">dias</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3 — Funcionalidades */}
          <TabsContent value="funcionalidades">
            <div className="pt-4 max-w-lg">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Funcionalidades</h3>
                </div>
                <div className="divide-y divide-border">
                  {featuresConfig.map((feature, i) => (
                    <div key={feature.id} className="flex items-center justify-between px-6 py-4 gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{feature.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{feature.description}</div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                          style={features[i]
                            ? { backgroundColor: '#EAF3DE', color: '#3B6D11' }
                            : { backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)' }}
                        >
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
          </TabsContent>

        </Tabs>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-background border-t border-border px-8 py-4 flex items-center justify-end gap-3">
        <button
          onClick={handleDiscard}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
          Descartar
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
          <Save className="w-4 h-4" strokeWidth={1.5} />
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
