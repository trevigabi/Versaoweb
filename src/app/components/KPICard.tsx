import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
}

export function KPICard({ label, value, change, changeType = 'neutral', icon: Icon }: KPICardProps) {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-danger',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm text-muted-foreground">{label}</div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-semibold text-foreground">{value}</div>
        {change && (
          <div className={`text-sm ${changeColors[changeType]}`}>{change}</div>
        )}
      </div>
    </div>
  );
}
