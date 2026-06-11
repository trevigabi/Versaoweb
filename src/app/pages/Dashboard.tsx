import { PageHeader } from '../components/PageHeader';

const visitsData = [
  42, 48, 35, 52, 45, 58, 38, 63, 47, 55, 41, 59, 44, 51, 38, 67, 49, 56, 43, 61, 47, 54, 39, 58, 45, 52, 41, 68, 50, 87,
];

const maxVisit = Math.max(...visitsData);

export function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Dashboard executivo"
        description="Atualizado em 10 de junho de 2026"
      />

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Visitas hoje</div>
          <div className="text-4xl font-semibold text-foreground mb-2">127</div>
          <div className="text-sm text-success">+12% vs ontem</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Taxa de conversão</div>
          <div className="text-4xl font-semibold text-foreground mb-2">54%</div>
          <div className="text-sm text-danger">-3pp vs mês passado</div>
        </div>
        <div className="bg-card border border-warning/30 rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Clientes em risco</div>
          <div className="text-4xl font-semibold text-warning mb-2">23</div>
          <div className="text-sm text-danger">+5 esta semana</div>
        </div>
      </div>

      {/* Chart + Alerts */}
      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* Bar chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-foreground mb-6">Visitas por dia — junho</h3>
          <div className="flex items-end gap-1 h-40">
            {visitsData.map((value, index) => {
              const isLast = index === visitsData.length - 1;
              return (
                <div
                  key={index}
                  className="flex-1 rounded-t transition-opacity hover:opacity-80"
                  style={{
                    height: `${(value / maxVisit) * 100}%`,
                    backgroundColor: isLast ? '#1D2B3A' : '#BFDBFE',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-foreground mb-6">Alertas ativos</h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-danger mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">23 clientes em risco</div>
                <div className="text-xs text-muted-foreground">Inativação &lt; 15 dias</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-warning mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">8 rotas não confirmadas</div>
                <div className="text-xs text-muted-foreground">Amanhã sem planejamento</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-success mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">Sul acima da meta</div>
                <div className="text-xs text-muted-foreground">+18% vs projeção</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
