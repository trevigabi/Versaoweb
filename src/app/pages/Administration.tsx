import { PageHeader } from '../components/PageHeader';
import { Users, Shield, FileText, Zap, Trophy, Megaphone, Plus } from 'lucide-react';

const userRoles = [
  { name: 'Admin', count: 3, color: 'bg-danger' },
  { name: 'Gestor', count: 8, color: 'bg-primary' },
  { name: 'Regional', count: 12, color: 'bg-ai-accent' },
  { name: 'Supervisor', count: 24, color: 'bg-success' },
  { name: 'Analista', count: 15, color: 'bg-warning' },
];

const users = [
  {
    name: 'Ana Costa',
    email: 'ana.costa@paceroute.com',
    role: 'Admin',
    region: 'Nacional',
    status: 'Ativo',
  },
  {
    name: 'Bruno Silva',
    email: 'bruno.silva@paceroute.com',
    role: 'Gestor',
    region: 'São Paulo',
    status: 'Ativo',
  },
  {
    name: 'Carla Santos',
    email: 'carla.santos@paceroute.com',
    role: 'Regional',
    region: 'Sul',
    status: 'Ativo',
  },
  {
    name: 'Diego Oliveira',
    email: 'diego.oliveira@paceroute.com',
    role: 'Supervisor',
    region: 'Nordeste',
    status: 'Ativo',
  },
];

const aiRules = [
  {
    trigger: 'Cliente sem visita há 45 dias',
    action: 'Alerta de recuperação',
    status: 'Ativo',
  },
  {
    trigger: 'Recompra atrasada em mais de 7 dias',
    action: 'Priorização na rota',
    status: 'Ativo',
  },
  {
    trigger: 'Score de saúde abaixo de 60',
    action: 'Notificação ao gestor',
    status: 'Ativo',
  },
  {
    trigger: 'Cliente premium sem visita há 15 dias',
    action: 'Alerta crítico',
    status: 'Ativo',
  },
];

export function Administration() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Administração"
        description="Gestão técnica e configurações do sistema"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {userRoles.map((role) => (
          <div key={role.name} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
              <div className="text-sm text-muted-foreground">{role.name}</div>
            </div>
            <div className="text-2xl font-semibold text-foreground">{role.count}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-8">
          {[
            { label: 'Usuários', icon: Users },
            { label: 'Escopo de Dados', icon: Shield },
            { label: 'Formulários', icon: FileText },
            { label: 'Regras IA', icon: Zap },
          ].map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                className={`pb-4 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                  index === 0
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Users Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Usuários e Permissões</h3>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Novo Usuário
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Perfil
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Região
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.region}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success-foreground">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-primary hover:text-primary-hover font-medium">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Rules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Regras de Inteligência</h3>
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Nova Regra
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {aiRules.map((rule, index) => (
            <div key={index} className="p-5 hover:bg-secondary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-4 h-4 text-ai-accent" strokeWidth={1.5} />
                    <span className="font-medium text-foreground">{rule.trigger}</span>
                  </div>
                  <div className="text-sm text-muted-foreground ml-7">
                    Ação: {rule.action}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-light text-success-foreground">
                    {rule.status}
                  </span>
                  <button className="text-sm text-primary hover:text-primary-hover font-medium">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeaturePlaceholder
          icon={Trophy}
          title="Gamificação"
          description="Sistema de desafios e recompensas"
          status="Em Breve"
        />
        <FeaturePlaceholder
          icon={Megaphone}
          title="Campanhas"
          description="Gestão de campanhas comerciais"
          status="Backlog"
        />
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    Admin: 'bg-danger-light text-danger-foreground',
    Gestor: 'bg-primary/10 text-primary',
    Regional: 'bg-ai-accent-light text-ai-accent',
    Supervisor: 'bg-success-light text-success-foreground',
    Analista: 'bg-warning-light text-warning-foreground',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
        colors[role] || 'bg-secondary text-foreground'
      }`}
    >
      {role}
    </span>
  );
}

function FeaturePlaceholder({
  icon: Icon,
  title,
  description,
  status,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="bg-card border border-dashed border-border rounded-lg p-6 opacity-60">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
            <Icon className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex-1">
          <div className="font-medium text-foreground mb-1">{title}</div>
          <div className="text-sm text-muted-foreground mb-3">{description}</div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
