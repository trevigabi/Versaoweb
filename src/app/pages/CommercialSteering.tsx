import { useState } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { Route, ListOrdered, Brain, Search, ChevronRight } from 'lucide-react';

const modules = [
  {
    icon: Route,
    name: 'Replanejamento estratégico',
    description: 'Defina as prioridades que irão influenciar automaticamente a ordem das rotas recomendadas para os representantes.',
    badge: '3 regras ativas',
    href: '/direcionamento',
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
];

export function CommercialSteering() {
  const [search, setSearch] = useState('');

  const filtered = modules.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Direcionamento comercial"
        description="Configure como a IA orienta os representantes em campo."
      />

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          strokeWidth={1.5}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar módulo..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Módulo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Instruções ativas
              </th>
              <th className="px-6 py-3 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-14 text-center text-sm text-muted-foreground">
                  Nenhum módulo encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((mod) => {
                const Icon = mod.icon;
                return (
                  <tr key={mod.name} className="group hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{mod.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{mod.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success-foreground">
                        {mod.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={mod.href} className="flex items-center justify-end">
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
