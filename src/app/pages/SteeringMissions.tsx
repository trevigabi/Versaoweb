import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Trophy, Plus } from 'lucide-react';

interface Mission {
  id: number;
  name: string;
  target: string;
  validity: string;
  description: string;
  enabled: boolean;
  activated: number;
  completed: number;
  rate: number;
  color: string;
}

const initialMissions: Mission[] = [
  {
    id: 1,
    name: 'Reativar clientes inativos',
    target: 'Região Sul',
    validity: 'até 30/06/2026',
    description: 'Visitar clientes sem compra há 90 dias ou mais e registrar o contato de reativação no app.',
    enabled: true,
    activated: 12,
    completed: 7,
    rate: 58,
    color: 'bg-secondary text-muted-foreground',
  },
  {
    id: 2,
    name: 'Apresentar linha Molekinha SS26',
    target: 'Todos os representantes',
    validity: 'até 15/07/2026',
    description: 'Oferecer a linha Molekinha SS26 para clientes que ainda não compraram nenhum item da coleção.',
    enabled: true,
    activated: 28,
    completed: 11,
    rate: 39,
    color: 'bg-primary/15 text-primary',
  },
];

export function SteeringMissions() {
  const [missions, setMissions] = useState(initialMissions);

  const toggleMission = (id: number) =>
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
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
          <h1 className="text-2xl font-semibold text-foreground">Missões ativas</h1>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" strokeWidth={2} />
          Nova missão
        </button>
      </div>

      {/* Mission cards */}
      <div className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
            {/* Top row */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${mission.color}`}>
                <Trophy className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{mission.name}</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      mission.enabled
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {mission.enabled ? 'Ativa' : 'Pausada'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {mission.target} · {mission.validity}
                </p>
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggleMission(mission.id)}
                className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
                  mission.enabled ? 'bg-primary' : 'bg-secondary border border-border'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    mission.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed pl-14">
              {mission.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pl-14">
              <div className="bg-secondary rounded-lg px-4 py-3 text-center">
                <div className="text-lg font-semibold text-foreground">{mission.activated}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Ativadas</div>
              </div>
              <div className="bg-secondary rounded-lg px-4 py-3 text-center">
                <div className="text-lg font-semibold text-foreground">{mission.completed}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Concluídas</div>
              </div>
              <div className="bg-secondary rounded-lg px-4 py-3 text-center">
                <div className="text-lg font-semibold text-foreground">{mission.rate}%</div>
                <div className="text-xs text-muted-foreground mt-0.5">Taxa de conclusão</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
