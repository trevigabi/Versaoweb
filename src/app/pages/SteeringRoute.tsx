import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';

const criteria = [
  'Clientes com linha parada',
  'Clientes em risco de inativação',
  'Região com menor cobertura no mês',
  'Clientes com limite disponível',
  'Maior ticket histórico',
];

const priorityOptions = ['Alta', 'Média', 'Baixa', 'Off'];

const manualElevationSample = [
  { client: 'Farmácia Central', rep: 'João Silva', reason: 'Negociação estratégica', validity: '30/06/2026' },
  { client: 'Drogaria Moderna', rep: 'Ana Costa', reason: 'Risco de inativação', validity: '15/06/2026' },
];

export function SteeringRoute() {
  const [weights, setWeights] = useState<Record<string, string>>(
    Object.fromEntries(criteria.map((c) => [c, 'Alta']))
  );
  const [elevations, setElevations] = useState(manualElevationSample);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/steering"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Direcionamento de rota</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/steering"
            className="px-4 py-2 text-sm rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Cancelar
          </Link>
          <button className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Salvar e aplicar
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left column */}
        <div className="space-y-6">
          {/* Applicability card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Aplicar para</h2>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Representante ou grupo</label>
              <select className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Todos</option>
                <option>Por representante</option>
                <option>Por região</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Vigência — início</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Vigência — fim</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Prioritization weights card */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Pesos de priorização</h2>
            </div>
            <div className="divide-y divide-border">
              {criteria.map((criterion) => (
                <div key={criterion} className="flex items-center justify-between px-6 py-3 gap-4">
                  <span className="text-sm text-foreground">{criterion}</span>
                  <select
                    value={weights[criterion]}
                    onChange={(e) => setWeights((prev) => ({ ...prev, [criterion]: e.target.value }))}
                    className="px-3 py-1.5 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {priorityOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Clientes com elevação manual</h2>
            <button
              onClick={() =>
                setElevations((prev) => [
                  ...prev,
                  { client: '', rep: '', reason: '', validity: '' },
                ])
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-secondary transition-colors text-foreground"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              Adicionar
            </button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 px-6 py-2 bg-secondary/50 border-b border-border">
            {['Cliente', 'Representante', 'Motivo', 'Vigência'].map((col) => (
              <span key={col} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {col}
              </span>
            ))}
            <span className="w-6" />
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border">
            {elevations.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                Nenhum cliente adicionado.
              </div>
            ) : (
              elevations.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 items-center px-6 py-3"
                >
                  <span className="text-sm text-foreground truncate">{row.client || '—'}</span>
                  <span className="text-sm text-foreground truncate">{row.rep || '—'}</span>
                  <span className="text-sm text-muted-foreground truncate">{row.reason || '—'}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{row.validity || '—'}</span>
                  <button
                    onClick={() => setElevations((prev) => prev.filter((_, idx) => idx !== i))}
                    className="flex items-center justify-center w-6 h-6 rounded hover:bg-danger/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-danger" strokeWidth={1.5} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
