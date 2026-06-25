import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Users, Bell, Smartphone, Trophy, Plus, Zap, Sparkles, Search, CornerDownLeft } from 'lucide-react';

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

const AI_NOTIFICATION_SUGGESTIONS = [
  { id: 'n1', name: 'Recuperação de inativos',        description: 'Foco em clientes sem compra nos últimos 90 dias',          action: 'Alerta de recuperação ao representante', match: 98, icon: 'refresh' },
  { id: 'n2', name: 'Alerta de churn',                description: 'Clientes com sinal de perda de frequência de pedidos',      action: 'Priorização na rota + aviso ao gestor',   match: 74, icon: 'warning' },
  { id: 'n3', name: 'Retenção de carteira',           description: 'Proteger clientes ativos com menor margem de queda',        action: 'Inserir como prioridade máxima na rota',  match: 61, icon: 'users' },
  { id: 'n4', name: 'Visita muito curta detectada',   description: 'Duração de visita abaixo de 5 minutos sem justificativa',   action: 'Sinalizar para revisão de qualidade',     match: 55, icon: 'clock' },
  { id: 'n5', name: 'Cobertura territorial baixa',    description: 'Carteira com cobertura abaixo de 60% no ciclo atual',       action: 'Notificação ao representante e gestor',   match: 48, icon: 'map' },
  { id: 'n6', name: 'Marca sem pedido recente',       description: 'Linha de produto sem pedido há mais de 60 dias na carteira', action: 'Incluir no briefing da próxima visita',  match: 42, icon: 'tag' },
  { id: 'n7', name: 'Rota não executada',             description: 'Desvio de rota detectado sem justificativa registrada',      action: 'Solicitar justificativa via app',         match: 38, icon: 'warning' },
  { id: 'n8', name: 'Score de saúde crítico',         description: 'Cliente com indicadores combinados de risco elevado',        action: 'Alerta crítico ao gestor imediato',       match: 35, icon: 'users' },
];

type Tab = 'usuarios' | 'notificacoes' | 'uso' | 'gamificacao';

export function Administration() {
  const [activeTab, setActiveTab] = useState<Tab>('usuarios');
  const [notifSearch, setNotifSearch] = useState('');
  const [addedSuggestions, setAddedSuggestions] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [usageSearch, setUsageSearch] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.region.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredUsage = appUsage.filter(u =>
    u.name.toLowerCase().includes(usageSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(usageSearch.toLowerCase())
  );

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
        actions={
          activeTab === 'usuarios' ? (
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Novo Usuário
            </button>
          ) : activeTab === 'notificacoes' ? (
            <button className="px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Nova notificação
            </button>
          ) : undefined
        }
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Buscar usuário..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
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
                {filteredUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.region}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Ativo' ? 'bg-secondary text-foreground' : 'bg-secondary text-muted-foreground'
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
        <div className="space-y-5">

          {/* Search — IA ranqueia sugestões */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
              <input
                type="text"
                value={notifSearch}
                onChange={e => setNotifSearch(e.target.value)}
                placeholder="Descreva o que deseja notificar... ex: recuperar clientes inativos"
                className="flex-1 text-sm bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1 px-2 py-1 rounded border border-border text-[11px] text-muted-foreground flex-shrink-0">
                <CornerDownLeft className="w-3 h-3" strokeWidth={1.5} />
              </div>
            </div>

            {/* Results */}
            {(() => {
              const results = AI_NOTIFICATION_SUGGESTIONS
                .filter(s => !addedSuggestions.includes(s.id))
                .filter(s => !notifSearch || s.name.toLowerCase().includes(notifSearch.toLowerCase()) || s.description.toLowerCase().includes(notifSearch.toLowerCase()))
                .sort((a, b) => b.match - a.match);

              if (results.length === 0 && notifSearch) {
                return (
                  <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                    Nenhuma sugestão encontrada. Tente outros termos ou crie uma notificação manual.
                  </div>
                );
              }

              return (
                <>
                  <div className="divide-y divide-border">
                    {(notifSearch ? results : results.slice(0, 4)).map(s => {
                      const matchColor = s.match >= 80 ? '#059669' : s.match >= 60 ? '#B45309' : 'var(--muted-foreground)';
                      const matchBg = s.match >= 80 ? '#D1FAE5' : s.match >= 60 ? '#FEF3C7' : 'var(--secondary)';
                      return (
                        <div key={s.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/40 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground">{s.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{s.description}</div>
                          </div>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: matchBg, color: matchColor }}>
                            {s.match}% match
                          </span>
                          <button
                            onClick={() => setAddedSuggestions(prev => [...prev, s.id])}
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2.5 py-1 text-xs font-medium border border-border rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex-shrink-0"
                          >
                            <Plus className="w-3 h-3" strokeWidth={2} />
                            Usar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5 border-t border-border bg-secondary/30">
                    <p className="text-[11px] text-muted-foreground">
                      A IA ranqueou <span className="font-semibold text-foreground">{AI_NOTIFICATION_SUGGESTIONS.length} notificações</span> pela relevância para o contexto atual da carteira
                    </p>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Active notifications */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Notificações ativas</h3>
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
                        {item.status}
                      </span>
                      <button className="text-sm text-primary hover:text-primary-hover font-medium">Editar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab: Uso do App */}
      {activeTab === 'uso' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={usageSearch}
              onChange={(e) => setUsageSearch(e.target.value)}
              placeholder="Buscar usuário..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
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
                {filteredUsage.map((user) => (
                  <tr key={user.email} className={`transition-colors ${user.status === 'Inativo' ? 'opacity-60' : 'hover:bg-secondary/50'}`}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
                    </td>
                    <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Ativo' ? 'bg-secondary text-foreground' : 'bg-secondary text-muted-foreground'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-primary' : 'bg-muted-foreground'}`} />
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
