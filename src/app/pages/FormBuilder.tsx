import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import {
  Plus, MoreVertical, Calendar, Type, ListChecks, CheckSquare, Camera, Search,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormStatus = 'Ativo' | 'Rascunho' | 'Inativo';

interface FormItem {
  id: string;
  name: string;
  description: string;
  fieldCount: number;
  requiredCount: number;
  status: FormStatus;
  updatedAt: string;
  responses: number;
  fieldTypes: ('text' | 'choice' | 'checklist' | 'photo')[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_FORMS: FormItem[] = [
  {
    id: '1',
    name: 'Visita Padrão',
    description: 'Checklist padrão para visitas comerciais regulares',
    fieldCount: 8,
    requiredCount: 3,
    status: 'Ativo',
    updatedAt: '2 dias atrás',
    responses: 142,
    fieldTypes: ['text', 'choice', 'photo'],
  },
  {
    id: '2',
    name: 'Auditoria de PDV',
    description: 'Verificação de presença e organização no ponto de venda',
    fieldCount: 12,
    requiredCount: 6,
    status: 'Ativo',
    updatedAt: '1 semana atrás',
    responses: 89,
    fieldTypes: ['choice', 'text', 'photo'],
  },
  {
    id: '3',
    name: 'Prospecção',
    description: 'Formulário de qualificação para novos clientes',
    fieldCount: 6,
    requiredCount: 4,
    status: 'Rascunho',
    updatedAt: '3 dias atrás',
    responses: 0,
    fieldTypes: ['choice', 'text'],
  },
];

const STATUS_STYLES: Record<FormStatus, React.CSSProperties> = {
  Ativo:    { backgroundColor: '#FDF2F2', color: '#BE1520' },
  Rascunho: { backgroundColor: '#F5F5F4', color: '#44403C' },
  Inativo:  { border: '1px solid var(--border)', color: 'var(--muted-foreground)' },
};

const FIELD_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  text: Type,
  choice: ListChecks,
  checklist: CheckSquare,
  photo: Camera,
};

type Tab = 'Ativo' | 'Rascunho' | 'Inativo';
const TABS: Tab[] = ['Ativo', 'Rascunho', 'Inativo'];

// ── Component ─────────────────────────────────────────────────────────────────

export function FormBuilder() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('Ativo');
  const [forms, setForms] = useState(INITIAL_FORMS);
  const [search, setSearch] = useState('');

  const filtered = forms.filter(f =>
    f.status === tab &&
    (f.name.toLowerCase().includes(search.toLowerCase()) ||
     f.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = (id: string) => setForms(prev => prev.filter(f => f.id !== id));
  const handleDuplicate = (form: FormItem) => {
    const copy: FormItem = {
      ...form,
      id: String(Date.now()),
      name: `${form.name} (cópia)`,
      status: 'Rascunho',
      responses: 0,
      updatedAt: 'agora',
    };
    setForms(prev => [...prev, copy]);
  };

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Formulários de visita"
        description="Configure questionários personalizados para cada tipo de visita"
        actions={
          <button
            onClick={() => navigate('/form-builder/novo')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Novo formulário
          </button>
        }
      />

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-1">
          {TABS.map((t) => {
            const count = forms.filter(f => f.status === t).length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 pb-3 pt-1 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                  tab === t
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'Ativo' ? 'Ativos' : t === 'Rascunho' ? 'Rascunhos' : 'Inativos'}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                  tab === t ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                }`}>{count}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar formulário..."
          className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Formulário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Atualização</th>
              {tab === 'Ativo' && (
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Respostas</th>
              )}
              <th className="px-6 py-3 w-12" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-sm text-muted-foreground">
                  Nenhum formulário encontrado.
                </td>
              </tr>
            ) : filtered.map((form) => (
              <tr
                key={form.id}
                onClick={() => navigate(`/form-builder/${form.id}`)}
                className="hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {/* Formulário */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-foreground">{form.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{form.description}</div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {form.fieldTypes.map((ft) => {
                      const Icon = FIELD_TYPE_ICONS[ft];
                      return Icon ? <Icon key={ft} className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} /> : null;
                    })}
                  </div>
                </td>

                {/* Campos */}
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{form.fieldCount} campos</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{form.requiredCount} obrigatórios</div>
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

                {/* Atualização */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                    {form.updatedAt}
                  </div>
                </td>

                {/* Respostas (só na aba Ativo) */}
                {tab === 'Ativo' && (
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold tabular-nums text-foreground">{form.responses}</span>
                  </td>
                )}

                {/* Ações */}
                <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                        <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-1" align="end">
                      <button
                        onClick={() => navigate(`/form-builder/${form.id}`)}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDuplicate(form)}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                      >
                        Duplicar
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-red-50 transition-colors text-red-600"
                      >
                        Excluir
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'formulário' : 'formulários'}
      </p>
    </div>
  );
}
