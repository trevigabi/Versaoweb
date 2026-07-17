import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Switch } from '../components/ui/switch';
import { Plus, GripVertical, Pencil, Trash2, X, Check, Smartphone } from 'lucide-react';

interface VisitReason {
  id: string;
  label: string;
  active: boolean;
}

const INITIAL_REASONS: VisitReason[] = [
  { id: '1', label: 'Estabelecimento fechado', active: true },
  { id: '2', label: 'Cliente ausente', active: true },
  { id: '3', label: 'Sem interesse no momento', active: true },
  { id: '4', label: 'Fora do horário de atendimento', active: true },
  { id: '5', label: 'Endereço não localizado', active: true },
  { id: '6', label: 'Cliente pediu para retornar depois', active: true },
  { id: '7', label: 'Ponto de venda fechado temporariamente', active: false },
];

export function VisitReasons() {
  const [reasons, setReasons] = useState<VisitReason[]>(INITIAL_REASONS);
  const [newLabel, setNewLabel] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState('');

  const handleAdd = () => {
    const label = newLabel.trim();
    if (!label) return;
    setReasons(prev => [...prev, { id: String(Date.now()), label, active: true }]);
    setNewLabel('');
  };

  const handleToggle = (id: string) => {
    setReasons(prev => prev.map(r => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const handleDelete = (id: string) => {
    setReasons(prev => prev.filter(r => r.id !== id));
  };

  const startEdit = (reason: VisitReason) => {
    setEditingId(reason.id);
    setEditingLabel(reason.label);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingLabel('');
  };

  const saveEdit = () => {
    const label = editingLabel.trim();
    if (!label || !editingId) return cancelEdit();
    setReasons(prev => prev.map(r => (r.id === editingId ? { ...r, label } : r)));
    cancelEdit();
  };

  const activeCount = reasons.filter(r => r.active).length;

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <PageHeader
        title="Motivos de Não Visita"
        description="Configure os motivos rápidos exibidos no app quando um representante não realiza uma visita"
      />

      {/* Add new reason */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Novo motivo... ex: Cliente em férias"
            className="flex-1 px-3 py-2 bg-secondary border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleAdd}
            disabled={!newLabel.trim()}
            className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Reasons list */}
      <div className="bg-card border border-border rounded-lg divide-y divide-border overflow-hidden">
        {reasons.length === 0 ? (
          <div className="px-6 py-14 text-center text-sm text-muted-foreground">
            Nenhum motivo cadastrado.
          </div>
        ) : (
          reasons.map((reason) => (
            <div key={reason.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/30 transition-colors group">
              <GripVertical className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" strokeWidth={1.5} />

              {editingId === reason.id ? (
                <>
                  <input
                    autoFocus
                    type="text"
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    className="flex-1 px-3 py-1.5 bg-secondary border-0 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={saveEdit}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-primary hover:bg-secondary transition-colors flex-shrink-0"
                  >
                    <Check className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-1 text-sm ${reason.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {reason.label}
                  </span>
                  <button
                    onClick={() => startEdit(reason)}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => handleDelete(reason.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-danger-light hover:text-danger-foreground transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <Switch checked={reason.active} onCheckedChange={() => handleToggle(reason.id)} />
                </>
              )}
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {activeCount} de {reasons.length} motivos ativos — apenas motivos ativos aparecem no app
      </p>

      {/* App preview */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <h3 className="text-sm font-medium text-foreground">Pré-visualização no app</h3>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Ao marcar uma visita como não realizada, o representante verá estas opções:
          </p>
          <div className="flex flex-wrap gap-2">
            {reasons.filter(r => r.active).map((reason) => (
              <span
                key={reason.id}
                className="px-3 py-1.5 rounded-full text-sm border border-border text-foreground bg-secondary/50"
              >
                {reason.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
