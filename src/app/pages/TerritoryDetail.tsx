import { useParams, Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { ArrowLeft, MapPin, Edit, Save } from 'lucide-react';

export function TerritoryDetail() {
  const { id } = useParams();

  return (
    <div className="p-8 space-y-6">
      <Link
        to="/territories"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        Voltar para Territórios
      </Link>

      <PageHeader
        title="São Paulo - Zona Sul"
        description="Território gerenciado por Carlos Silva"
        actions={
          <>
            <button className="px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-secondary transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" strokeWidth={1.5} />
              Editar Território
            </button>
            <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" strokeWidth={1.5} />
              Salvar Alterações
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Clientes Total</div>
          <div className="text-3xl font-semibold text-foreground">156</div>
          <div className="text-xs text-muted-foreground mt-1">142 ativos</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Cobertura</div>
          <div className="text-3xl font-semibold text-success">92%</div>
          <div className="text-xs text-success mt-1">+5% vs mês anterior</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Faturamento</div>
          <div className="text-3xl font-semibold text-foreground">R$ 1.2M</div>
          <div className="text-xs text-muted-foreground mt-1">Mensal</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm text-muted-foreground mb-1">Status</div>
          <div className="text-3xl font-semibold text-success">Ótimo</div>
          <div className="text-xs text-muted-foreground mt-1">Balanceado</div>
        </div>
      </div>

      {/* Map Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Mapa do Território</h3>
            <div className="h-96 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-muted-foreground z-10">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-primary" strokeWidth={1.5} />
                <div className="text-sm mb-2">Editor de Área Territorial</div>
                <div className="text-xs max-w-xs">
                  Desenhe polígonos, associe CEPs e defina limites geográficos
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/3 left-1/3 w-64 h-64 border-2 border-primary rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-ai-accent rounded-full"></div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors">
                Desenhar Polígono
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors">
                Adicionar por CEP
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors">
                Importar Arquivo
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">Configurações</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Representante
                </label>
                <select className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm">
                  <option>Carlos Silva</option>
                  <option>Ana Santos</option>
                  <option>João Oliveira</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Nome do Território
                </label>
                <input
                  type="text"
                  defaultValue="São Paulo - Zona Sul"
                  className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Região
                </label>
                <select className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm">
                  <option>São Paulo</option>
                  <option>Rio de Janeiro</option>
                  <option>Minas Gerais</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-ai-accent-light border border-ai-accent/30 rounded-lg p-5">
            <h4 className="font-medium text-foreground mb-3">Preview do Impacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clientes afetados</span>
                <span className="font-medium text-foreground">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clientes órfãos</span>
                <span className="font-medium text-foreground">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sobreposições</span>
                <span className="font-medium text-warning-foreground">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Clients */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Clientes Associados (156)
        </h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <div className="font-medium text-foreground">Cliente {i}</div>
                <div className="text-sm text-muted-foreground">CEP: 04567-000</div>
              </div>
              <div className="text-sm text-muted-foreground">R$ 12.5K/mês</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
