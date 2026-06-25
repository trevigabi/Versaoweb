import { PageHeader } from '../components/PageHeader';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router';

const occurrences = [
  {
    id: '1',
    type: 'Rota não executada',
    representative: 'João Oliveira',
    client: 'Multiple (8 clientes)',
    date: '27/05/2026',
    time: '---',
    severity: 'high',
    distance: 'Região Norte',
  },
  {
    id: '2',
    type: 'Visita muito curta',
    representative: 'Maria Costa',
    client: 'Mercado Central',
    date: '27/05/2026',
    time: '14:20',
    severity: 'medium',
    distance: '6 minutos',
  },
  {
    id: '3',
    type: 'Baixa atividade',
    representative: 'Ana Santos',
    client: '---',
    date: '26/05/2026',
    time: '---',
    severity: 'medium',
    distance: '3 visitas esta semana',
  },
  {
    id: '4',
    type: 'Cliente crítico sem visita',
    representative: 'Pedro Ferreira',
    client: 'Calçados Premium',
    date: '25/05/2026',
    time: '---',
    severity: 'high',
    distance: '112 dias sem visita',
  },
  {
    id: '5',
    type: 'Carteira descoberta',
    representative: 'Carlos Mendes',
    client: '---',
    date: '24/05/2026',
    time: '---',
    severity: 'medium',
    distance: '20 clientes sem cobertura',
  },
];

export function FieldAudit() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Auditoria Operacional"
        description="Análise de padrões e governança de execução"
      />

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-2">Visitas Hoje</div>
          <div className="text-2xl font-semibold text-foreground">127</div>
          <div className="text-xs text-muted-foreground mt-1">+12% vs ontem</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-2">Execução Normal</div>
          <div className="text-2xl font-semibold text-foreground">96%</div>
          <div className="text-xs text-muted-foreground mt-1">122 visitas</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-2">Para Revisão</div>
          <div className="text-2xl font-semibold text-foreground">4</div>
          <div className="text-xs text-muted-foreground mt-1">Atenção</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-2">Alta Severidade</div>
          <div className="text-2xl font-semibold text-foreground">2</div>
          <div className="text-xs text-muted-foreground mt-1">Investigar</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
          <option>Todas as Ocorrências</option>
          <option>Alta Severidade</option>
          <option>Média Severidade</option>
          <option>Baixa Severidade</option>
        </select>
        <select className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
          <option>Todos os Representantes</option>
          <option>Carlos Silva</option>
          <option>Ana Santos</option>
        </select>
        <select className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
          <option>Últimos 7 dias</option>
          <option>Últimos 30 dias</option>
          <option>Este mês</option>
        </select>
      </div>

      {/* Occurrences Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Eventos que Precisam de Atenção</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Severidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tipo de Ocorrência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Representante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Detalhes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {occurrences.map((occurrence) => (
                <tr key={occurrence.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <SeverityBadgeSmall severity={occurrence.severity} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{occurrence.type}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {occurrence.representative}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {occurrence.client}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {occurrence.date}
                    {occurrence.time !== '---' && (
                      <div className="text-xs">{occurrence.time}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" strokeWidth={1.5} />
                      {occurrence.distance}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/field-audit/${occurrence.id}`}
                      className="text-sm text-primary hover:text-primary-hover font-medium"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visit History */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Histórico de Visitas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Representante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Duração
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Resultado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Próxima ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to="/clients/1" className="text-sm font-medium text-primary hover:text-primary-hover">
                    Silva Calçados
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">Ana Souza</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  <div>hoje</div>
                  <div className="text-xs">09h41</div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">52 min</td>
                <td className="px-6 py-4 text-center">
                  <VisitResultBadge result="positive" />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Visita em 30 dias</td>
              </tr>
              <tr className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to="/clients/2" className="text-sm font-medium text-primary hover:text-primary-hover">
                    Passos Largos
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">Fernanda Lima</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  <div>hoje</div>
                  <div className="text-xs">08h15</div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">38 min</td>
                <td className="px-6 py-4 text-center">
                  <VisitResultBadge result="positive" />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Follow-up em 7 dias</td>
              </tr>
              <tr className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to="/clients/3" className="text-sm font-medium text-primary hover:text-primary-hover">
                    Calçados Bom Pé
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">Ana Souza</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  <div>ontem</div>
                  <div className="text-xs">15h32</div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">28 min</td>
                <td className="px-6 py-4 text-center">
                  <VisitResultBadge result="negative" />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Reagendar</td>
              </tr>
              <tr className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to="/clients/4" className="text-sm font-medium text-primary hover:text-primary-hover">
                    Loja da Maria
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">Patrícia Rocha</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  <div>ontem</div>
                  <div className="text-xs">11h05</div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">61 min</td>
                <td className="px-6 py-4 text-center">
                  <VisitResultBadge result="positive" />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Visita em 45 dias</td>
              </tr>
              <tr className="hover:bg-secondary/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to="/clients/5" className="text-sm font-medium text-primary hover:text-primary-hover">
                    Tendência Cal.
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">Juliana Ferreira</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  <div>há 2 dias</div>
                  <div className="text-xs"></div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">44 min</td>
                <td className="px-6 py-4 text-center">
                  <VisitResultBadge result="positive" />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Enviar amostra</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const config = {
    high: {
      bg: 'bg-danger-light',
      border: 'border-danger/30',
      text: 'text-danger-foreground',
      icon: AlertTriangle,
      label: 'Alta',
    },
    medium: {
      bg: 'bg-secondary',
      border: 'border-border',
      text: 'text-muted-foreground',
      icon: Clock,
      label: 'Média',
    },
    low: {
      bg: 'bg-secondary',
      border: 'border-border',
      text: 'text-foreground',
      icon: AlertTriangle,
      label: 'Baixa',
    },
  }[severity] || {
    bg: 'bg-secondary',
    border: 'border-border',
    text: 'text-foreground',
    icon: AlertTriangle,
    label: 'Normal',
  };

  const Icon = config.icon;

  return (
    <div className={`w-12 h-12 rounded-lg border ${config.border} ${config.bg} flex items-center justify-center`}>
      <Icon className={`w-6 h-6 ${config.text}`} strokeWidth={1.5} />
    </div>
  );
}

function SeverityBadgeSmall({ severity }: { severity: string }) {
  const config = {
    high: { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Alta' },
    medium: { bg: 'bg-secondary', text: 'text-muted-foreground', label: 'Média' },
    low: { bg: 'bg-secondary', text: 'text-muted-foreground', label: 'Baixa' },
  }[severity] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Normal' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

function VisitResultBadge({ result }: { result: string }) {
  const config = {
    positive: { bg: 'bg-success-light', text: 'text-success-foreground', label: 'Positiva' },
    negative: { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Negativa' },
  }[result] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Sem resultado' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
