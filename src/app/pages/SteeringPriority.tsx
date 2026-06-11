import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';

const segments = ['Multimarca', 'Especializada', 'Rede regional', 'Shopping', 'E-commerce'];
const lines = ['Moleca SS26', 'Molekinha', 'Beira Rio Conforto'];
const additionalCriteria = ['Nunca compraram a linha', 'Mix reduzido', 'Maior potencial'];

const previewClients = [
  { client: 'Farmácia Central', rep: 'João Silva', reason: 'Segmento Multimarca + Mix reduzido' },
  { client: 'Drogaria Moderna', rep: 'Ana Costa', reason: 'Linha Molekinha — nunca comprou' },
  { client: 'Rede Saúde Sul', rep: 'Carlos Mendes', reason: 'Rede regional + maior potencial' },
  { client: 'Saúde & Vida', rep: 'Patrícia Lima', reason: 'Segmento Especializada' },
];

export function SteeringPriority() {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [criterion, setCriterion] = useState('');

  const toggle = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    setSelected(
      selected.includes(value) ? selected.filter((s) => s !== value) : [...selected, value]
    );
  };

  const affectedCount = previewClients.length;

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
          <h1 className="text-2xl font-semibold text-foreground">Prioridade de clientes</h1>
        </div>
        <button className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Salvar e aplicar
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left column */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-sm font-semibold text-foreground">Elevar por segmento ou linha</h2>

          {/* Segment chips */}
          <div className="space-y-3">
            <label className="text-xs text-muted-foreground">Segmento de cliente</label>
            <div className="flex flex-wrap gap-2">
              {segments.map((seg) => {
                const active = selectedSegments.includes(seg);
                return (
                  <button
                    key={seg}
                    onClick={() => toggle(seg, selectedSegments, setSelectedSegments)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary text-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {seg}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Line chips */}
          <div className="space-y-3">
            <label className="text-xs text-muted-foreground">Linha estratégica</label>
            <div className="flex flex-wrap gap-2">
              {lines.map((line) => {
                const active = selectedLines.includes(line);
                return (
                  <button
                    key={line}
                    onClick={() => toggle(line, selectedLines, setSelectedLines)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary text-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {line}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional criterion */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Critério adicional</label>
            <select
              value={criterion}
              onChange={(e) => setCriterion(e.target.value)}
              className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecionar...</option>
              {additionalCriteria.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right column */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Prévia — clientes afetados</h2>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{affectedCount} clientes</span> serão
              elevados com base nos critérios selecionados.
            </p>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-2 bg-secondary/50 border-b border-border">
            {['Cliente', 'Representante', 'Motivo'].map((col) => (
              <span
                key={col}
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {col}
              </span>
            ))}
          </div>

          {/* Table rows */}
          <div className="divide-y divide-border">
            {previewClients.map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 items-center px-6 py-3">
                <span className="text-sm text-foreground truncate">{row.client}</span>
                <span className="text-sm text-foreground truncate">{row.rep}</span>
                <span className="text-xs text-muted-foreground truncate">{row.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
