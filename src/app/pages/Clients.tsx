import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { Search, Filter, Download } from 'lucide-react';

const clients = [
  {
    id: '1',
    name: 'Supermercado Estrela',
    category: 'Premium',
    representative: 'Carlos Silva',
    lastVisit: '2 dias atrás',
    frequency: 'Alta',
    revenue: 'R$ 45.2K',
    status: 'Ativo',
    risk: 'Baixo',
  },
  {
    id: '2',
    name: 'Distribuidora Central',
    category: 'Premium',
    representative: 'Ana Santos',
    lastVisit: '15 dias atrás',
    frequency: 'Média',
    revenue: 'R$ 38.5K',
    status: 'Atenção',
    risk: 'Médio',
  },
  {
    id: '3',
    name: 'Mercado São João',
    category: 'Standard',
    representative: 'João Oliveira',
    lastVisit: '5 dias atrás',
    frequency: 'Média',
    revenue: 'R$ 22.3K',
    status: 'Ativo',
    risk: 'Baixo',
  },
  {
    id: '4',
    name: 'Atacadão Norte',
    category: 'Premium',
    representative: 'Maria Costa',
    lastVisit: '28 dias atrás',
    frequency: 'Baixa',
    revenue: 'R$ 52.1K',
    status: 'Risco',
    risk: 'Alto',
  },
  {
    id: '5',
    name: 'Empório Gourmet',
    category: 'Standard',
    representative: 'Pedro Ferreira',
    lastVisit: '7 dias atrás',
    frequency: 'Média',
    revenue: 'R$ 18.7K',
    status: 'Ativo',
    risk: 'Baixo',
  },
];

const filters = [
  { label: 'Todos', count: 487, active: true },
  { label: 'Em Risco', count: 23, active: false },
  { label: 'Sem Visita 30d+', count: 45, active: false },
  { label: 'Alto Potencial', count: 67, active: false },
  { label: 'Recompra Atrasada', count: 18, active: false },
];

export function Clients() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Clientes"
        description="Carteira consolidada e gestão de relacionamento"
        actions={
          <>
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Exportar</span>
            </button>
          </>
        }
      />

      {/* Quick Filters */}
      <div className="border-b border-border">
        <nav className="flex gap-1 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.label}
              className={`px-4 pb-3 pt-1 text-sm font-medium whitespace-nowrap transition-colors relative flex items-center gap-2 ${
                filter.active
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                filter.active ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
              }`}>{filter.count}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar cliente, região ou representante..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Filtros Avançados</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Representante
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Última Visita
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Frequência
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Receita Mensal
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={`/clients/${client.id}`}
                      className="font-medium text-primary hover:text-primary-hover"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <CategoryBadge category={client.category} />
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {client.representative}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {client.lastVisit}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-foreground">
                    {client.frequency}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-foreground font-medium">
                    {client.revenue}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={client.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
        category === 'Premium'
          ? 'bg-primary/10 text-primary'
          : 'bg-secondary text-foreground'
      }`}
    >
      {category}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getColor = (status: string) => {
    if (status === 'Ativo') return 'bg-success-light text-success-foreground';
    if (status === 'Atenção') return 'bg-warning-light text-warning-foreground';
    return 'bg-danger-light text-danger-foreground';
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}
