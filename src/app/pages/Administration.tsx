import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Search, Plus, Pencil, Shield, Ban, CheckCircle2 } from 'lucide-react';

type Role = 'Administrador' | 'Gestor' | 'Analista';
type Status = 'Ativo' | 'Inativo';

interface User {
  name: string;
  email: string;
  role: Role;
  region: string;
  lastAccess: string;
  status: Status;
}

const USERS: User[] = [
  { name: 'Ana Costa', email: 'ana.costa@paceroute.com', role: 'Administrador', region: 'Nacional', lastAccess: 'Hoje, 09:41', status: 'Ativo' },
  { name: 'Bruno Silva', email: 'bruno.silva@paceroute.com', role: 'Gestor', region: 'São Paulo', lastAccess: 'Ontem, 17:22', status: 'Ativo' },
  { name: 'Carla Santos', email: 'carla.santos@paceroute.com', role: 'Analista', region: 'Sul', lastAccess: '3 dias atrás', status: 'Ativo' },
  { name: 'Diego Oliveira', email: 'diego.oliveira@paceroute.com', role: 'Gestor', region: 'Nordeste', lastAccess: '1 semana atrás', status: 'Inativo' },
];

const ROLE_STYLES: Record<Role, string> = {
  Administrador: 'bg-secondary text-muted-foreground',
  Gestor: 'bg-secondary text-muted-foreground',
  Analista: 'bg-secondary text-muted-foreground',
};

const FILTER_OPTIONS: Array<Role | 'Todos'> = ['Todos', 'Administrador', 'Gestor', 'Analista'];

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Administration() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Role | 'Todos'>('Todos');

  const filtered = USERS.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = activeFilter === 'Todos' || u.role === activeFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Usuários"
        description="Gerencie acessos e permissões do portal gerencial"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Novo usuário
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-72 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou e-mail..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-1">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === option
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <span className="text-sm text-muted-foreground flex-shrink-0">
          {filtered.length} {filtered.length === 1 ? 'usuário' : 'usuários'}
        </span>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Perfil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Região
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Último acesso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 w-28" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-sm text-muted-foreground">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.email} className="group hover:bg-secondary/50 transition-colors">
                  {/* Usuário */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${ROLE_STYLES[user.role]}`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  {/* Perfil */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_STYLES[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  {/* Região */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.region}</td>
                  {/* Último acesso */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.lastAccess}</td>
                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: user.status === 'Ativo' ? '#3B6D11' : 'var(--muted-foreground)' }}
                      />
                      <span className="text-sm text-foreground">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  {/* Ações */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ActionButton icon={Pencil} label="Editar usuário" />
                      <ActionButton icon={Shield} label="Gerenciar permissões" />
                      {user.status === 'Ativo' ? (
                        <ActionButton icon={Ban} label="Desativar" danger />
                      ) : (
                        <ActionButton icon={CheckCircle2} label="Reativar" />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  danger = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      title={label}
      className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
        danger
          ? 'text-muted-foreground hover:bg-[#FCEBEB] hover:text-[#A32D2D]'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
    </button>
  );
}
