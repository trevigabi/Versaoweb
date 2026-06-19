import { PageHeader } from '../components/PageHeader';
import { Settings as SettingsIcon, Shield, Bell, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Configurações"
        description="Preferências gerais e configurações do sistema"
      />

      <div className="max-w-3xl space-y-6">
        {/* General */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h3 className="font-semibold text-foreground">Geral</h3>
          </div>
          <div className="space-y-4">
            <SettingRow
              label="Nome da Empresa"
              description="Como sua empresa aparece no sistema"
              value="Pace Route Distribuidora"
            />
            <SettingRow label="Fuso Horário" description="UTC-3 São Paulo" value="(GMT-3)" />
          </div>
        </div>

        {/* Security */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h3 className="font-semibold text-foreground">Segurança</h3>
          </div>
          <div className="space-y-4">
            <SettingToggle
              label="Autenticação de dois fatores"
              description="Requer código adicional no login"
              enabled={true}
            />
            <SettingToggle
              label="Sessão automática"
              description="Desconectar após 30 minutos de inatividade"
              enabled={true}
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h3 className="font-semibold text-foreground">Notificações</h3>
          </div>
          <div className="space-y-4">
            <SettingToggle
              label="Alertas de IA"
              description="Receber notificações de insights"
              enabled={true}
            />
            <SettingToggle
              label="Resumo diário"
              description="Email com resumo da operação"
              enabled={false}
            />
          </div>
        </div>

        {/* Region */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h3 className="font-semibold text-foreground">Região e Idioma</h3>
          </div>
          <div className="space-y-4">
            <SettingRow label="Idioma" description="Português (Brasil)" value="pt-BR" />
            <SettingRow label="Formato de data" description="DD/MM/YYYY" value="Brasil" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  value,
}: {
  label: string;
  description: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <button className="text-sm text-primary hover:text-primary-hover">Alterar</button>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  enabled,
}: {
  label: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <input type="checkbox" defaultChecked={enabled} className="w-5 h-5" />
    </div>
  );
}
