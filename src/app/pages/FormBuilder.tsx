import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { Search, Plus, FileText, Copy, Trash2, ChevronRight } from 'lucide-react';

type FormStatus = 'Ativo' | 'Rascunho';

interface Form {
  id: string;
  name: string;
  description: string;
  status: FormStatus;
  fields: number;
  required: number;
  responses: number | null;
  updatedAt: string;
}

const FORMS: Form[] = [
  {
    id: '1',
    name: 'Visita padrão',
    description: 'Formulário padrão para visitas rotineiras',
    status: 'Ativo',
    fields: 8,
    required: 3,
    responses: 142,
    updatedAt: '2 dias atrás',
  },
  {
    id: '2',
    name: 'Auditoria de PDV',
    description: 'Checklist completo para auditoria de ponto de venda',
    status: 'Ativo',
    fields: 12,
    required: 6,
    responses: 89,
    updatedAt: '1 semana atrás',
  },
  {
    id: '3',
    name: 'Prospecção',
    description: 'Formulário para visitas a novos clientes',
    status: 'Rascunho',
    fields: 6,
    required: 4,
    responses: null,
    updatedAt: '3 dias atrás',
  },
];

const STATUS_STYLES: Record<FormStatus, React.CSSProperties> = {
  Ativo:    { backgroundColor: '#EAF3DE', color: '#3B6D11' },
  Rascunho: { backgroundColor: '#FAEEDA', color: '#854F0B' },
};

type Filter = 'Todos' | 'Ativos' | 'Rascunhos';
const FILTERS: Filter[] = ['Todos', 'Ativos', 'Rascunhos'];

export function FormBuilder() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('Todos');

  const filtered = FORMS.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === 'Todos' ||
      (activeFilter === 'Ativos' && f.status === 'Ativo') ||
      (activeFilter === 'Rascunhos' && f.status === 'Rascunho');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Formulários de visita"
        description="Gerencie os questionários preenchidos pelos representantes durante as visitas"
        actions={
          <button
            onClick={() => navigate('/form-builder/novo')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Novo formulário
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-64 flex-shrink-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar formulário..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <span className="text-sm text-muted-foreground flex-shrink-0">
          {filtered.length} {filtered.length === 1 ? 'formulário' : 'formulários'}
        </span>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Formulário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Campos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Respostas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Atualizado
              </th>
              <th className="px-6 py-3 w-28" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-sm text-muted-foreground">
                  Nenhum formulário encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((form) => (
                <tr
                  key={form.id}
                  onClick={() => navigate(`/form-builder/${form.id}`)}
                  className="group hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  {/* Formulário */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{form.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{form.description}</div>
                      </div>
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={STATUS_STYLES[form.status]}
                    >
                      {form.status}
                    </span>
                  </td>
                  {/* Campos */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{form.fields} campos</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{form.required} obrigatórios</div>
                  </td>
                  {/* Respostas */}
                  <td className="px-6 py-4 text-sm text-foreground">
                    {form.responses !== null ? form.responses : '—'}
                  </td>
                  {/* Atualizado */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">{form.updatedAt}</td>
                  {/* Ações */}
                  <td className="px-6 py-4">
                    <div
                      className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActionButton icon={Copy} label="Duplicar" />
                      <RowActionButton icon={Trash2} label="Excluir" danger />
                      <ChevronRight
                        className="w-4 h-4 text-muted-foreground ml-1 flex-shrink-0"
                        strokeWidth={1.5}
                      />
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

function RowActionButton({
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
