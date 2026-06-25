import { useParams, Link } from 'react-router';
import { ArrowLeft, ArrowUp, MessageSquare, User, X } from 'lucide-react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function RepresentativeProfile() {
  const { id } = useParams();

  const performanceData = [45, 52, 48, 61, 58, 67]; // Jan-Jun

  const clients = [
    { id: '1', name: 'Silva Calçados', lastPurchase: '32 dias', status: 'active', score: 87 },
    { id: '2', name: 'Moda e Arte', lastPurchase: '15 dias', status: 'active', score: 92 },
    { id: '3', name: 'Calçados Bom Pé', lastPurchase: '95 dias', status: 'risk', score: 41 },
    { id: '4', name: 'Loja da Maria', lastPurchase: '8 dias', status: 'active', score: 88 },
    { id: '5', name: 'Sapatos & Cia', lastPurchase: '162 dias', status: 'critical', score: 12 },
    { id: '6', name: 'Boutique Fashion', lastPurchase: '22 dias', status: 'active', score: 85 },
    { id: '7', name: 'Mega Calçados', lastPurchase: '45 dias', status: 'active', score: 78 },
  ];

  return (
    <div className="p-8 space-y-8">
      <Link
        to="/representatives"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        Voltar para Representantes
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-semibold text-foreground">Ana Souza</h1>
                <p className="text-sm text-muted-foreground">Rep — Serra Gaúcha</p>
              </div>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-6 w-full max-w-md z-50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-semibold text-foreground">
                  Informações do Representante
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </Dialog.Close>
              </div>

              <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-border">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-primary">AS</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Ana Souza</h2>
                <div className="text-sm text-muted-foreground mb-3">Rep — Serra Gaúcha</div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Ativo
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">ana.souza@email.com</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="text-foreground">(51) 99999-1234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CNPJ</span>
                  <span className="text-foreground">12.345.678/0001-90</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-border">
                  <span className="text-muted-foreground">Desde</span>
                  <span className="text-foreground font-medium">jan 2022</span>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="flex gap-3">
          <button className="px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
            Editar território
          </button>
          <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
            Mensagem
          </button>
        </div>
      </div>

      {/* KPIs - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard label="Visitas (mês)" value="142" change="+18%" trend="up" />
        <KPICard label="Conversão" value="61%" change="+4pp" trend="up" />
        <KPICard label="Cobertura" value="78%" change="+8pp" trend="up" />
      </div>

      {/* Territory + Performance - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Territory */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-6">Território</h3>
          <div className="h-64 bg-secondary rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-sm font-medium text-foreground mb-1">Serra Gaúcha</div>
              <div className="text-xs text-muted-foreground">Região Sul</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Clientes</div>
              <div className="text-2xl font-semibold text-foreground">87</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Municípios</div>
              <div className="text-2xl font-semibold text-foreground">23</div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-6">Performance — 6 meses</h3>
          <div className="h-64 flex items-end justify-between gap-3">
            {performanceData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div
                  className="w-full bg-primary/20 rounded-t hover:bg-primary transition-colors cursor-pointer"
                  style={{ height: `${(value / Math.max(...performanceData)) * 100}%` }}
                ></div>
                <div className="text-xs text-muted-foreground font-medium">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Pattern - Full Width, Always Open */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">Padrão Operacional</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <MetricItem label="Dias mais ativos" value="Ter, Qua, Qui" />
          <MetricItem label="Horário preferido" value="09h - 16h" />
          <MetricItem label="Tempo médio visita" value="18 minutos" />
          <MetricItem label="Check-ins/dia" value="8.4 visitas" />
          <MetricItem label="Eficiência de rota" value="94%" highlight />
          <MetricItem label="Taxa de reagendamento" value="12%" />
        </div>
      </div>

      {/* Clients Table - Full Width at Bottom */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Clientes da carteira</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Última compra
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={`/clients/${client.id}`}
                      className="text-sm font-medium text-primary hover:text-primary-hover"
                    >
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {client.lastPurchase}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ClientStatusBadge status={client.status} />
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    {client.score}
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

function KPICard({
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
  const trendColor = trend === 'up' ? 'text-primary' : 'text-muted-foreground';
  const Icon = ArrowUp;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-sm text-muted-foreground mb-3">{label}</div>
      <div className="text-3xl font-semibold text-foreground mb-3">{value}</div>
      <div className={`text-sm flex items-center gap-1.5 ${trendColor} font-medium`}>
        <Icon
          className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
        {change}
      </div>
    </div>
  );
}

function MetricItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">{label}</div>
      <div
        className={`text-lg font-semibold ${
          highlight ? 'text-primary' : 'text-foreground'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ClientStatusBadge({ status }: { status: string }) {
  const config = {
    active: { bg: 'bg-secondary', text: 'text-foreground', label: 'Ativo' },
    risk: { bg: 'bg-secondary', text: 'text-muted-foreground', label: 'Risco' },
    critical: { bg: 'bg-danger-light', text: 'text-danger-foreground', label: 'Crítico' },
  }[status] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Normal' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
