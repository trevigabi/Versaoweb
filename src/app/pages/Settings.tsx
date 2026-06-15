import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';

// ── Dialog de edição inline ─────────────────────────────────────────────────

interface EditDialogProps {
  open: boolean;
  label: string;
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

function EditDialog({ open, label, value, onClose, onSave }: EditDialogProps) {
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          autoFocus
        />
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
          >
            Salvar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Componentes de linha ─────────────────────────────────────────────────────

function SettingField({
  label,
  description,
  value,
  onEdit,
}: {
  label: string;
  description: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm text-foreground">{value}</span>
        <button
          onClick={onEdit}
          className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
        >
          Alterar
        </button>
      </div>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────

export function Settings() {
  // Geral
  const [companyName, setCompanyName] = useState('Calçados Beira Rio');
  const [timezone, setTimezone] = useState('UTC-3 São Paulo');

  // Segurança
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoSession, setAutoSession] = useState(true);

  // Notificações
  const [aiAlerts, setAiAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);

  // Região e idioma
  const [language, setLanguage] = useState('Português (Brasil)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');

  // Dialog
  const [dialog, setDialog] = useState<{ label: string; value: string; onSave: (v: string) => void } | null>(null);

  const openDialog = (label: string, value: string, onSave: (v: string) => void) =>
    setDialog({ label, value, onSave });

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Configurações"
        description="Preferências gerais e configurações do sistema"
      />

      <Tabs defaultValue="geral">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="regiao">Região e idioma</TabsTrigger>
        </TabsList>

        {/* Tab — Geral */}
        <TabsContent value="geral">
          <div className="pt-4 max-w-[560px]">
            <div className="bg-card border border-border rounded-lg px-6">
              <SettingField
                label="Nome da empresa"
                description="Como sua empresa aparece no sistema"
                value={companyName}
                onEdit={() => openDialog('Nome da empresa', companyName, setCompanyName)}
              />
              <SettingField
                label="Fuso horário"
                description="Usado em datas e agendamentos"
                value={timezone}
                onEdit={() => openDialog('Fuso horário', timezone, setTimezone)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab — Segurança */}
        <TabsContent value="seguranca">
          <div className="pt-4 max-w-[560px]">
            <div className="bg-card border border-border rounded-lg px-6">
              <SettingToggle
                label="Autenticação de dois fatores"
                description="Requer código adicional no login"
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
              />
              <SettingToggle
                label="Sessão automática"
                description="Desconectar após 30 minutos de inatividade"
                checked={autoSession}
                onCheckedChange={setAutoSession}
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab — Notificações */}
        <TabsContent value="notificacoes">
          <div className="pt-4 max-w-[560px]">
            <div className="bg-card border border-border rounded-lg px-6">
              <SettingToggle
                label="Alertas de IA"
                description="Receber notificações de insights"
                checked={aiAlerts}
                onCheckedChange={setAiAlerts}
              />
              <SettingToggle
                label="Resumo diário"
                description="E-mail com resumo da operação"
                checked={dailySummary}
                onCheckedChange={setDailySummary}
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab — Região e idioma */}
        <TabsContent value="regiao">
          <div className="pt-4 max-w-[560px]">
            <div className="bg-card border border-border rounded-lg px-6">
              <SettingField
                label="Idioma"
                description="Idioma da interface do portal"
                value={language}
                onEdit={() => openDialog('Idioma', language, setLanguage)}
              />
              <SettingField
                label="Formato de data"
                description="Exibição de datas no sistema"
                value={dateFormat}
                onEdit={() => openDialog('Formato de data', dateFormat, setDateFormat)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de edição */}
      {dialog && (
        <EditDialog
          open
          label={dialog.label}
          value={dialog.value}
          onClose={() => setDialog(null)}
          onSave={dialog.onSave}
        />
      )}
    </div>
  );
}
