import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { Search, Filter, Download } from 'lucide-react';

const representatives = [
  {
    id: '1',
    name: 'Carlos Silva',
    region: 'São Paulo - Capital',
    portfolio: 156,
    score: 94,
    conversion: 38,
    coverage: 92,
    productivity: 96,
    lastActivity: '2 horas atrás',
    lastAccessDays: 0,
    appStatus: 'active' as const,
  },
  {
    id: '2',
    name: 'Ana Santos',
    region: 'Rio de Janeiro',
    portfolio: 142,
    score: 91,
    conversion: 35,
    coverage: 88,
    productivity: 94,
    lastActivity: '1 dia atrás',
    lastAccessDays: 1,
    appStatus: 'active' as const,
  },
  {
    id: '3',
    name: 'João Oliveira',
    region: 'Minas Gerais',
    portfolio: 178,
    score: 87,
    conversion: 32,
    coverage: 85,
    productivity: 89,
    lastActivity: '4 dias atrás',
    lastAccessDays: 4,
    appStatus: 'attention' as const,
  },
  {
    id: '4',
    name: 'Maria Costa',
    region: 'Paraná',
    portfolio: 134,
    score: 89,
    conversion: 36,
    coverage: 91,
    productivity: 92,
    lastActivity: '3 dias atrás',
    lastAccessDays: 3,
    appStatus: 'active' as const,
  },
  {
    id: '5',
    name: 'Pedro Ferreira',
    region: 'Rio Grande do Sul',
    portfolio: 165,
    score: 85,
    conversion: 30,
    coverage: 82,
    productivity: 87,
    lastActivity: '7 dias atrás',
    lastAccessDays: 7,
    appStatus: 'inactive' as const,
  },
  {
    id: '6',
    name: 'Roberto Lima',
    region: 'Bahia',
    portfolio: 98,
    score: 72,
    conversion: 28,
    coverage: 65,
    productivity: 68,
    lastActivity: 'Nunca',
    lastAccessDays: -1,
    appStatus: 'never' as const,
  },
];

export function Representatives() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Representantes"
        description="Gestão e análise da equipe comercial"
        actions={
          <>
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Exportar</span>
            </button>
          </>
        }
      />

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar representante..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Filtros</span>
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
                  Representante
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Região
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Carteira
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Conversão
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cobertura
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Produtividade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Última Atividade
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status do App
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {representatives.map((rep) => (
                <tr
                  key={rep.id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/representatives/${rep.id}`}
                      className="font-medium text-primary hover:text-primary-hover"
                    >
                      {rep.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{rep.region}</td>
                  <td className="px-6 py-4 text-sm text-center text-foreground">
                    {rep.portfolio}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ScoreBadge score={rep.score} />
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-foreground">
                    {rep.conversion}%
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-foreground">
                    {rep.coverage}%
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-foreground">
                    {rep.productivity}%
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {rep.lastActivity}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <AppStatusBadge status={rep.appStatus} />
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

function ScoreBadge({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-secondary text-foreground';
    return 'bg-danger-light text-danger-foreground';
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${getColor(
        score
      )}`}
    >
      {score}
    </span>
  );
}

function AppStatusBadge({ status }: { status: 'active' | 'attention' | 'inactive' | 'never' }) {
  const config = {
    active: {
      bg: 'bg-secondary',
      text: 'text-foreground',
      label: 'Ativo',
      dot: 'bg-primary',
    },
    attention: {
      bg: 'bg-secondary',
      text: 'text-muted-foreground',
      label: 'Atenção',
      dot: 'bg-muted-foreground',
    },
    inactive: {
      bg: 'bg-secondary',
      text: 'text-muted-foreground',
      label: 'Sem uso',
      dot: 'bg-muted',
    },
    never: {
      bg: 'bg-secondary',
      text: 'text-muted-foreground',
      label: 'Nunca ativado',
      dot: 'bg-muted-foreground',
    },
  };

  const c = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {c.label}
    </span>
  );
}
