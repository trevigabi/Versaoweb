import { useParams, Link } from 'react-router';
import { ArrowLeft, TrendingUp, Calendar, Camera, Store, X, ExternalLink, AlertTriangle, ArrowDown } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export function ClientProfile() {
  const { id } = useParams();

  const interactions = [
    {
      date: '28/05/2026',
      type: 'Visita',
      representative: 'Carlos Silva',
      duration: '18min',
      notes: 'Cliente solicitou apresentação de novos produtos linha premium',
    },
    {
      date: '15/05/2026',
      type: 'Visita',
      representative: 'Carlos Silva',
      duration: '15min',
      notes: 'Pedido regular reabastecimento',
    },
    {
      date: '02/05/2026',
      type: 'Visita',
      representative: 'Carlos Silva',
      duration: '22min',
      notes: 'Negociação condições pagamento e volumes',
    },
    {
      date: '28/04/2026',
      type: 'Visita',
      representative: 'Carlos Silva',
      duration: '20min',
      notes: 'Apresentação de novos lançamentos da coleção',
    },
    {
      date: '12/04/2026',
      type: 'Visita',
      representative: 'Carlos Silva',
      duration: '16min',
      notes: 'Acompanhamento de rotina',
    },
  ];

  const purchaseData = [28, 32, 35, 38, 42, 45, 48, 44, 46, 50, 47, 45]; // Last 12 months

  return (
    <div className="p-8 space-y-8">
      <Link
        to="/clients"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        Voltar para Clientes
      </Link>

      {/* Header with Client Info Dialog */}
      <div className="flex items-center gap-3">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-semibold text-foreground">Supermercado Estrela</h1>
                <p className="text-sm text-muted-foreground">Premium • São Paulo - Capital</p>
              </div>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-6 w-full max-w-md z-50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-semibold text-foreground">
                  Informações do Cliente
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </Dialog.Close>
              </div>

              <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-border">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-primary">SE</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Supermercado Estrela</h2>
                <div className="text-sm text-muted-foreground mb-3">Premium • São Paulo - Capital</div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-light text-success-foreground">
                  Cliente desde jan 2023
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CNPJ</span>
                  <span className="text-foreground">12.345.678/0001-90</span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground">Endereço</span>
                  <a
                    href="https://maps.google.com/?q=Av.+Paulista+1000+São+Paulo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover flex items-center gap-1"
                  >
                    <span className="text-right">Av. Paulista, 1000<br />São Paulo - SP</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Horário de atendimento</span>
                  <span className="text-foreground">08h - 18h</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-border">
                  <span className="text-muted-foreground">Comprador principal</span>
                  <span className="text-foreground font-medium">João Santos</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="text-foreground">(11) 98765-4321</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">contato@estrela.com.br</span>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* KPIs - 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Receita Mensal</div>
          <div className="text-2xl font-semibold text-foreground">R$ 45.2K</div>
          <div className="text-xs text-success mt-1">+8.5% vs mês anterior</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Frequência de Visita</div>
          <div className="text-2xl font-semibold text-foreground">Alta</div>
          <div className="text-xs text-muted-foreground mt-1">A cada 7 dias</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Score de Saúde</div>
          <div className="text-2xl font-semibold text-success">Excelente</div>
          <div className="text-xs text-muted-foreground mt-1">95/100</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Última Visita</div>
          <div className="text-2xl font-semibold text-foreground">2 dias</div>
          <div className="text-xs text-muted-foreground mt-1">28/05/2026</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Risco de Perda</div>
          <div className="text-2xl font-semibold text-success">12%</div>
          <div className="text-xs text-success mt-1 flex items-center gap-1">
            <ArrowDown className="w-3 h-3" strokeWidth={2} />
            -3pp vs mês anterior
          </div>
        </div>
      </div>

      {/* Financial Position */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">Posição Financeira</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Limite Total</div>
            <div className="text-3xl font-semibold text-foreground">R$ 150.000</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Disponível</div>
            <div className="text-3xl font-semibold text-success">R$ 104.800</div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Utilizado</span>
                <span>70%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Purchase Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">Compras Mensais — Últimos 12 meses</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {purchaseData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <div
                className="w-full bg-primary/20 rounded-t hover:bg-primary transition-colors cursor-pointer"
                style={{ height: `${(value / Math.max(...purchaseData)) * 100}%` }}
              ></div>
              <div className="text-xs text-muted-foreground font-medium">
                {['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visit Photos */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">Fotos de Visita</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-secondary rounded-lg flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
            >
              <Camera className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </div>

      {/* Last 5 Interactions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-6">Últimas 5 Interações</h3>
        <div className="space-y-4">
          {interactions.map((interaction, index) => (
            <div
              key={index}
              className="flex gap-4 pb-4 border-b border-border last:border-0"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div className="font-medium text-foreground">{interaction.type}</div>
                  <div className="text-sm text-muted-foreground">{interaction.date}</div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {interaction.representative} • {interaction.duration}
                </div>
                <div className="text-sm text-foreground">{interaction.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
