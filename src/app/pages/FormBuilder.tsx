import { PageHeader } from '../components/PageHeader';
import { Plus, GripVertical, Type, CheckSquare, Camera, ListChecks } from 'lucide-react';

const forms = [
  {
    id: '1',
    name: 'Visita Padrão',
    fields: 8,
    mandatory: 3,
    lastUpdated: '2 dias atrás',
    status: 'active',
  },
  {
    id: '2',
    name: 'Auditoria de PDV',
    fields: 12,
    mandatory: 6,
    lastUpdated: '1 semana atrás',
    status: 'active',
  },
  {
    id: '3',
    name: 'Prospecção',
    fields: 6,
    mandatory: 4,
    lastUpdated: '3 dias atrás',
    status: 'draft',
  },
];

const fieldTypes = [
  { icon: Type, label: 'Texto', type: 'text' },
  { icon: CheckSquare, label: 'Múltipla Escolha', type: 'choice' },
  { icon: ListChecks, label: 'Checklist', type: 'checklist' },
  { icon: Camera, label: 'Foto', type: 'photo' },
];

export function FormBuilder() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Formulários de Visita"
        description="Configure questionários personalizados para cada tipo de visita"
        actions={
          <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Novo Formulário
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Form List */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-foreground mb-4">Formulários</h3>
          <div className="space-y-3">
            {forms.map((form, index) => (
              <button
                key={form.id}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  index === 0
                    ? 'bg-primary/5 border-primary'
                    : 'bg-card border-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-foreground">{form.name}</div>
                  <StatusBadge status={form.status} />
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{form.fields} campos • {form.mandatory} obrigatórios</div>
                  <div>{form.lastUpdated}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Builder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Visita Padrão</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
                  Preview
                </button>
                <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
                  Publicar
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-3 mb-6">
              <FormField
                label="Observações da Visita"
                type="Texto longo"
                required={true}
              />
              <FormField
                label="Cliente estava aberto?"
                type="Sim/Não"
                required={true}
              />
              <FormField
                label="Nível de Estoque"
                type="Múltipla escolha"
                required={false}
              />
              <FormField
                label="Foto da Fachada"
                type="Foto"
                required={true}
              />
            </div>

            {/* Add Field */}
            <div className="border-t border-border pt-6">
              <div className="text-sm font-medium text-foreground mb-3">
                Adicionar Campo
              </div>
              <div className="grid grid-cols-2 gap-3">
                {fieldTypes.map((field) => {
                  const Icon = field.icon;
                  return (
                    <button
                      key={field.type}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-foreground">
                        {field.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-medium text-foreground mb-4">Configurações</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Obrigar foto da fachada
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Representante não pode finalizar sem foto
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Permitir visita offline
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Dados sincronizam quando conectar
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  type,
  required,
}: {
  label: string;
  type: string;
  required: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg group hover:bg-accent transition-colors">
      <GripVertical
        className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
        strokeWidth={1.5}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {required && (
            <span className="px-1.5 py-0.5 text-xs bg-danger-light text-danger-foreground rounded">
              Obrigatório
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{type}</div>
      </div>
      <button className="text-sm text-muted-foreground hover:text-foreground">
        Editar
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    active: { bg: 'bg-success-light', text: 'text-success-foreground', label: 'Ativo' },
    draft: { bg: 'bg-warning-light', text: 'text-warning-foreground', label: 'Rascunho' },
  }[status] || { bg: 'bg-secondary', text: 'text-foreground', label: 'Inativo' };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
