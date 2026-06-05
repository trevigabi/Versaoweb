import { PageHeader } from '../components/PageHeader';
import { Sparkles, Info, Zap } from 'lucide-react';
import { useState } from 'react';

const priorityFactors = [
  {
    id: 'purchase_timing',
    label: 'Momento de Recompra',
    description: 'Prioriza clientes próximos da janela ideal de recompra',
    businessImpact: 'Aumenta taxa de conversão em 23%',
    defaultValue: 85,
  },
  {
    id: 'revenue_potential',
    label: 'Potencial de Receita',
    description: 'Clientes com maior ticket médio histórico',
    businessImpact: 'Foca em clientes de alto valor',
    defaultValue: 80,
  },
  {
    id: 'churn_risk',
    label: 'Risco de Perda',
    description: 'Clientes com sinais de afastamento ou redução de compras',
    businessImpact: 'Recuperação proativa de carteira',
    defaultValue: 75,
  },
  {
    id: 'growth_opportunity',
    label: 'Oportunidade de Crescimento',
    description: 'Clientes com padrão de compra abaixo do potencial',
    businessImpact: 'Expande receita por cliente',
    defaultValue: 70,
  },
  {
    id: 'strategic_category',
    label: 'Categoria Estratégica',
    description: 'Produtos ou linhas prioritárias definidas pela empresa',
    businessImpact: 'Alinha execução com estratégia',
    defaultValue: 65,
  },
  {
    id: 'geographic_efficiency',
    label: 'Eficiência Geográfica',
    description: 'Proximidade e otimização de rota',
    businessImpact: 'Reduz tempo de deslocamento em 18%',
    defaultValue: 60,
  },
];

const churnIndicators = [
  {
    id: 'no_purchase',
    label: 'Sem compra há mais de 60 dias',
    weight: 90,
    enabled: true,
  },
  {
    id: 'declining_frequency',
    label: 'Redução de frequência de compra',
    weight: 75,
    enabled: true,
  },
  {
    id: 'ticket_reduction',
    label: 'Queda de ticket médio',
    weight: 70,
    enabled: true,
  },
  {
    id: 'payment_delay',
    label: 'Atraso recorrente no pagamento',
    weight: 60,
    enabled: false,
  },
];

export function AIEngine() {
  const [priorities, setPriorities] = useState<Record<string, number>>(
    priorityFactors.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue }), {})
  );

  const handlePriorityChange = (id: string, value: number) => {
    setPriorities({ ...priorities, [id]: value });
  };

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Motor de Inteligência"
        description="Configure como a IA prioriza visitas e identifica oportunidades"
      />

      {/* Info Banner */}
      <div className="bg-ai-accent-light border border-ai-accent/30 rounded-lg p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-ai-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-ai-foreground" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Como Funciona a Priorização Inteligente
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              O sistema analisa múltiplos fatores para sugerir a sequência ideal de visitas.
              Ajuste os pesos abaixo para alinhar a IA com a estratégia comercial da sua empresa.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Zap className="w-4 h-4" strokeWidth={1.5} />
              <span>Alterações são aplicadas em tempo real no app móvel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">
          Fatores de Priorização de Visitas
        </h3>
        <div className="space-y-8">
          {priorityFactors.map((factor) => (
            <div key={factor.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{factor.label}</span>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      title={factor.businessImpact}
                    >
                      <Info className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {factor.description}
                  </div>
                  <div className="text-xs text-success">{factor.businessImpact}</div>
                </div>
                <div className="ml-6 flex flex-col items-end gap-1">
                  <span className="text-3xl font-semibold text-foreground tabular-nums">
                    {priorities[factor.id]}
                  </span>
                  <span className="text-xs text-muted-foreground">prioridade</span>
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priorities[factor.id]}
                  onChange={(e) => handlePriorityChange(factor.id, parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Não priorizar</span>
                  <span>Prioridade máxima</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Churn Detection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Indicadores de Risco de Perda (Churn)
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure quais comportamentos indicam risco de perda do cliente
        </p>
        <div className="space-y-4">
          {churnIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4 flex-1">
                <input
                  type="checkbox"
                  defaultChecked={indicator.enabled}
                  className="w-5 h-5 rounded border-border"
                />
                <div>
                  <div className="font-medium text-foreground">{indicator.label}</div>
                  <div className="text-sm text-muted-foreground">
                    Peso: {indicator.weight}/100
                  </div>
                </div>
              </div>
              <button className="text-sm text-primary hover:text-primary-hover">
                Configurar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Última atualização: Hoje às 14:32
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-border rounded-lg font-medium hover:bg-secondary transition-colors">
            Restaurar Padrões
          </button>
          <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors">
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
