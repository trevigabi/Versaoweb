import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ArrowUp, ArrowDown } from 'lucide-react';

type Period = 'day' | 'week' | 'month';

const periodLabels: Record<Period, string> = {
  day: 'Dia',
  week: 'Semana',
  month: 'Mês',
};

const metricsByPeriod: Record<
  Period,
  {
    visits: { value: string; change: string; trend: 'up' | 'down' };
    coverage: { value: string; change: string; trend: 'up' | 'down' };
    clientsCovered: { value: string; change: string };
    conversion: { value: string; change: string; trend: 'up' | 'down' };
    atRisk: { value: string; change: string; trend: 'up' | 'down' };
  }
> = {
  day: {
    visits: { value: '127', change: '+12% vs ontem', trend: 'up' },
    coverage: { value: '68%', change: '+2pp vs ontem', trend: 'up' },
    clientsCovered: { value: '214', change: 'cobertos hoje' },
    conversion: { value: '54%', change: '-3pp vs ontem', trend: 'down' },
    atRisk: { value: '23', change: '+5 hoje', trend: 'down' },
  },
  week: {
    visits: { value: '612', change: '+8% vs semana passada', trend: 'up' },
    coverage: { value: '74%', change: '+4pp vs semana passada', trend: 'up' },
    clientsCovered: { value: '892', change: 'de 1.847 total' },
    conversion: { value: '58%', change: '+2pp vs semana passada', trend: 'up' },
    atRisk: { value: '23', change: '+5 esta semana', trend: 'down' },
  },
  month: {
    visits: { value: '2.480', change: '+15% vs mês passado', trend: 'up' },
    coverage: { value: '87%', change: '+5% vs mês anterior', trend: 'up' },
    clientsCovered: { value: '1.623', change: 'de 1.847 total' },
    conversion: { value: '54%', change: '-3pp vs mês passado', trend: 'down' },
    atRisk: { value: '23', change: '+5 este mês', trend: 'down' },
  },
};

export function Dashboard() {
  const [period, setPeriod] = useState<Period>('day');

  const visitsData = [
    42, 48, 35, 52, 45, 58, 38, 63, 47, 55, 41, 59, 44, 51, 38, 67, 49, 56, 43, 61, 47, 54, 39, 58, 45, 52, 41, 68, 50, 87,
  ];

  const metrics = metricsByPeriod[period];

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Dashboard Executivo"
        description="Visão consolidada da operação comercial, priorizando os dados do dia"
        actions={<PeriodSelector period={period} onChange={setPeriod} />}
      />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <MetricCard
          label={`Visitas — ${periodLabels[period].toLowerCase()}`}
          value={metrics.visits.value}
          change={metrics.visits.change}
          trend={metrics.visits.trend}
        />
        <MetricCard
          label="Cobertura"
          value={metrics.coverage.value}
          change={metrics.coverage.change}
          trend={metrics.coverage.trend}
        />
        <MetricCard
          label="Clientes cobertos"
          value={metrics.clientsCovered.value}
          change={metrics.clientsCovered.change}
        />
        <MetricCard
          label="Taxa de conversão"
          value={metrics.conversion.value}
          change={metrics.conversion.change}
          trend={metrics.conversion.trend}
        />
        <MetricCard
          label="Clientes em risco"
          value={metrics.atRisk.value}
          change={metrics.atRisk.change}
          trend={metrics.atRisk.trend}
        />
      </div>

      {/* Goal Tracking */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Meta do mês</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Meta do mês</div>
            <div className="text-2xl font-semibold text-foreground mb-2">R$ 2,8M</div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">No ritmo</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Realizado</div>
            <div className="text-2xl font-semibold text-foreground mb-2">R$ 1,9M</div>
            <div className="text-sm text-muted-foreground">68% do total</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Projeção</div>
            <div className="text-2xl font-semibold text-foreground mb-2">R$ 3,0M</div>
            <div className="text-sm text-primary">+5% acima da meta</div>
          </div>
        </div>
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Visits Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-foreground mb-6">Visitas por dia — últimos 30 dias</h3>
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

function PeriodSelector({
  period,
  onChange,
}: {
  period: Period;
  onChange: (period: Period) => void;
}) {
  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      {(Object.keys(periodLabels) as Period[]).map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            period === key
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {periodLabels[key]}
        </button>
      ))}
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
  trend?: 'up' | 'down';
}) {
  const trendColor = trend === 'up' ? 'text-primary' : 'text-muted-foreground';
  const Icon = trend === 'up' ? ArrowUp : ArrowDown;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-sm text-muted-foreground mb-2">{label}</div>
      <div className="text-2xl font-semibold text-foreground mb-2">{value}</div>
      <div className={`text-sm flex items-center gap-1 ${trend ? trendColor : 'text-muted-foreground'}`}>
        {trend && <Icon className="w-3 h-3" strokeWidth={2} />}
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
    success: 'bg-primary',
    warning: 'bg-muted-foreground',
    danger: 'bg-primary',
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
    excellent: { color: 'bg-primary', label: 'Excelente' },
    good:      { color: 'bg-primary', label: 'Bom' },
    warning:   { color: 'bg-muted-foreground', label: 'Atenção' },
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
