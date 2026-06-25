import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { MapPin, Users, Building2, TrendingUp, Plus, AlertTriangle } from 'lucide-react';

const territories = [
  {
    id: '1',
    name: 'São Paulo - Zona Sul',
    representative: 'Carlos Silva',
    clients: 156,
    activeClients: 142,
    coverage: 92,
    revenue: 'R$ 1.2M',
    status: 'balanced',
  },
  {
    id: '2',
    name: 'São Paulo - Zona Leste',
    representative: 'Ana Santos',
    clients: 89,
    activeClients: 78,
    coverage: 88,
    revenue: 'R$ 780K',
    status: 'balanced',
  },
  {
    id: '3',
    name: 'Rio de Janeiro - Centro',
    representative: 'João Oliveira',
    clients: 214,
    activeClients: 167,
    coverage: 78,
    revenue: 'R$ 1.5M',
    status: 'overloaded',
  },
  {
    id: '4',
    name: 'Minas Gerais - BH',
    representative: 'Maria Costa',
    clients: 67,
    activeClients: 61,
    coverage: 91,
    revenue: 'R$ 520K',
    status: 'underutilized',
  },
  {
    id: '5',
    name: 'Paraná - Curitiba',
    representative: 'Pedro Ferreira',
    clients: 134,
    activeClients: 118,
    coverage: 88,
    revenue: 'R$ 890K',
    status: 'balanced',
  },
];

export function Territories() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Gestão de Territórios"
        description="Distribuição territorial e otimização de carteiras"
        actions={
          <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Novo Território
          </button>
        }
      />

      {/* Map View */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-secondary to-accent flex items-center justify-center relative">
          <div className="text-center text-muted-foreground z-10">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" strokeWidth={1.5} />
            <div className="text-lg font-medium mb-2">Mapa Territorial Interativo</div>
            <div className="text-sm max-w-md">
              Visualização de regiões, sobreposições e distribuição de clientes
            </div>
          </div>
          {/* Decorative map elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Intelligence Alert */}
      <div className="bg-warning-light border border-warning/30 rounded-lg p-5">
        <div className="flex gap-4">
          <AlertTriangle className="w-5 h-5 text-warning-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <div className="font-medium text-warning-foreground mb-1">
              Desequilíbrio territorial detectado
            </div>
            <div className="text-sm text-warning-foreground/80">
              Território "Rio de Janeiro - Centro" possui 214 clientes (média: 132).
              Sugestão: redistribuir 45 clientes para otimizar cobertura.
            </div>
          </div>
        </div>
      </div>

      {/* Territory List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Território
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Representante
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Clientes
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cobertura
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Faturamento
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {territories.map((territory) => (
                <tr key={territory.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={`/territories/${territory.id}`}
                      className="font-medium text-primary hover:text-primary-hover"
                    >
                      {territory.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {territory.representative}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {territory.clients}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {territory.activeClients} ativos
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {territory.coverage}%
                      </span>
                      <div className="w-16 bg-secondary rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${territory.coverage}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-foreground">
                    {territory.revenue}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={territory.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={MapPin}
          label="Total de Territórios"
          value="12"
          sublabel="5 regiões"
        />
        <StatCard
          icon={Users}
          label="Representantes Ativos"
          value="26"
          sublabel="100% alocados"
        />
        <StatCard
          icon={Building2}
          label="Clientes Total"
          value="1.847"
          sublabel="1.623 ativos"
        />
        <StatCard
          icon={TrendingUp}
          label="Cobertura Média"
          value="87%"
          sublabel="+3% vs mês anterior"
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    balanced:     { bg: 'bg-secondary', text: 'text-foreground',       label: 'Balanceado' },
    overloaded:   { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Sobrecarregado' },
    underutilized:{ bg: 'bg-secondary', text: 'text-muted-foreground', label: 'Subutilizado' },
  }[status] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Normal' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  );
}
