import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Trash2 } from 'lucide-react';

const instructionTypes = ['Lançamento', 'Campanha', 'Negociação', 'Relacionamento'];

const initialInstructions = [
  {
    name: 'Lançamento SS26',
    target: 'Todos os representantes',
    validity: '01/06 – 30/06/2026',
    type: 'Lançamento',
    text: 'Apresentar a coleção Moleca SS26 como prioridade nas visitas. Destacar os novos modelos e condições especiais de lançamento disponíveis até o fim do mês.',
  },
  {
    name: 'Campanha Inverno',
    target: 'Região Sul',
    validity: '10/06 – 15/07/2026',
    type: 'Campanha',
    text: 'Oferecer condições especiais da campanha de inverno para clientes com histórico de compra de calçados fechados. Reforçar prazo de entrega garantido antes do frio.',
  },
];

export function SteeringBriefing() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [instructions, setInstructions] = useState(initialInstructions);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

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
          <h1 className="text-2xl font-semibold text-foreground">Briefing estratégico</h1>
        </div>
        <button className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Salvar e aplicar
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left column — new instruction form */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          <h2 className="text-sm font-semibold text-foreground">Nova instrução</h2>

          {/* Applicability */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Aplicar para</label>
            <select className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Todos os representantes</option>
              <option>Por região</option>
              <option>Por representante individual</option>
            </select>
          </div>

          {/* Instruction type chips */}
          <div className="space-y-3">
            <label className="text-xs text-muted-foreground">Tipo de instrução</label>
            <div className="flex flex-wrap gap-2">
              {instructionTypes.map((t) => {
                const active = selectedTypes.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary text-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context textarea */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Contexto a incorporar</label>
            <textarea
              rows={4}
              placeholder="Descreva o contexto que a IA deve incorporar ao briefing pré-visita. Ex: destacar o lançamento da linha SS26, condições especiais de campanha, produtos em foco..."
              className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Validity dates */}
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

        {/* Right column — active instructions */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Instruções ativas</h2>
          </div>
          <div className="divide-y divide-border">
            {instructions.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                Nenhuma instrução ativa.
              </div>
            ) : (
              instructions.map((inst, i) => (
                <div key={i} className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">{inst.name}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/15 text-success">
                          Ativo
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                          {inst.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {inst.target} · {inst.validity}
                      </p>
                    </div>
                    <button
                      onClick={() => setInstructions((prev) => prev.filter((_, idx) => idx !== i))}
                      className="flex items-center justify-center w-7 h-7 rounded hover:bg-danger/10 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-danger" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="bg-secondary rounded-lg px-4 py-3">
                    <p className="text-xs text-foreground leading-relaxed">{inst.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
