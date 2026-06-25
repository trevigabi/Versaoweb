import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Users, Bell, Smartphone, Trophy, Plus, Zap } from 'lucide-react';

const users = [
  { name: 'Ana Costa',      email: 'ana.costa@paceroute.com',      role: 'Admin',      region: 'Nacional',      status: 'Ativo' },
  { name: 'Bruno Silva',    email: 'bruno.silva@paceroute.com',    role: 'Gestor',     region: 'São Paulo',     status: 'Ativo' },
  { name: 'Carla Santos',   email: 'carla.santos@paceroute.com',   role: 'Regional',   region: 'Sul',           status: 'Ativo' },
  { name: 'Diego Oliveira', email: 'diego.oliveira@paceroute.com', role: 'Supervisor', region: 'Nordeste',      status: 'Ativo' },
  { name: 'Elisa Martins',  email: 'elisa.martins@paceroute.com',  role: 'Analista',   region: 'Centro-Oeste',  status: 'Ativo' },
  { name: 'Felipe Ramos',   email: 'felipe.ramos@paceroute.com',   role: 'Gestor',     region: 'Minas Gerais',  status: 'Inativo' },
];

const appUsage = [
  { name: 'Ana Costa',      email: 'ana.costa@paceroute.com',      role: 'Admin',      status: 'Ativo',   lastAccess: 'Hoje, 09:14',         platform: 'Web',    sessions: 42 },
  { name: 'Bruno Silva',    email: 'bruno.silva@paceroute.com',    role: 'Gestor',     status: 'Ativo',   lastAccess: 'Hoje, 08:47',         platform: 'Web',    sessions: 38 },
  { name: 'Carla Santos',   email: 'carla.santos@paceroute.com',   role: 'Regional',   status: 'Ativo',   lastAccess: 'Ontem, 17:22',        platform: 'Mobile', sessions: 61 },
  { name: 'Diego Oliveira', email: 'diego.oliveira@paceroute.com', role: 'Supervisor', status: 'Ativo',   lastAccess: 'Ontem, 14:05',        platform: 'Mobile', sessions: 29 },
  { name: 'Elisa Martins',  email: 'elisa.martins@paceroute.com',  role: 'Analista',   status: 'Ativo',   lastAccess: '19/06/2026, 11:30',   platform: 'Web',    sessions: 17 },
  { name: 'Felipe Ramos',   email: 'felipe.ramos@paceroute.com',   role: 'Gestor',     status: 'Inativo', lastAccess: '02/06/2026, 09:55',   platform: 'Web',    sessions: 4  },
  { name: 'Gabriela Nunes', email: 'gabriela.nunes@paceroute.com', role: 'Supervisor', status: 'Inativo', lastAccess: '28/05/2026, 16:40',   platform: 'Mobile', sessions: 2  },
  { name: 'Henrique Dias',  email: 'henrique.dias@paceroute.com',  role: 'Regional',   status: 'Ativo',   lastAccess: 'Hoje, 07:58',         platform: 'Mobile', sessions: 55 },
];

const notifications = [
  { trigger: 'Cliente sem visita há 45 dias',         action: 'Alerta de recuperação',  status: 'Ativo' },
  { trigger: 'Recompra atrasada em mais de 7 dias',   action: 'Priorização na rota',    status: 'Ativo' },
  { trigger: 'Score de saúde abaixo de 60',           action: 'Notificação ao gestor',  status: 'Ativo' },
  { trigger: 'Cliente premium sem visita há 15 dias', action: 'Alerta crítico',         status: 'Ativo' },
];

type Tab = 'usuarios' | 'notificacoes' | 'uso' | 'gamificacao';

export function Administration() {
  const [activeTab, setActiveTab] = useState<Tab>('usuarios');

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; soon?: boolean }[] = [
    { id: 'usuarios',     label: 'Usuários',     icon: Users },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'uso',          label: 'Uso do App',   icon: Smartphone },
    { id: 'gamificacao',  label: 'Gamificação',  icon: Trophy, soon: true },
  ];

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Configurações"
        description="Gestão de usuários, notificações e preferências do sistema"
      />

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => !tab.soon && setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 pb-3 pt-1 text-sm font-medium transition-colors relative ${
                  active
                    ? 'text-primary border-b-2 border-primary'
                    : tab.soon
                    ? 'text-muted-foreground/50 cursor-default'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {tab.label}
                {tab.soon && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-secondary text-muted-foreground">
                    Em breve
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab: Usuários */}
      {activeTab === 'usuarios' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Usuários e Permissões</h3>
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Novo Usuário
            </button>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Perfil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Região</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.region}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Ativo' ? 'bg-success-light text-success-foreground' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-primary hover:text-primary-hover font-medium">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Notificações */}
      {activeTab === 'notificacoes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notificações</h3>
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Nova Notificação
            </button>
          </div>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {notifications.map((item, i) => (
              <div key={i} className="p-5 hover:bg-secondary/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-medium text-foreground">{item.trigger}</span>
                    </div>
                    <div className="text-sm text-muted-foreground ml-7">Ação: {item.action}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success-foreground">
                      {item.status}
                    </span>
                    <button className="text-sm text-primary hover:text-primary-hover font-medium">Editar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Uso do App */}
      {activeTab === 'uso' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Uso do App</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {appUsage.filter(u => u.status === 'Ativo').length} ativos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border" />
                {appUsage.filter(u => u.status === 'Inativo').length} inativos
              </span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Perfil</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Último acesso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Plataforma</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Sessões / 30d</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appUsage.map((user) => (
                  <tr key={user.email} className={`transition-colors ${user.status === 'Inativo' ? 'opacity-60' : 'hover:bg-secondary/50'}`}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
                    </td>
                    <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Ativo' ? 'bg-success-light text-success-foreground' : 'bg-secondary text-muted-foreground'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-success' : 'bg-muted-foreground'}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.lastAccess}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Smartphone className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {user.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-semibold tabular-nums ${
                        user.sessions >= 10 ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {user.sessions}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    Admin:      'bg-danger-light text-danger-foreground',
    Gestor:     'bg-secondary text-foreground',
    Regional:   'bg-secondary text-foreground',
    Supervisor: 'bg-secondary text-foreground',
    Analista:   'bg-secondary text-muted-foreground',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${colors[role] || 'bg-secondary text-foreground'}`}>
      {role}
    </span>
  );
}
