import { Outlet, NavLink } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardCheck,
  Search,
  Bell,
  User,
  Target,
  FileText,
  Compass,
  Flag,
} from 'lucide-react';

const navigationGroups = [
  {
    label: 'INDICADORES',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Cobertura', href: '/coverage', icon: Target },
      { name: 'Metas', href: '/goals', icon: Flag },
    ],
  },
  {
    label: 'OPERAÇÃO',
    items: [
      { name: 'Representantes', href: '/representatives', icon: Users },
      { name: 'Clientes', href: '/clients', icon: Building2 },
      { name: 'Radar de Atenção', href: '/field-audit', icon: ClipboardCheck },
    ],
  },
  {
    label: 'GERENCIADOR',
    items: [
      { name: 'Configurações', href: '/administration', icon: Users },
      { name: 'Formulários', href: '/form-builder', icon: FileText },
      { name: 'Direcionamento', href: '/steering', icon: Compass },
    ],
  },
];

export function Layout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">PR</span>
            </div>
            <div>
              <div className="font-semibold text-sidebar-foreground">Pace Route</div>
              <div className="text-xs text-muted-foreground">Manager</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          {navigationGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex > 0 ? 'mt-6' : ''}>
              <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground tracking-wider">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-sm">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">
                Admin User
              </div>
              <div className="text-xs text-muted-foreground">Gestor</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Busca global..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
