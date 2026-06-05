import { Sparkles } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  description: string;
  action?: string;
}

export function AIInsightCard({ title, description, action }: AIInsightCardProps) {
  return (
    <div className="bg-ai-accent-light border border-ai-accent/30 rounded-lg p-5 hover:border-ai-accent/50 transition-colors">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-ai-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-ai-foreground" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium text-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
          {action && (
            <button className="text-sm text-primary hover:text-primary-hover font-medium mt-2">
              {action} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
