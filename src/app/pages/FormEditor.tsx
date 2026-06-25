import { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  Eye, GripVertical, Type, ListChecks, CheckSquare,
  Camera, Pencil, Trash2, Info, ToggleLeft,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

type FieldType = 'text' | 'boolean' | 'choice' | 'photo' | 'checklist';
type FormStatus = 'Ativo' | 'Rascunho';

interface FormFieldData {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}

interface FormData {
  name: string;
  status: FormStatus;
  responses: number;
  lastPublished: string;
  fields: FormFieldData[];
}

const FORMS_DATA: Record<string, FormData> = {
  '1': {
    name: 'Visita padrão',
    status: 'Ativo',
    responses: 142,
    lastPublished: '2 dias atrás',
    fields: [
      { id: 'f1', label: 'Observações da visita', type: 'text', required: true },
      { id: 'f2', label: 'Cliente estava aberto?', type: 'boolean', required: true },
      { id: 'f3', label: 'Nível de estoque', type: 'choice', required: false },
      { id: 'f4', label: 'Foto da fachada', type: 'photo', required: true },
    ],
  },
  '2': {
    name: 'Auditoria de PDV',
    status: 'Ativo',
    responses: 89,
    lastPublished: '1 semana atrás',
    fields: [
      { id: 'f1', label: 'Organização do PDV', type: 'choice', required: true },
      { id: 'f2', label: 'Produtos em ruptura', type: 'boolean', required: true },
      { id: 'f3', label: 'Observações gerais', type: 'text', required: false },
      { id: 'f4', label: 'Foto da gôndola', type: 'photo', required: true },
    ],
  },
  '3': {
    name: 'Prospecção',
    status: 'Rascunho',
    responses: 0,
    lastPublished: '—',
    fields: [
      { id: 'f1', label: 'Potencial do cliente', type: 'choice', required: true },
      { id: 'f2', label: 'Observações iniciais', type: 'text', required: false },
    ],
  },
};

const NEW_FORM: FormData = {
  name: 'Novo formulário',
  status: 'Rascunho',
  responses: 0,
  lastPublished: '—',
  fields: [],
};

const FIELD_TYPE_META: Record<
  FieldType,
  { label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }
> = {
  text: { label: 'Texto longo', icon: Type },
  boolean: { label: 'Sim/Não', icon: ToggleLeft },
  choice: { label: 'Múltipla escolha', icon: ListChecks },
  photo: { label: 'Foto', icon: Camera },
  checklist: { label: 'Checklist', icon: CheckSquare },
};

const ADD_FIELD_OPTIONS: {
  type: FieldType;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { type: 'text', label: 'Texto', icon: Type },
  { type: 'choice', label: 'Múltipla escolha', icon: ListChecks },
  { type: 'checklist', label: 'Checklist', icon: CheckSquare },
  { type: 'photo', label: 'Foto', icon: Camera },
];

const STATUS_STYLES: Record<FormStatus, React.CSSProperties> = {
  Ativo:    { backgroundColor: '#FDF2F2', color: '#BE1520' },
  Rascunho: { backgroundColor: '#F5F5F4', color: '#44403C' },
};

const DEFAULT_SETTINGS = [
  {
    id: 'requirePhoto',
    label: 'Obrigar foto da fachada',
    description: 'Rep não pode finalizar sem enviar foto',
    active: true,
  },
  {
    id: 'allowOffline',
    label: 'Permitir visita offline',
    description: 'Dados sincronizam ao reconectar',
    active: true,
  },
  {
    id: 'requireGeo',
    label: 'Exigir geolocalização',
    description: 'Formulário só abre dentro do raio do cliente',
    active: false,
  },
  {
    id: 'alertManager',
    label: 'Alertar gestor em visitas incompletas',
    description: 'Notifica quando o rep sai sem finalizar',
    active: true,
  },
];

export function FormEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'novo';
  const formData = isNew ? NEW_FORM : (FORMS_DATA[id] ?? NEW_FORM);

  const [fields, setFields] = useState<FormFieldData[]>(formData.fields);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [publication, setPublication] = useState({ allReps: true, southOnly: false });

  const requiredCount = fields.filter((f) => f.required).length;
  const optionalCount = fields.filter((f) => !f.required).length;

  const removeField = (fieldId: string) =>
    setFields((prev) => prev.filter((f) => f.id !== fieldId));

  const addField = (type: FieldType) => {
    setFields((prev) => [
      ...prev,
      { id: `f${Date.now()}`, label: `Novo campo ${prev.length + 1}`, type, required: false },
    ]);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link
          to="/form-builder"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Formulários de visita
        </Link>
        <span className="text-muted-foreground">›</span>
        <span className="text-foreground">{formData.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-3xl font-semibold text-foreground truncate">{formData.name}</h1>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
          style={STATUS_STYLES[formData.status]}
          >
            {formData.status}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Detalhes — Popover */}
          <Popover open={detailsOpen} onOpenChange={setDetailsOpen}>
            <PopoverTrigger asChild>
              <button
                className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors ${
                  detailsOpen
                    ? 'bg-secondary border-primary text-primary'
                    : 'border-border hover:bg-secondary text-foreground'
                }`}
              >
                <Info className="w-4 h-4" strokeWidth={1.5} />
                Detalhes
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="end">
              {/* Resumo */}
              <div className="px-4 py-4 border-b border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Resumo
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Total de campos', value: fields.length },
                    { label: 'Obrigatórios', value: requiredCount },
                    { label: 'Opcionais', value: optionalCount },
                    { label: 'Respostas coletadas', value: formData.responses },
                    { label: 'Última publicação', value: formData.lastPublished },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Publicação */}
              <div className="px-4 py-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Publicação
                </div>
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-foreground">Todos os representantes</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Visível para toda a força de vendas
                      </div>
                    </div>
                    <Switch
                      checked={publication.allReps}
                      onCheckedChange={(v) =>
                        setPublication((p) => ({ ...p, allReps: v }))
                      }
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-foreground">Apenas região Sul</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Restringir por região
                      </div>
                    </div>
                    <Switch
                      checked={publication.southOnly}
                      onCheckedChange={(v) =>
                        setPublication((p) => ({ ...p, southOnly: v }))
                      }
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">
            <Eye className="w-4 h-4" strokeWidth={1.5} />
            Preview
          </button>
<button className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
            Publicar alterações
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campos">
        <TabsList>
          <TabsTrigger value="campos">Campos</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        {/* Tab — Campos */}
        <TabsContent value="campos">
          <div className="pt-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Subheader */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-secondary/50">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Sequência de campos
                </span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GripVertical className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Arraste para reordenar
                </div>
              </div>

              {/* Fields */}
              <div className="divide-y divide-border">
                {fields.length === 0 ? (
                  <div className="px-6 py-12 text-center text-sm text-muted-foreground">
                    Nenhum campo adicionado ainda.
                  </div>
                ) : (
                  fields.map((field, index) => {
                    const { label: typeLabel, icon: TypeIcon } = FIELD_TYPE_META[field.type];
                    return (
                      <div
                        key={field.id}
                        className="group flex items-center gap-4 px-6 py-4 hover:bg-secondary/30 transition-colors"
                      >
                        <span className="text-xs font-medium text-muted-foreground w-4 text-right flex-shrink-0">
                          {index + 1}
                        </span>
                        <GripVertical
                          className="w-4 h-4 text-muted-foreground cursor-grab flex-shrink-0"
                          strokeWidth={1.5}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground">{field.label}</span>
                            {field.required ? (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                Obrigatório
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-secondary text-muted-foreground">
                                Opcional
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <TypeIcon className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                            <span className="text-xs text-muted-foreground">{typeLabel}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            title="Editar campo"
                            className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <button
                            title="Excluir campo"
                            onClick={() => removeField(field.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add field */}
              <div className="px-6 py-5 border-t border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Adicionar campo
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {ADD_FIELD_OPTIONS.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => addField(type)}
                      className="flex items-center gap-2.5 px-4 py-3 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors text-left"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab — Configurações */}
        <TabsContent value="configuracoes">
          <div className="pt-4 max-w-lg">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Configurações do formulário</h3>
              </div>
              <div className="divide-y divide-border">
                {settings.map((setting, i) => (
                  <div key={setting.id} className="flex items-center justify-between px-6 py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{setting.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{setting.description}</div>
                    </div>
                    <Switch
                      checked={setting.active}
                      onCheckedChange={(v) => {
                        const next = [...settings];
                        next[i] = { ...next[i], active: v };
                        setSettings(next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
