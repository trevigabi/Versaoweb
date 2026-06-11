import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { CheckCircle, Route, ListOrdered, Brain, Trophy, MapPin } from 'lucide-react';

const modules = [
  {
    icon: Route,
    name: 'Direcionamento de rota',
    description: 'Otimização automática de percurso diário',
    badge: '3 regras ativas',
    href: '/steering/route',
  },
  {
    icon: ListOrdered,
    name: 'Prioridade de clientes',
    description: 'Ordenação inteligente por potencial e risco',
    badge: '2 grupos configurados',
    href: '/steering/priority',
  },
  {
    icon: Brain,
    name: 'Briefing estratégico',
    description: 'Contexto e orientações antes de cada visita',
    badge: '1 instrução ativa',
    href: '/steering/briefing',
  },
  {
    icon: Trophy,
    name: 'Missões ativas',
    description: 'Objetivos táticos em andamento no campo',
    badge: '2 missões rodando',
    href: '/steering/missions',
  },
  {
    icon: MapPin,
    name: 'Territórios',
    description: 'Gestão e visualização de territórios de venda',
    badge: 'Ver territórios',
    href: '/territories',
  },
];

export function CommercialSteering() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Direcionamento comercial"
        description="Configure como a IA orienta os representantes em campo."
      />

      {/* Summary indicator */}
      <div className="flex items-center gap-2 text-sm text-foreground">
        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" strokeWidth={2} />
        <span>8 configurações ativas em 4 módulos</span>
      </div>

      {/* Modules table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto] items-center px-6 py-3 border-b border-border bg-secondary/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Módulo
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-44 text-center">
            Instruções ativas
          </span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-border">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.name}
                to={mod.href}
                className="grid grid-cols-[1fr_auto] items-center px-6 py-4 hover:bg-secondary/30 transition-colors"
              >
                {/* Left: icon + name + description */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">{mod.name}</div>
                    <div className="text-xs text-muted-foreground">{mod.description}</div>
                  </div>
                </div>

                {/* Badge */}
                <div className="w-44 flex justify-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/15 text-success">
                    {mod.badge}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
