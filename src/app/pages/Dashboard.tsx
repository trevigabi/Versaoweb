import { PageHeader } from '../components/PageHeader';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function Dashboard() {
  const visitsData = [
    42, 48, 35, 52, 45, 58, 38, 63, 47, 55, 41, 59, 44, 51, 38, 67, 49, 56, 43, 61, 47, 54, 39, 58, 45, 52, 41, 68, 50, 87,
  ];

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Dashboard Executivo"
        description="Visão consolidada da operação comercial"
      />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Visitas hoje"
          value="127"
          change="+12% vs ontem"
          trend="up"
        />
        <MetricCard
          label="Cobertura do mês"
          value="68%"
          change="+8pp vs mês passado"
          trend="up"
        />
        <MetricCard
          label="Taxa de conversão"
          value="54%"
          change="-3pp vs mês passado"
          trend="down"
        />
        <MetricCard
          label="Clientes em risco"
          value="23"
          change="+5 esta semana"
          trend="down"
        />
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Visits Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-foreground mb-6">Visitas por dia — junho</h3>
          <div className="flex items-end justify-between gap-1 h-40">
            {visitsData.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary/20 rounded-t hover:bg-primary transition-colors relative group"
                style={{ height: `${(value / Math.max(...visitsData)) * 100}%` }}
              >
                {index === visitsData.length - 1 && (
                  <div className="absolute inset-0 bg-primary rounded-t"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-foreground mb-6">Alertas ativos</h3>
          <div className="space-y-4">
            <AlertItem
              title="23 clientes em risco"
              subtitle="Inativação < 15 dias"
              color="danger"
            />
            <AlertItem
              title="8 rotas não confirmadas"
              subtitle="Amanhã sem planejamento"
              color="warning"
            />
            <AlertItem
              title="Sul acima da meta"
              subtitle="+18% vs projeção"
              color="success"
            />
          </div>
        </div>
      </div>

      {/* Regional Overview */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Visão Regional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RegionCard region="São Paulo" coverage={92} reps={8} status="excellent" />
          <RegionCard region="Rio de Janeiro" coverage={88} reps={6} status="good" />
          <RegionCard region="Sul" coverage={76} reps={7} status="warning" />
          <RegionCard region="Nordeste" coverage={81} reps={5} status="good" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
  trend,
}: {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}) {
  const trendColor = trend === 'up' ? 'text-success' : 'text-danger';
  const Icon = trend === 'up' ? ArrowUp : ArrowDown;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-sm text-muted-foreground mb-2">{label}</div>
      <div className="text-4xl font-semibold text-foreground mb-2">{value}</div>
      <div className={`text-sm flex items-center gap-1 ${trendColor}`}>
        <Icon className="w-3 h-3" strokeWidth={2} />
        {change}
      </div>
    </div>
  );
}

function AlertItem({
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: 'success' | 'warning' | 'danger';
}) {
  const colorConfig = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  return (
    <div className="flex items-start gap-3">
      <div className={`w-3 h-3 rounded-full ${colorConfig[color]} mt-1 flex-shrink-0`}></div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}

function RegionCard({
  region,
  coverage,
  reps,
  status,
}: {
  region: string;
  coverage: number;
  reps: number;
  status: 'excellent' | 'good' | 'warning';
}) {
  const statusConfig = {
    excellent: { color: 'bg-success', label: 'Excelente' },
    good: { color: 'bg-primary', label: 'Bom' },
    warning: { color: 'bg-warning', label: 'Atenção' },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-sm transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="font-medium text-foreground">{region}</div>
        <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Cobertura</span>
          <span className="font-medium text-foreground">{coverage}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Representantes</span>
          <span className="font-medium text-foreground">{reps}</span>
        </div>
      </div>
    </div>
  );
}
