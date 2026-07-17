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
