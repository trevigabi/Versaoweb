import { PageHeader } from '../components/PageHeader';
import { Plus, Calendar, Target, TrendingUp } from 'lucide-react';

const campaigns = [
  {
    id: '1',
    name: 'Expansão Q2 2026',
    type: 'Meta de Vendas',
    period: '01/04 - 30/06/2026',
    target: 'R$ 2.5M',
    progress: 67,
    status: 'active',
  },
  {
    id: '2',
    name: 'Black Friday Premium',
    type: 'Incentivo',
    period: '15/11 - 30/11/2026',
    target: '+30% vendas',
    progress: 0,
    status: 'scheduled',
  },
  {
    id: '3',
    name: 'Recuperação Sul',
    type: 'Regional',
    period: '01/05 - 31/05/2026',
    target: '85% cobertura',
    progress: 45,
    status: 'active',
  },
];

export function Campaigns() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Campanhas e Incentivos"
        description="Gestão de metas, campanhas e programas de incentivo"
        actions={
          <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Nova Campanha
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Target className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="text-sm text-muted-foreground">Campanhas Ativas</div>
          </div>
          <div className="text-3xl font-semibold text-foreground">2</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Calendar className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="text-sm text-muted-foreground">Agendadas</div>
          </div>
          <div className="text-3xl font-semibold text-foreground">1</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="text-sm text-muted-foreground">Performance Média</div>
          </div>
          <div className="text-3xl font-semibold text-foreground">56%</div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                  <StatusBadge status={campaign.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    {campaign.period}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4" strokeWidth={1.5} />
                    {campaign.type}
                  </div>
                </div>
              </div>
              <button className="text-sm text-primary hover:text-primary-hover font-medium">
                Ver Detalhes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Meta</div>
                <div className="text-lg font-semibold text-foreground">{campaign.target}</div>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium text-foreground">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${campaign.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Wizard Preview */}
      <div className="bg-card border border-dashed border-border rounded-lg p-8 opacity-60">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <h4 className="font-medium text-foreground mb-2">Criar Nova Campanha</h4>
          <p className="text-sm text-muted-foreground">
            Configure metas, períodos, regras de incentivo e acompanhe resultados em tempo real
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    active:    { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Ativa' },
    scheduled: { bg: 'bg-secondary',    text: 'text-muted-foreground',   label: 'Agendada' },
    completed: { bg: 'bg-secondary',    text: 'text-foreground',          label: 'Concluída' },
  }[status] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Inativa' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
