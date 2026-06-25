import { PageHeader } from '../components/PageHeader';
import { TrendingUp, AlertTriangle, Target, Award } from 'lucide-react';

const competitors = [
  { name: 'Concorrente A', mentions: 142, trend: 'up', change: '+12%' },
  { name: 'Concorrente B', mentions: 89, trend: 'down', change: '-5%' },
  { name: 'Concorrente C', mentions: 67, trend: 'up', change: '+8%' },
  { name: 'Concorrente D', mentions: 45, trend: 'stable', change: '0%' },
];

const objections = [
  { reason: 'Preço mais alto', frequency: 34, region: 'Sul' },
  { reason: 'Prazo de entrega', frequency: 28, region: 'Nordeste' },
  { reason: 'Condições de pagamento', frequency: 22, region: 'Sudeste' },
  { reason: 'Disponibilidade de estoque', frequency: 18, region: 'Centro-Oeste' },
];

const insights = [
  {
    title: 'Concorrente A expandiu presença no Sul',
    description:
      'Nas últimas 4 semanas, identificamos 23% mais menções ao Concorrente A na região Sul, especialmente em clientes premium.',
    impact: 'Alto',
    region: 'Sul',
  },
  {
    title: 'Categoria infantil cresce acima da média',
    description:
      'Produtos da linha infantil apresentam crescimento de 18% vs média de 7% das demais categorias.',
    impact: 'Médio',
    region: 'Nacional',
  },
  {
    title: 'Objeção de preço concentrada em produtos premium',
    description:
      'A principal objeção em produtos premium é preço, mas conversão permanece alta (92%), indicando valor percebido.',
    impact: 'Baixo',
    region: 'Sudeste',
  },
];

export function CompetitiveIntelligence() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Inteligência Competitiva"
        description="Análise consolidada do campo e tendências de mercado"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">Concorrentes Ativos</div>
            <Target className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-semibold text-foreground">12</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">Menções no Campo</div>
            <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-semibold text-foreground">343</div>
          <div className="text-xs text-primary mt-1">+8% vs mês anterior</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">Objeções Mapeadas</div>
            <AlertTriangle className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-semibold text-foreground">102</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-muted-foreground">Taxa de Vitória</div>
            <Award className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-semibold text-foreground">87%</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitors */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Concorrentes Citados
          </h3>
          <div className="space-y-3">
            {competitors.map((competitor) => (
              <div
                key={competitor.name}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{competitor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {competitor.mentions} menções
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-medium ${
                      competitor.trend === 'up'
                        ? 'text-primary'
                        : competitor.trend === 'down'
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {competitor.change}
                  </span>
                  <TrendIcon trend={competitor.trend} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Objections */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Principais Objeções
          </h3>
          <div className="space-y-3">
            {objections.map((objection, index) => (
              <div
                key={index}
                className="py-3 border-b border-border last:border-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-foreground">{objection.reason}</div>
                  <span className="text-sm text-muted-foreground">
                    {objection.frequency} casos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(objection.frequency / 34) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-20">
                    {objection.region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Análise de Inteligência</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-secondary border border-border rounded-lg p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-medium text-foreground mb-1">{insight.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {insight.description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <ImpactBadge impact={insight.impact} />
                  <RegionBadge region={insight.region} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Oportunidades Comerciais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OpportunityCard
            title="Cross-sell Categoria B"
            description="127 clientes com perfil compatível"
            potential="R$ 340K"
          />
          <OpportunityCard
            title="Reconquista Inativos"
            description="43 clientes sem compra há 90 dias"
            potential="R$ 180K"
          />
          <OpportunityCard
            title="Upsell Premium"
            description="85 clientes Standard com potencial"
            potential="R$ 520K"
          />
        </div>
      </div>
    </div>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') {
    return (
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <TrendingUp className="w-4 h-4 text-primary" strokeWidth={2} />
      </div>
    );
  }
  if (trend === 'down') {
    return (
      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
        <TrendingUp className="w-4 h-4 text-muted-foreground rotate-180" strokeWidth={2} />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
      <div className="w-3 h-0.5 bg-muted-foreground"></div>
    </div>
  );
}

function ImpactBadge({ impact }: { impact: string }) {
  const colors = {
    Alto: 'bg-primary/10 text-primary',
    Médio: 'bg-secondary text-foreground',
    Baixo: 'bg-secondary text-muted-foreground',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        colors[impact as keyof typeof colors]
      }`}
    >
      {impact}
    </span>
  );
}

function RegionBadge({ region }: { region: string }) {
  return (
    <span className="px-2 py-1 rounded bg-secondary text-foreground text-xs font-medium">
      {region}
    </span>
  );
}

function OpportunityCard({
  title,
  description,
  potential,
}: {
  title: string;
  description: string;
  potential: string;
}) {
  return (
    <div className="bg-secondary rounded-lg p-5 hover:bg-accent transition-colors cursor-pointer">
      <div className="font-medium text-foreground mb-2">{title}</div>
      <div className="text-sm text-muted-foreground mb-3">{description}</div>
      <div className="text-lg font-semibold text-foreground">{potential}</div>
    </div>
  );
}
