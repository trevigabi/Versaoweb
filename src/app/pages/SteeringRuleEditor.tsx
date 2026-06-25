import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  TrendingUp, RefreshCw, DollarSign, Map, Settings2,
  Users2, CreditCard, BarChart2, Gem,
  ChevronDown, ChevronUp, ArrowRight, ArrowLeft, Calendar,
  ChevronLeft, ChevronRight, X, Sparkles, Eye, AlignLeft,
  Search, LayoutList,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import type { LucideIcon } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type DimensionLevel = 'Alta' | 'Média' | 'Baixa';
type PeriodView = 'dia' | 'semana' | 'mes';
type ClientType = 'alto' | 'churn' | 'colecao' | 'outros';
type EditorTab = 'direcionamento' | 'briefing';

interface DimensionWeight { pct: number; level: DimensionLevel; }
interface ImpactProfile { label: string; description: string; pct: number; positive: boolean; color: string; }
interface ClientRow { name: string; type: ClientType; city: string; lastVisit: string; score: number; ticket: string; tag: string; }
interface SimProfile { label: string; clients: number; pct: number; color: string; }
interface WeekProjection { week: string; alto: number; churn: number; colecao: number; outros: number; }
interface RevenueScenario { label: string; value: string; pct: number; color: string; bg: string; }
interface PrevComparison { metric: string; before: string; after: string; delta: string; positive: boolean; }

// ── Static data ───────────────────────────────────────────────────────────────

const MODES: { id: string; label: string; description: string; icon: LucideIcon }[] = [
  { id: 'Crescimento',   label: 'Crescimento',   description: 'Aumentar vendas e explorar oportunidades',  icon: TrendingUp },
  { id: 'Recuperação',   label: 'Recuperação',   description: 'Recuperar clientes e reativar carteira',    icon: RefreshCw },
  { id: 'Coleção',       label: 'Marca',         description: 'Impulsionar marcas específicas na carteira', icon: Gem },
  { id: 'Rentabilidade', label: 'Rentabilidade', description: 'Aumentar ticket e melhorar margem',         icon: DollarSign },
  { id: 'Cobertura',     label: 'Cobertura',     description: 'Aumentar presença territorial',             icon: Map },
  { id: 'Personalizado', label: '',               description: 'Crie sua própria estratégia do zero',      icon: Settings2 },
];

// ── AI Strategy templates ─────────────────────────────────────────────────────

interface StrategyTemplate {
  id: string; label: string; description: string; context: string;
  category: string; baseMode: string; icon: LucideIcon;
}

const AI_STRATEGIES: StrategyTemplate[] = [
  { id: 's1',  label: 'Nova coleção verão',       description: 'Apresentar linha SS26 para clientes com perfil compatível',       context: '38 clientes de perfil compatível detectados',    category: 'Marca',         baseMode: 'Coleção',       icon: Gem },
  { id: 's2',  label: 'Reativação 90 dias',        description: 'Recuperar clientes inativos com histórico positivo',              context: '14 clientes inativos há mais de 60 dias',        category: 'Recuperação',   baseMode: 'Recuperação',   icon: RefreshCw },
  { id: 's3',  label: 'Alerta de churn',           description: 'Agir antes da janela de inativação para clientes em risco',       context: 'Sinal de perda de frequência em 9 clientes',     category: 'Recuperação',   baseMode: 'Recuperação',   icon: TrendingUp },
  { id: 's4',  label: 'Expansão regional Sul',     description: 'Ampliar cobertura em regiões com baixa presença detectada',       context: 'Baixa cobertura detectada na região Sul',        category: 'Cobertura',     baseMode: 'Cobertura',     icon: Map },
  { id: 's5',  label: 'Crescimento ticket médio',  description: 'Focar em clientes com maior potencial de volume e margem',        context: '22 clientes abaixo do ticket potencial estimado',category: 'Crescimento',   baseMode: 'Crescimento',   icon: TrendingUp },
  { id: 's6',  label: 'Moleca — penetração Norte', description: 'Ampliar presença da marca Moleca na Região Norte',               context: '18 clientes sem apresentação da linha Moleca',   category: 'Marca',         baseMode: 'Coleção',       icon: Gem },
  { id: 's7',  label: 'Inadimplência crítica',     description: 'Gestão de clientes com risco de crédito e pagamentos atrasados',  context: '7 clientes com risco financeiro elevado',        category: 'Rentabilidade', baseMode: 'Rentabilidade', icon: DollarSign },
  { id: 's8',  label: 'Cobertura Nordeste',        description: 'Visitar clientes não atendidos no ciclo anterior',                context: '31% da carteira Nordeste sem visita no mês',     category: 'Cobertura',     baseMode: 'Cobertura',     icon: Map },
  { id: 's9',  label: 'Mix Beira Rio + Vizzano',   description: 'Aumentar cross-sell entre as linhas Beira Rio e Vizzano',         context: '27 clientes com gap de cross-sell identificado', category: 'Marca',         baseMode: 'Coleção',       icon: Gem },
  { id: 's10', label: 'Recuperação pós-coleção',   description: 'Reativar clientes que não compraram a última coleção lançada',    context: '11 clientes sem pedido na coleção atual',        category: 'Recuperação',   baseMode: 'Recuperação',   icon: RefreshCw },
];

const STRATEGY_CATEGORIES = ['Todas', 'Crescimento', 'Recuperação', 'Marca', 'Rentabilidade', 'Cobertura'];

const MODE_STYLE: Record<string, { bg: string; text: string }> = {
  Crescimento:   { bg: '#F5F5F4', text: '#44403C' },
  Recuperação:   { bg: '#F5F5F4', text: '#44403C' },
  Coleção:       { bg: '#F5F5F4', text: '#44403C' },
  Rentabilidade: { bg: '#F5F5F4', text: '#44403C' },
  Cobertura:     { bg: '#F5F5F4', text: '#44403C' },
  Personalizado: { bg: '#F5F5F4', text: '#78716C' },
};

const DIMENSIONS: { id: string; label: string; description: string; icon: LucideIcon; color: string }[] = [
  { id: 'retencao',    label: 'Retenção de carteira',  description: 'Foco em evitar churn e recuperar clientes',           icon: Users2,    color: '#BE1520' },
  { id: 'performance', label: 'Performance comercial', description: 'Foco em aumentar vendas e ticket médio',               icon: BarChart2,  color: '#BE1520' },
  { id: 'mix',         label: 'Marca',                 description: 'Priorizar marcas específicas na carteira de clientes', icon: Gem,        color: '#BE1520' },
  { id: 'credito',     label: 'Crédito e risco',       description: 'Foco em inadimplência e saúde financeira',             icon: CreditCard, color: '#BE1520' },
  { id: 'cobertura',   label: 'Cobertura territorial', description: 'Foco em frequência de visita e áreas descobertas',    icon: Map,        color: '#BE1520' },
];

const CRITERIA_DETAIL: Record<string, string[]> = {
  retencao:    ['Risco de inativação', 'Cliente reativável', 'NPS baixo na última visita'],
  performance: ['Maior ticket histórico', 'Probabilidade alta de fechamento', 'Queda de volume no último ciclo'],
  mix:         ['Marcas selecionadas com meta de presença', 'Clientes que nunca compraram a marca', 'Clientes com compra abaixo do potencial'],
  credito:     ['Limite disponível alto', 'Inadimplência recente'],
  cobertura:   ['Regiões selecionadas com meta de cobertura', 'Clientes sem visita no período definido'],
};

const DEFAULT_WEIGHTS: Record<string, DimensionWeight> = {
  retencao: { pct: 20, level: 'Média' }, performance: { pct: 20, level: 'Média' },
  mix: { pct: 20, level: 'Média' }, credito: { pct: 20, level: 'Média' }, cobertura: { pct: 20, level: 'Média' },
};

const MODE_WEIGHTS: Record<string, Record<string, DimensionWeight>> = {
  Crescimento:   { retencao: { pct: 30, level: 'Alta' }, performance: { pct: 25, level: 'Média' }, mix: { pct: 25, level: 'Alta' }, credito: { pct: 10, level: 'Baixa' }, cobertura: { pct: 10, level: 'Média' } },
  Recuperação:   { retencao: { pct: 40, level: 'Alta' }, performance: { pct: 20, level: 'Média' }, mix: { pct: 10, level: 'Baixa' }, credito: { pct: 15, level: 'Média' }, cobertura: { pct: 15, level: 'Baixa' } },
  Rentabilidade: { retencao: { pct: 15, level: 'Baixa' }, performance: { pct: 35, level: 'Alta' }, mix: { pct: 20, level: 'Média' }, credito: { pct: 25, level: 'Alta' }, cobertura: { pct: 5, level: 'Baixa' } },
  Cobertura:     { retencao: { pct: 15, level: 'Baixa' }, performance: { pct: 15, level: 'Baixa' }, mix: { pct: 20, level: 'Média' }, credito: { pct: 10, level: 'Baixa' }, cobertura: { pct: 40, level: 'Alta' } },
  Coleção:       { retencao: { pct: 15, level: 'Baixa' }, performance: { pct: 25, level: 'Alta' }, mix: { pct: 35, level: 'Alta' }, credito: { pct: 10, level: 'Baixa' }, cobertura: { pct: 15, level: 'Média' } },
  Personalizado: { ...DEFAULT_WEIGHTS },
};

const MODE_IMPACT: Record<string, ImpactProfile[]> = {
  Crescimento:   [
    { label: 'Clientes com potencial de coleção nova', description: 'Maior chance de compra da nova coleção',    pct: 38, positive: true,  color: '#BE1520' },
    { label: 'Clientes com risco de churn',            description: 'Clientes com sinais de perda de compra',    pct: 24, positive: true,  color: '#BE1520' },
    { label: 'Clientes com maior ticket potencial',    description: 'Histórico e perfil de maior volume',        pct: 18, positive: true,  color: '#BE1520' },
    { label: 'Clientes inadimplentes',                 description: 'Serão menos priorizados nas rotas',         pct: 12, positive: false, color: '#78716C' },
  ],
  Recuperação:   [
    { label: 'Clientes em risco de inativação',        description: 'Próximos da janela de inatividade',         pct: 45, positive: true,  color: '#BE1520' },
    { label: 'Clientes inativos reativáveis',          description: 'Histórico de alto faturamento',             pct: 32, positive: true,  color: '#BE1520' },
    { label: 'Clientes com NPS baixo',                 description: 'Insatisfação registrada recentemente',      pct: 22, positive: true,  color: '#BE1520' },
    { label: 'Novos clientes sem histórico',           description: 'Priorizados apenas em cobertura básica',    pct: 15, positive: false, color: '#78716C' },
  ],
  Rentabilidade: [
    { label: 'Clientes com maior margem',              description: 'Alto ticket e baixo risco de crédito',      pct: 42, positive: true,  color: '#BE1520' },
    { label: 'Clientes com limite disponível',         description: 'Crédito liberado para novos pedidos',       pct: 28, positive: true,  color: '#BE1520' },
    { label: 'Clientes em risco financeiro',           description: 'Pagamentos em atraso nos últimos 60 dias',  pct: 18, positive: false, color: '#78716C' },
    { label: 'Clientes de baixo volume histórico',     description: 'Pedidos abaixo da média da carteira',       pct: 14, positive: false, color: '#78716C' },
  ],
  Cobertura:     [
    { label: 'Regiões com baixa cobertura',            description: 'Menos de 30% de cobertura no ciclo',        pct: 48, positive: true,  color: '#BE1520' },
    { label: 'Clientes sem visita há 30+ dias',        description: 'Fora da frequência esperada de visita',     pct: 35, positive: true,  color: '#BE1520' },
    { label: 'Clientes de alto ticket',                description: 'Reduzidos em prol da cobertura',            pct: 20, positive: false, color: '#78716C' },
    { label: 'Clientes já na frequência ideal',        description: 'Mantidos na rotina atual',                  pct: 12, positive: false, color: '#78716C' },
  ],
  Coleção:       [
    { label: 'Sem apresentação da coleção atual',      description: 'Ainda não receberam a coleção atual',       pct: 52, positive: true,  color: '#BE1520' },
    { label: 'Clientes com gap de mix',                description: 'Nunca compraram determinada linha',         pct: 30, positive: true,  color: '#BE1520' },
    { label: 'Clientes inadimplentes',                 description: 'Apresentação da coleção postergada',        pct: 16, positive: false, color: '#78716C' },
    { label: 'Clientes já atualizados',                description: 'Já receberam apresentação completa',        pct: 10, positive: false, color: '#78716C' },
  ],
  Personalizado: [
    { label: 'Clientes priorizados pela configuração', description: 'Baseado nos pesos definidos manualmente',   pct: 30, positive: true,  color: '#BE1520' },
    { label: 'Clientes de alta atenção',               description: 'Indicadores de risco ou oportunidade',     pct: 25, positive: true,  color: '#BE1520' },
    { label: 'Clientes de manutenção',                 description: 'Frequência reduzida temporariamente',      pct: 15, positive: false, color: '#78716C' },
    { label: 'Clientes sem critério definido',         description: 'Aguardando configuração mais específica',  pct: 10, positive: false, color: '#78716C' },
  ],
};

const CLIENT_TYPE_STYLE: Record<ClientType, { bg: string; text: string; label: string }> = {
  alto:    { bg: '#FDF2F2', text: '#BE1520', label: 'Alto potencial' },
  churn:   { bg: '#F5F5F4', text: '#44403C', label: 'Risco de churn' },
  colecao: { bg: '#F5F5F4', text: '#44403C', label: 'Pot. coleção' },
  outros:  { bg: '#F5F5F4', text: '#78716C', label: 'Padrão' },
};

const SIM_PROFILES: Record<string, SimProfile[]> = {
  Crescimento:   [{ label: 'Alto potencial', clients: 312, pct: 38, color: '#BE1520' }, { label: 'Risco de churn', clients: 196, pct: 24, color: '#44403C' }, { label: 'Pot. coleção', clients: 148, pct: 18, color: '#44403C' }, { label: 'Padrão', clients: 164, pct: 20, color: '#78716C' }],
  Recuperação:   [{ label: 'Risco de inativação', clients: 368, pct: 45, color: '#BE1520' }, { label: 'Inativos reativáveis', clients: 261, pct: 32, color: '#44403C' }, { label: 'NPS baixo', clients: 180, pct: 22, color: '#44403C' }, { label: 'Padrão', clients: 11, pct: 1, color: '#78716C' }],
  Rentabilidade: [{ label: 'Maior margem', clients: 344, pct: 42, color: '#BE1520' }, { label: 'Limite disponível', clients: 229, pct: 28, color: '#44403C' }, { label: 'Alt. propensão', clients: 164, pct: 20, color: '#44403C' }, { label: 'Padrão', clients: 82, pct: 10, color: '#78716C' }],
  Cobertura:     [{ label: 'Baixa cobertura', clients: 393, pct: 48, color: '#BE1520' }, { label: 'Sem visita 30d+', clients: 286, pct: 35, color: '#44403C' }, { label: 'Pot. inexplorado', clients: 90, pct: 11, color: '#44403C' }, { label: 'Padrão', clients: 49, pct: 6, color: '#78716C' }],
  Coleção:       [{ label: 'Sem coleção atual', clients: 426, pct: 52, color: '#BE1520' }, { label: 'Gap de mix', clients: 245, pct: 30, color: '#44403C' }, { label: 'Maior ticket', clients: 98, pct: 12, color: '#44403C' }, { label: 'Padrão', clients: 49, pct: 6, color: '#78716C' }],
  Personalizado: [{ label: 'Priorizados config', clients: 245, pct: 30, color: '#BE1520' }, { label: 'Alta atenção', clients: 204, pct: 25, color: '#44403C' }, { label: 'Oportunidade', clients: 163, pct: 20, color: '#44403C' }, { label: 'Padrão', clients: 206, pct: 25, color: '#78716C' }],
};

const WEEK_PROJECTIONS: Record<string, WeekProjection[]> = {
  Crescimento:   [{ week: 'Sem. 1', alto: 48, churn: 32, colecao: 28, outros: 18 }, { week: 'Sem. 2', alto: 52, churn: 30, colecao: 34, outros: 14 }, { week: 'Sem. 3', alto: 44, churn: 28, colecao: 30, outros: 20 }, { week: 'Sem. 4', alto: 56, churn: 34, colecao: 26, outros: 12 }],
  Recuperação:   [{ week: 'Sem. 1', alto: 20, churn: 62, colecao: 10, outros: 8 }, { week: 'Sem. 2', alto: 18, churn: 68, colecao: 8, outros: 6 }, { week: 'Sem. 3', alto: 22, churn: 58, colecao: 12, outros: 8 }, { week: 'Sem. 4', alto: 16, churn: 72, colecao: 6, outros: 6 }],
  Rentabilidade: [{ week: 'Sem. 1', alto: 68, churn: 10, colecao: 24, outros: 10 }, { week: 'Sem. 2', alto: 72, churn: 8, colecao: 22, outros: 8 }, { week: 'Sem. 3', alto: 64, churn: 12, colecao: 20, outros: 12 }, { week: 'Sem. 4', alto: 76, churn: 6, colecao: 26, outros: 6 }],
  Cobertura:     [{ week: 'Sem. 1', alto: 14, churn: 18, colecao: 12, outros: 72 }, { week: 'Sem. 2', alto: 16, churn: 16, colecao: 14, outros: 68 }, { week: 'Sem. 3', alto: 12, churn: 20, colecao: 10, outros: 74 }, { week: 'Sem. 4', alto: 18, churn: 14, colecao: 16, outros: 66 }],
  Coleção:       [{ week: 'Sem. 1', alto: 22, churn: 14, colecao: 72, outros: 8 }, { week: 'Sem. 2', alto: 20, churn: 12, colecao: 78, outros: 6 }, { week: 'Sem. 3', alto: 24, churn: 16, colecao: 68, outros: 10 }, { week: 'Sem. 4', alto: 18, churn: 10, colecao: 82, outros: 6 }],
  Personalizado: [{ week: 'Sem. 1', alto: 36, churn: 24, colecao: 20, outros: 26 }, { week: 'Sem. 2', alto: 38, churn: 22, colecao: 22, outros: 24 }, { week: 'Sem. 3', alto: 34, churn: 26, colecao: 18, outros: 28 }, { week: 'Sem. 4', alto: 40, churn: 20, colecao: 24, outros: 22 }],
};

const REVENUE_SCENARIOS: Record<string, RevenueScenario[]> = {
  Crescimento:   [{ label: 'Otimista', value: 'R$ 1,24M', pct: 112, color: '#BE1520', bg: '#FDF2F2' }, { label: 'Realista', value: 'R$ 1,08M', pct: 98, color: '#44403C', bg: '#F5F5F4' }, { label: 'Pessimista', value: 'R$ 890k', pct: 81, color: '#78716C', bg: '#F5F5F4' }],
  Recuperação:   [{ label: 'Otimista', value: 'R$ 1,10M', pct: 100, color: '#BE1520', bg: '#FDF2F2' }, { label: 'Realista', value: 'R$ 950k', pct: 86, color: '#44403C', bg: '#F5F5F4' }, { label: 'Pessimista', value: 'R$ 780k', pct: 71, color: '#78716C', bg: '#F5F5F4' }],
  Rentabilidade: [{ label: 'Otimista', value: 'R$ 1,38M', pct: 125, color: '#BE1520', bg: '#FDF2F2' }, { label: 'Realista', value: 'R$ 1,18M', pct: 107, color: '#44403C', bg: '#F5F5F4' }, { label: 'Pessimista', value: 'R$ 960k', pct: 87, color: '#78716C', bg: '#F5F5F4' }],
  Cobertura:     [{ label: 'Otimista', value: 'R$ 1,05M', pct: 95, color: '#BE1520', bg: '#FDF2F2' }, { label: 'Realista', value: 'R$ 920k', pct: 83, color: '#44403C', bg: '#F5F5F4' }, { label: 'Pessimista', value: 'R$ 760k', pct: 69, color: '#78716C', bg: '#F5F5F4' }],
  Coleção:       [{ label: 'Otimista', value: 'R$ 1,30M', pct: 118, color: '#BE1520', bg: '#FDF2F2' }, { label: 'Realista', value: 'R$ 1,12M', pct: 101, color: '#44403C', bg: '#F5F5F4' }, { label: 'Pessimista', value: 'R$ 900k', pct: 82, color: '#78716C', bg: '#F5F5F4' }],
  Personalizado: [{ label: 'Otimista', value: 'R$ 1,15M', pct: 104, color: '#BE1520', bg: '#FDF2F2' }, { label: 'Realista', value: 'R$ 1,00M', pct: 91, color: '#44403C', bg: '#F5F5F4' }, { label: 'Pessimista', value: 'R$ 820k', pct: 74, color: '#78716C', bg: '#F5F5F4' }],
};

const PREV_COMPARISON: Record<string, PrevComparison[]> = {
  Crescimento:   [{ metric: 'Clientes priorizados', before: '420', after: '586', delta: '+40%', positive: true }, { metric: 'Visitas estimadas/sem.', before: '126', after: '170', delta: '+35%', positive: true }, { metric: 'Ticket médio esperado', before: 'R$ 3.200', after: 'R$ 4.100', delta: '+28%', positive: true }, { metric: 'Clientes de alto risco', before: '86', after: '44', delta: '-49%', positive: true }],
  Recuperação:   [{ metric: 'Clientes em risco', before: '142', after: '368', delta: '+159%', positive: true }, { metric: 'Reativações estimadas', before: '18', after: '42', delta: '+133%', positive: true }, { metric: 'Ticket médio esperado', before: 'R$ 3.200', after: 'R$ 2.600', delta: '-19%', positive: false }, { metric: 'Novos clientes visitados', before: '64', after: '11', delta: '-83%', positive: false }],
  Rentabilidade: [{ metric: 'Ticket médio esperado', before: 'R$ 3.200', after: 'R$ 5.800', delta: '+81%', positive: true }, { metric: 'Clientes alta margem', before: '186', after: '344', delta: '+85%', positive: true }, { metric: 'Exposição inadimplência', before: 'R$ 124k', after: 'R$ 48k', delta: '-61%', positive: true }, { metric: 'Cobertura territorial', before: '78%', after: '52%', delta: '-26pp', positive: false }],
  Cobertura:     [{ metric: 'Áreas cobertas', before: '34', after: '61', delta: '+79%', positive: true }, { metric: 'Clientes sem visita 30d', before: '286', after: '94', delta: '-67%', positive: true }, { metric: 'Ticket médio esperado', before: 'R$ 3.200', after: 'R$ 2.100', delta: '-34%', positive: false }, { metric: 'Clientes alto potencial', before: '186', after: '114', delta: '-39%', positive: false }],
  Coleção:       [{ metric: 'Apres. de coleção/sem.', before: '48', after: '126', delta: '+163%', positive: true }, { metric: 'Mix gap coberto', before: '22%', after: '61%', delta: '+39pp', positive: true }, { metric: 'Ticket médio esperado', before: 'R$ 3.200', after: 'R$ 4.600', delta: '+44%', positive: true }, { metric: 'Clientes em risco atend.', before: '86', after: '28', delta: '-67%', positive: false }],
  Personalizado: [{ metric: 'Clientes priorizados', before: '420', after: '449', delta: '+7%', positive: true }, { metric: 'Visitas estimadas/sem.', before: '126', after: '134', delta: '+6%', positive: true }, { metric: 'Ticket médio esperado', before: 'R$ 3.200', after: 'R$ 3.400', delta: '+6%', positive: true }, { metric: 'Cobertura territorial', before: '78%', after: '74%', delta: '-4pp', positive: false }],
};

const BASE_CLIENTS: ClientRow[] = [
  { name: 'Calçados Bom Pé',      type: 'outros',  city: 'Campinas',  lastVisit: '12 dias', score: 61, ticket: 'R$ 2.100', tag: 'Padrão' },
  { name: 'Moda Premium Ltda',     type: 'alto',    city: 'São Paulo', lastVisit: '5 dias',  score: 88, ticket: 'R$ 8.400', tag: 'Alto potencial' },
  { name: 'Casa do Sapato',        type: 'outros',  city: 'Santos',    lastVisit: '18 dias', score: 54, ticket: 'R$ 1.800', tag: 'Padrão' },
  { name: 'Risco de Perda — João', type: 'churn',   city: 'Ribeirão',  lastVisit: '38 dias', score: 79, ticket: 'R$ 4.200', tag: 'Risco de churn' },
  { name: 'Atacado Norte',         type: 'outros',  city: 'Sorocaba',  lastVisit: '7 dias',  score: 58, ticket: 'R$ 1.500', tag: 'Padrão' },
  { name: 'Sapatos & Moda',        type: 'alto',    city: 'São Paulo', lastVisit: '3 dias',  score: 92, ticket: 'R$ 9.200', tag: 'Alto potencial' },
  { name: 'Boutique do Calçado',   type: 'colecao', city: 'Jundiaí',   lastVisit: '14 dias', score: 83, ticket: 'R$ 5.600', tag: 'Pot. coleção' },
  { name: 'Loja Infantil Pezinho', type: 'outros',  city: 'Campinas',  lastVisit: '22 dias', score: 45, ticket: 'R$ 900',  tag: 'Padrão' },
];

const BEFORE_ORDER = [0, 1, 2, 3, 4, 5, 6, 7];
const AFTER_ORDER_BY_MODE: Record<string, number[]> = {
  Crescimento: [5,1,6,3,0,2,4,7], Recuperação: [3,4,1,5,7,6,0,2],
  Rentabilidade: [5,1,6,0,3,2,4,7], Cobertura: [7,2,0,4,3,6,1,5],
  Coleção: [6,5,1,3,0,7,2,4], Personalizado: [1,5,3,6,0,2,4,7],
};

// ── Briefing padrão por estratégia ───────────────────────────────────────────

const BRIEFING_DEFAULTS: Record<string, string> = {
  Crescimento:
    'Priorize os clientes com maior potencial de compra identificados pela IA. Aborde oportunidades de ampliação de mix e aumento de ticket. Reforce as condições comerciais vigentes e explore clientes que não compram há mais de 30 dias mas têm histórico positivo.',
  Recuperação:
    'Foque nos clientes em risco de inativação e nos inativos com potencial de reativação. Aborde com empatia, sem pressão — o objetivo é retomar o relacionamento. Registre o motivo da ausência e ofereça condições especiais de retorno quando disponíveis.',
  Rentabilidade:
    'Priorize clientes com maior margem e limite de crédito disponível. Evite oferecer descontos desnecessários — o foco é aumentar o ticket médio e melhorar a qualidade do pedido. Atenção especial a clientes com histórico de alto faturamento que reduziram o volume recentemente.',
  Cobertura:
    'O objetivo desta visita é garantir presença nas regiões com menor cobertura no ciclo. Priorize clientes que ainda não foram visitados no mês, especialmente os de médio e alto potencial. Registre o resultado de cada visita para atualizar a cobertura em tempo real.',
  Coleção:
    'Foque na apresentação das marcas priorizadas neste ciclo. Identifique clientes que ainda não conhecem os produtos selecionados ou que compraram abaixo do potencial. Apresente lookbook, condições de lançamento e prazo de entrega. Registre o interesse e próxima ação ao final de cada visita.',
  Personalizado: '',
};

// ── Marca & Cobertura options ─────────────────────────────────────────────────

const AVAILABLE_BRANDS = ['Beira Rio', 'Moleca', 'Vizzano', 'Modare', 'Molekinha', 'Molekinho', 'Actvitta', 'BR Sport'];
const AVAILABLE_REGIONS = ['Sul', 'Sudeste', 'Nordeste', 'Norte', 'Centro-Oeste', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais'];

const PERIOD_DAYS   = ['26/ago','27/ago','28/ago','29/ago','02/set','03/set','04/set','05/set'];
const PERIOD_WEEKS  = ['Sem. 1 (26/ago)','Sem. 2 (02/set)','Sem. 3 (09/set)','Sem. 4 (16/set)','Sem. 5 (23/set)','Sem. 6 (30/set)'];
const PERIOD_MONTHS = ['Agosto 2026','Setembro 2026','Outubro 2026'];

const LEVEL_STYLES: Record<DimensionLevel, React.CSSProperties> = {
  Alta:  { backgroundColor: '#FDF2F2', color: '#BE1520' },
  Média: { backgroundColor: '#F5F5F4', color: '#44403C' },
  Baixa: { backgroundColor: '#F5F5F4', color: '#78716C' },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function redistributePcts(weights: Record<string, DimensionWeight>, changedId: string, newPct: number): Record<string, DimensionWeight> {
  const others = Object.keys(weights).filter((id) => id !== changedId);
  const othersTotal = others.reduce((sum, id) => sum + weights[id].pct, 0);
  const next: Record<string, DimensionWeight> = { ...weights, [changedId]: { ...weights[changedId], pct: newPct } };
  const remaining = 100 - newPct;
  if (othersTotal === 0) {
    const each = Math.floor(remaining / others.length);
    others.forEach((id) => { next[id] = { ...weights[id], pct: each }; });
    const leftover = remaining - each * others.length;
    if (leftover > 0 && others.length > 0) next[others[0]] = { ...next[others[0]], pct: next[others[0]].pct + leftover };
  } else {
    others.forEach((id) => { next[id] = { ...weights[id], pct: Math.round((weights[id].pct / othersTotal) * remaining) }; });
    const total = Object.values(next).reduce((s, w) => s + w.pct, 0);
    if (total !== 100 && others.length > 0) next[others[0]] = { ...next[others[0]], pct: Math.max(0, next[others[0]].pct + (100 - total)) };
  }
  others.forEach((id) => { if (next[id].pct < 0) next[id] = { ...next[id], pct: 0 }; });
  return next;
}

function ClientList({ clients, highlight }: { clients: ClientRow[]; highlight?: boolean }) {
  return (
    <div className="divide-y divide-border">
      {clients.map((c, i) => {
        const style = CLIENT_TYPE_STYLE[c.type];
        return (
          <div key={i} className={`flex items-center gap-3 py-2 px-1 text-xs ${highlight ? 'first:bg-primary/5 first:rounded-lg' : ''}`}>
            <span className="w-4 text-[10px] text-muted-foreground text-right flex-shrink-0 tabular-nums">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground truncate leading-snug">{c.name}</div>
              <div className="text-[10px] text-muted-foreground">{c.city} · {c.lastVisit}</div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: style.bg, color: style.text }}>{style.label}</span>
              <span className="text-[10px] text-muted-foreground tabular-nums w-14 text-right">{c.ticket}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function SteeringRuleEditor() {
  const navigate = useNavigate();

  // Shared state
  const [mode, setMode]             = useState('Crescimento');
  const [strategyName, setStrategyName] = useState('');
const [isActive, setIsActive]     = useState(true);
  const [startDate, setStartDate]   = useState('2026-08-26');
  const [endDate, setEndDate]       = useState('2026-10-10');
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  // Tab state
  const [activeTab, setActiveTab]   = useState<EditorTab>('direcionamento');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>('s1');
  const [strategySearch, setStrategySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [showAllStrategies, setShowAllStrategies] = useState(false);
  // Nomes editáveis — pré-populados pelo sistema com base no período; customizáveis pela organização
  const [modeLabels, setModeLabels] = useState<Record<string, string>>(() =>
    Object.fromEntries(MODES.map(m => [m.id, m.label]))
  );


  // Direcionamento state
  const [weights, setWeights]       = useState<Record<string, DimensionWeight>>(() => ({ ...MODE_WEIGHTS.Crescimento }));
  const [showCriteria, setShowCriteria] = useState(false);
  const [showSim, setShowSim]       = useState(false);
  const [periodView, setPeriodView] = useState<PeriodView>('semana');
  const [periodIdx, setPeriodIdx]   = useState(0);
  const [expandedDim, setExpandedDim] = useState<string | null>(null);

  // Marca config — exemplo com todas as marcas pré-selecionadas
  const [selectedBrands, setSelectedBrands] = useState<string[]>([...AVAILABLE_BRANDS]);

  // Cobertura config — exemplo com apenas algumas regiões selecionadas
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Sul', 'São Paulo', 'Rio de Janeiro']);

  const toggleBrand = (b: string) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const toggleRegion = (r: string) => setSelectedRegions(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  const toggleExpanded = (id: string) => setExpandedDim(prev => prev === id ? null : id);

  // Briefing state — pré-populado conforme a estratégia selecionada
  const [briefingText, setBriefingText] = useState(() => BRIEFING_DEFAULTS['Crescimento'] ?? '');
  const [briefingStatus, setBriefingStatus] = useState<'Ativo' | 'Rascunho'>('Rascunho');

  const handleModeSelect = (modeId: string) => {
    setMode(modeId);
    setWeights({ ...MODE_WEIGHTS[modeId] ?? DEFAULT_WEIGHTS });
    setBriefingText(BRIEFING_DEFAULTS[modeId] ?? '');
  };

  const handleTemplateSelect = (t: StrategyTemplate) => {
    setSelectedTemplateId(t.id);
    setModeLabels(prev => ({ ...prev, [t.baseMode]: t.label }));
    handleModeSelect(t.baseMode);
    setShowAllStrategies(false);
  };

  const filteredTemplates = AI_STRATEGIES.filter(t => {
    const matchCat = categoryFilter === 'Todas' || t.category === categoryFilter;
    const matchSearch = !strategySearch || t.label.toLowerCase().includes(strategySearch.toLowerCase()) || t.description.toLowerCase().includes(strategySearch.toLowerCase());
    return matchCat && matchSearch;
  });
  const visibleTemplates = filteredTemplates.slice(0, 4);

  const handleSlider = (dimId: string, newPct: number) => {
    setWeights((prev) => redistributePcts(prev, dimId, newPct));
    setMode('Personalizado');
  };
  const handleLevel = (dimId: string, level: DimensionLevel) => {
    setWeights((prev) => ({ ...prev, [dimId]: { ...prev[dimId], level } }));
    setMode('Personalizado');
  };

  const totalPct = Object.values(weights).reduce((s, w) => s + w.pct, 0);
  const impact = MODE_IMPACT[mode] ?? MODE_IMPACT.Personalizado;
  const currentMode = MODES.find((m) => m.id === mode);
  const modeStyle = MODE_STYLE[mode] ?? MODE_STYLE.Personalizado;
  const ModeIcon = currentMode?.icon ?? Settings2;

  const afterOrder = AFTER_ORDER_BY_MODE[mode] ?? AFTER_ORDER_BY_MODE.Personalizado;
  const beforeClients = BEFORE_ORDER.map((i) => BASE_CLIENTS[i]);
  const afterClients = afterOrder.map((i) => BASE_CLIENTS[i]);

  const periodLabels = periodView === 'dia' ? PERIOD_DAYS : periodView === 'semana' ? PERIOD_WEEKS : PERIOD_MONTHS;
  const maxIdx = periodLabels.length - 1;

  const briefingComplete = briefingText.trim().length > 20;
  const dateLabel = startDate && endDate
    ? `${new Date(startDate+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})} – ${new Date(endDate+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'})}`
    : 'Definir período';

  return (
    <div className="p-8 space-y-6 max-w-[1200px]">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
        <div className="flex-1 min-w-0">
          <Link to="/direcionamento" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Voltar para Direcionamento
          </Link>
          <input
            type="text"
            value={strategyName}
            onChange={e => setStrategyName(e.target.value)}
            placeholder="Nome da estratégia..."
            className="text-xl font-semibold bg-transparent border-0 border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground/50 w-full pb-0.5 transition-colors"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          {/* Vigência chip */}
          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-xs hover:bg-secondary transition-colors">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                <span className="font-medium text-foreground whitespace-nowrap">{isActive ? 'Ativo' : 'Inativo'}</span>
                <span className="text-muted-foreground hidden sm:inline">{dateLabel}</span>
                <Calendar className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-0 overflow-hidden">
              <div className="px-4 py-3 space-y-3">
                <div className="text-xs font-semibold text-foreground">Período de vigência</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-muted-foreground block mb-1">Início</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full text-xs border border-border rounded-lg px-2.5 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground block mb-1">Fim</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full text-xs border border-border rounded-lg px-2.5 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <button onClick={() => setDatePopoverOpen(false)} className="w-full py-1.5 text-xs font-medium text-white rounded-lg bg-primary">Confirmar período</button>
              </div>
              <div className="border-t border-border px-4 py-3">
                <div className="text-[11px] text-muted-foreground mb-2">Ação rápida</div>
                {isActive ? (
                  <button onClick={() => { setIsActive(false); setDatePopoverOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border hover:bg-red-50 hover:border-red-200 transition-colors text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" /> Inativar agora
                  </button>
                ) : (
                  <button onClick={() => { setIsActive(true); setDatePopoverOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border hover:bg-green-50 hover:border-green-200 transition-colors text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" /> Reativar
                  </button>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <button onClick={() => navigate('/direcionamento')} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-foreground">Cancelar</button>
          <button onClick={() => navigate('/direcionamento')} className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary-hover">Salvar estratégia</button>
        </div>
      </div>

      {/* ── 1. Estratégia base ─────────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">1. Qual o foco principal desta estratégia?</h2>

        {/* Search + Ver todas */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
            <input
              type="text"
              value={strategySearch}
              onChange={e => setStrategySearch(e.target.value)}
              placeholder="Buscar estratégia sugerida..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setShowAllStrategies(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border rounded-lg hover:bg-secondary transition-colors text-foreground flex-shrink-0"
          >
            <LayoutList className="w-3.5 h-3.5" strokeWidth={1.5} />
            Ver todas
          </button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5">
          {STRATEGY_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all"
              style={categoryFilter === cat
                ? { backgroundColor: '#BE1520', color: '#fff', borderColor: '#BE1520' }
                : { backgroundColor: 'var(--card)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
              }
            >{cat}</button>
          ))}
        </div>

        {/* AI suggestions header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <Sparkles className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
              Sugeridas pela IA para o contexto atual
            </div>
            <span className="text-[11px] text-muted-foreground">Exibindo {visibleTemplates.length} de {filteredTemplates.length} estratégias detectadas</span>
          </div>
          <button
            onClick={() => { handleModeSelect('Personalizado'); setSelectedTemplateId(null); setEditingCardId('Personalizado'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-dashed border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-muted-foreground flex-shrink-0"
          >
            <span className="text-sm leading-none">+</span>
            Criar do zero
          </button>
        </div>

        {/* 4 cards */}
        {visibleTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {visibleTemplates.map(t => {
              const Icon = t.icon;
              const selected = selectedTemplateId === t.id;
              const isEditingLabel = editingCardId === t.id;
              const displayLabel = selected ? (modeLabels[t.baseMode] ?? t.label) : t.label;
              return (
                <div key={t.id} className="relative group">
                  <div
                    onClick={() => handleTemplateSelect(t)}
                    className="w-full flex flex-col gap-2 p-3.5 rounded-xl border text-left transition-all cursor-pointer h-full"
                    style={selected ? { borderColor: '#BE1520', backgroundColor: '#FDF2F2' } : { borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: selected ? '#BE1520' : 'var(--secondary)' }}>
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: selected ? '#fff' : 'var(--muted-foreground)' }} />
                      </div>
                      {selected && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                    {selected && isEditingLabel ? (
                      <input type="text" value={displayLabel} autoFocus
                        onChange={e => setModeLabels(prev => ({ ...prev, [t.baseMode]: e.target.value }))}
                        onBlur={() => setEditingCardId(null)}
                        onKeyDown={e => e.key === 'Enter' && setEditingCardId(null)}
                        onClick={e => e.stopPropagation()}
                        className="w-full text-[11px] font-semibold bg-transparent border-0 border-b focus:outline-none pb-0.5"
                        style={{ borderColor: '#BE152080', color: '#930F16' }}
                      />
                    ) : (
                      <div className="flex items-start justify-between gap-0.5 min-w-0">
                        <span className="text-[11px] font-semibold leading-snug break-words min-w-0" style={{ color: selected ? '#930F16' : 'var(--foreground)' }}>
                          {displayLabel}
                        </span>
                        {selected && (
                          <button onClick={e => { e.stopPropagation(); setEditingCardId(t.id); }}
                            className="opacity-0 group-hover:opacity-60 hover:!opacity-100 flex-shrink-0 mt-0.5 transition-opacity" title="Renomear">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#BE1520' }}>
                              <path d="M8.5 1.5l2 2L4 10H2V8L8.5 1.5z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-[10px] text-muted-foreground leading-snug">{t.context}</p>
                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
            Nenhuma estratégia encontrada para este filtro.
          </div>
        )}
      </section>

      {/* ── Drawer: Ver todas ──────────────────────────────────────────────── */}
      <Sheet open={showAllStrategies} onOpenChange={setShowAllStrategies}>
        <SheetContent side="right" className="w-full sm:max-w-[480px] overflow-y-auto p-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
            <div>
              <SheetTitle className="text-sm font-semibold text-foreground">Todas as estratégias</SheetTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{AI_STRATEGIES.length} estratégias disponíveis</p>
            </div>
            <button onClick={() => setShowAllStrategies(false)} className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors">
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" strokeWidth={1.5} />
              <input type="text" value={strategySearch} onChange={e => setStrategySearch(e.target.value)}
                placeholder="Buscar estratégia..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STRATEGY_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all"
                  style={categoryFilter === cat
                    ? { backgroundColor: '#BE1520', color: '#fff', borderColor: '#BE1520' }
                    : { backgroundColor: 'var(--card)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
                  }
                >{cat}</button>
              ))}
            </div>
            <div className="divide-y divide-border">
              {filteredTemplates.map(t => {
                const Icon = t.icon;
                const selected = selectedTemplateId === t.id;
                return (
                  <button key={t.id} onClick={() => handleTemplateSelect(t)}
                    className="w-full flex items-start gap-3 py-3.5 text-left hover:bg-secondary/50 -mx-1 px-1 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: selected ? '#BE1520' : 'var(--secondary)' }}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} style={{ color: selected ? '#fff' : 'var(--muted-foreground)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">{t.label}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-secondary text-muted-foreground">{t.category}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{t.description}</p>
                      <p className="text-[11px] mt-1 font-medium" style={{ color: '#BE1520' }}>{t.context}</p>
                    </div>
                    {selected && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                  </button>
                );
              })}
              {filteredTemplates.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">Nenhuma estratégia encontrada.</p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── 2. Tabs ────────────────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <nav className="flex gap-1">
          {[
            { id: 'direcionamento' as EditorTab, label: 'Direcionamento', desc: 'Pesos e alavancas estratégicas' },
            { id: 'briefing'       as EditorTab, label: 'Briefing',       desc: briefingComplete ? 'Instrução configurada' : 'Instrução contextual' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col px-4 pb-3 pt-2 text-sm font-medium transition-colors relative text-left ${
                activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[11px] font-normal text-muted-foreground">{tab.desc}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── Tab: Direcionamento ────────────────────────────────────────────── */}
      {activeTab === 'direcionamento' && (
        <div className="space-y-6">
          {/* Sections 2 + 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
            {/* Sliders */}
            <section className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold text-foreground">2. Ajuste as alavancas estratégicas</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={totalPct === 100 ? { backgroundColor: '#F5F5F4', color: '#44403C' } : { backgroundColor: '#FDF2F2', color: '#BE1520' }}>
                  {totalPct}%
                </span>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
                {DIMENSIONS.map((dim) => {
                  const w = weights[dim.id] ?? { pct: 20, level: 'Média' as DimensionLevel };
                  const Icon = dim.icon;
                  const fillPct = Math.min((w.pct / 60) * 100, 100);
                  const isExpandable = dim.id === 'mix' || dim.id === 'cobertura';
                  const isExpanded = expandedDim === dim.id;
                  const isDisabled = (dim.id === 'mix' && selectedBrands.length === 0) || (dim.id === 'cobertura' && selectedRegions.length === 0);

                  return (
                    <div key={dim.id}>
                      <div className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-xs font-medium text-foreground truncate">{dim.label}</span>
                                {isExpandable && (
                                  <button
                                    onClick={() => toggleExpanded(dim.id)}
                                    className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors flex-shrink-0"
                                    style={isExpanded
                                      ? { backgroundColor: dim.color + '18', color: dim.color }
                                      : { backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)' }
                                    }
                                  >
                                    {dim.id === 'mix'
                                      ? (selectedBrands.length > 0 ? `${selectedBrands.length} marca${selectedBrands.length > 1 ? 's' : ''}` : 'Selecionar')
                                      : (selectedRegions.length > 0 ? `${selectedRegions.length} região${selectedRegions.length > 1 ? 'ões' : ''}` : 'Selecionar')
                                    }
                                    {isExpanded ? <ChevronUp className="w-2.5 h-2.5 ml-0.5" strokeWidth={2} /> : <ChevronDown className="w-2.5 h-2.5 ml-0.5" strokeWidth={2} />}
                                  </button>
                                )}
                              </div>
                              <span className={`text-xs font-semibold tabular-nums flex-shrink-0 ${isDisabled ? 'text-muted-foreground/40' : 'text-foreground'}`}>{w.pct}%</span>
                            </div>
                            <input type="range" min={0} max={60} value={w.pct}
                              disabled={isDisabled}
                              onChange={(e) => handleSlider(dim.id, Number(e.target.value))}
                              className={`w-full h-1 rounded-full appearance-none ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                              style={{ accentColor: dim.color, background: isDisabled
                                ? 'var(--border)'
                                : `linear-gradient(to right, ${dim.color} 0%, ${dim.color} ${fillPct}%, var(--border) ${fillPct}%, var(--border) 100%)` }} />
                          </div>
                        </div>
                      </div>

                      {/* ── Painel expansível: Marca ── */}
                      {isExpanded && dim.id === 'mix' && (
                        <div className="px-4 pb-4 pt-1 border-t border-border bg-secondary/20 space-y-3">
                          <div className="text-[11px] text-muted-foreground">Selecione as marcas que devem ser priorizadas na rota. O percentual acima define o peso desta alavanca.</div>
                          <div className="flex flex-wrap gap-1.5">
                            {AVAILABLE_BRANDS.map((brand) => {
                              const active = selectedBrands.includes(brand);
                              return (
                                <button
                                  key={brand}
                                  onClick={() => toggleBrand(brand)}
                                  className="px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all"
                                  style={active
                                    ? { backgroundColor: dim.color + '18', color: dim.color, borderColor: dim.color + '60' }
                                    : { backgroundColor: 'var(--card)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
                                  }
                                >
                                  {brand}
                                </button>
                              );
                            })}
                          </div>
                          {selectedBrands.length === 0 && (
                            <p className="text-[11px] text-muted-foreground/60 italic">Nenhuma marca selecionada — todos os clientes serão considerados.</p>
                          )}
                        </div>
                      )}

                      {/* ── Painel expansível: Cobertura territorial ── */}
                      {isExpanded && dim.id === 'cobertura' && (
                        <div className="px-4 pb-4 pt-1 border-t border-border bg-secondary/20 space-y-3">
                          <div className="text-[11px] text-muted-foreground">Selecione as regiões alvo e defina a meta de cobertura. Apenas clientes nessas regiões serão priorizados por esta alavanca.</div>
                          <div className="flex flex-wrap gap-1.5">
                            {AVAILABLE_REGIONS.map((region) => {
                              const active = selectedRegions.includes(region);
                              return (
                                <button
                                  key={region}
                                  onClick={() => toggleRegion(region)}
                                  className="px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all"
                                  style={active
                                    ? { backgroundColor: dim.color + '18', color: dim.color, borderColor: dim.color + '60' }
                                    : { backgroundColor: 'var(--card)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
                                  }
                                >
                                  {region}
                                </button>
                              );
                            })}
                          </div>
                          {selectedRegions.length === 0 && (
                            <p className="text-[11px] text-muted-foreground/60 italic">Nenhuma região selecionada — a cobertura se aplica a toda a carteira.</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setShowCriteria(v => !v)} className="flex items-center gap-1 text-xs transition-colors text-muted-foreground hover:text-foreground">
                {showCriteria ? <ChevronUp className="w-3 h-3" strokeWidth={1.5} /> : <ChevronDown className="w-3 h-3" strokeWidth={1.5} />}
                Ver critérios utilizados em cada grupo
              </button>
              {showCriteria && (
                <div className="p-3 rounded-xl border border-border bg-secondary/30 space-y-2">
                  {DIMENSIONS.map((dim) => (
                    <div key={dim.id} className="flex gap-2">
                      <span className="text-[11px] font-semibold flex-shrink-0 w-28 leading-relaxed" style={{ color: dim.color }}>{dim.label}</span>
                      <span className="text-[11px] text-muted-foreground leading-relaxed">{CRITERIA_DETAIL[dim.id].join(' · ')}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Impact */}
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-foreground">3. Impacto previsto com esta configuração</h2>
              <div className="bg-card border border-border rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                  <TrendingUp className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium text-foreground">A IA irá priorizar clientes com este perfil:</span>
                </div>
                <div className="divide-y divide-border">
                  {impact.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 py-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color + '18' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground leading-snug">{item.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{item.description}</div>
                      </div>
                      <span className="text-xs font-semibold flex-shrink-0 tabular-nums" style={{ color: item.positive ? '#BE1520' : '#78716C' }}>
                        {item.positive ? '+' : '-'}{item.pct}%
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowSim(true)} className="flex items-center gap-1 text-xs transition-colors pt-0.5 hover:opacity-70 text-muted-foreground hover:text-foreground">
                  Ver detalhes da simulação <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </section>
          </div>

          {/* Section 4: Before/After */}
          <section className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">4. Como isso se traduz na rota do representante</h2>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center bg-secondary rounded-lg p-0.5 text-xs">
                  {(['dia','semana','mes'] as PeriodView[]).map((v) => (
                    <button key={v} onClick={() => { setPeriodView(v); setPeriodIdx(0); }}
                      className="px-2.5 py-1 rounded-md transition-colors font-medium capitalize"
                      style={periodView === v ? { backgroundColor: 'var(--card)', color: 'var(--foreground)' } : { color: 'var(--muted-foreground)' }}>
                      {v === 'mes' ? 'mês' : v}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 bg-card border border-border rounded-lg px-2 py-1.5">
                  <button onClick={() => setPeriodIdx(i => Math.max(0, i-1))} disabled={periodIdx === 0} className="text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="text-xs font-medium text-foreground whitespace-nowrap min-w-[110px] text-center">{periodLabels[periodIdx]}</span>
                  <button onClick={() => setPeriodIdx(i => Math.min(maxIdx, i+1))} disabled={periodIdx === maxIdx} className="text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-secondary/30">
                  <div className="text-xs font-semibold text-muted-foreground">Antes do direcionamento</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Ordem baseada apenas no score de IA</div>
                </div>
                <div className="px-3 py-2"><ClientList clients={beforeClients} /></div>
              </div>
              <div className="bg-card border rounded-xl overflow-hidden" style={{ borderColor: '#BE152040' }}>
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#BE152030', backgroundColor: '#FDF2F260' }}>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#930F16' }}>Com direcionamento — {currentMode?.label}</div>
                    <div className="text-[11px] mt-0.5 text-muted-foreground">Reordenado pela estratégia selecionada</div>
                  </div>
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-primary">
                    <TrendingUp className="w-3 h-3 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="px-3 py-2"><ClientList clients={afterClients} highlight /></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── Tab: Briefing ──────────────────────────────────────────────────── */}
      {activeTab === 'briefing' && (
        <div className="space-y-5">

          {/* Top: instrução + prévia lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">

            {/* Left: instrução */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <h2 className="text-sm font-semibold text-foreground">Instrução contextual</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Escreva o contexto que a IA deve incorporar ao briefing exibido ao representante antes de cada visita.
              </p>
              <textarea
                rows={6}
                value={briefingText}
                onChange={e => setBriefingText(e.target.value.slice(0, 500))}
                placeholder={`Ex: Apresentar a estratégia de ${mode.toLowerCase()} como prioridade nas visitas...`}
                className="w-full px-3 py-2 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <div className="text-[11px] text-muted-foreground">{briefingText.length}/500 caracteres</div>
            </div>

            {/* Right: prévia */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prévia — como o rep verá</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: modeStyle.bg }}>
                    <ModeIcon className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: modeStyle.text }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{strategyName || 'Nome da estratégia'}</span>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-ai-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-xs text-foreground leading-relaxed">
                      {briefingText || 'O briefing gerado pela IA será exibido aqui com base no contexto que você definir acima.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: estimativa de alcance — largura total */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estimativa de alcance</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-semibold text-foreground">38</div>
                <div className="text-xs text-muted-foreground mt-0.5">Representantes</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-semibold text-foreground">~699</div>
                <div className="text-xs text-muted-foreground mt-0.5">Visitas/semana</div>
              </div>
              <div className="sm:col-span-2 flex flex-col justify-center space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Aderência média esperada</span>
                  <span className="font-semibold text-foreground">65%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                </div>
                <p className="text-[11px] text-muted-foreground">Baseado em instruções similares anteriores.</p>
              </div>
            </div>
          </div>

        </div>
      )}


      {/* ── Simulation Sheet ──────────────────────────────────────────────── */}
      <Sheet open={showSim} onOpenChange={setShowSim}>
        <SheetContent side="right" className="w-full sm:max-w-[520px] overflow-y-auto p-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
            <div>
              <SheetTitle className="text-sm font-semibold text-foreground">Detalhes da simulação</SheetTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Modo: {currentMode?.label} · últimos 90 dias</p>
            </div>
            <button onClick={() => setShowSim(false)} className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors">
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-6 py-5 space-y-7">
            {/* 1. Distribuição */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Distribuição de clientes por perfil</h3>
              <div className="space-y-2.5">
                {(SIM_PROFILES[mode] ?? SIM_PROFILES.Personalizado).map((p) => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between mb-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="font-medium text-foreground">{p.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground tabular-nums">
                        <span>{p.clients} clientes</span>
                        <span className="font-semibold text-foreground w-8 text-right">{p.pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="h-px bg-border" />
            {/* 2. Projeção */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projeção de visitas por semana</h3>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Semana</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Alto pot.</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Churn</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Coleção</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Outros</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(WEEK_PROJECTIONS[mode] ?? WEEK_PROJECTIONS.Personalizado).map((row) => {
                      const total = row.alto + row.churn + row.colecao + row.outros;
                      return (
                        <tr key={row.week} className="hover:bg-secondary/40 transition-colors">
                          <td className="px-3 py-2.5 font-medium text-foreground">{row.week}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-foreground">{row.alto}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-foreground">{row.churn}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-foreground">{row.colecao}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{row.outros}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-foreground">{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
            <div className="h-px bg-border" />
            {/* 3. Receita */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impacto estimado em receita</h3>
              <div className="space-y-2">
                {(REVENUE_SCENARIOS[mode] ?? REVENUE_SCENARIOS.Personalizado).map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: s.bg }}>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-muted-foreground mb-0.5">{s.label}</div>
                      <div className="text-base font-semibold" style={{ color: s.color }}>{s.value}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold tabular-nums" style={{ color: s.color }}>{s.pct}%</div>
                      <div className="text-[10px] text-muted-foreground">da meta</div>
                    </div>
                    <div className="w-20 h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(s.pct, 100)}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="h-px bg-border" />
            {/* 4. Comparativo */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comparativo com configuração anterior</h3>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-muted-foreground">Métrica</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Antes</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Depois</th>
                      <th className="px-3 py-2 text-right font-medium text-muted-foreground">Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(PREV_COMPARISON[mode] ?? PREV_COMPARISON.Personalizado).map((row) => (
                      <tr key={row.metric} className="hover:bg-secondary/40 transition-colors">
                        <td className="px-3 py-2.5 text-foreground">{row.metric}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">{row.before}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums font-medium text-foreground">{row.after}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums font-semibold" style={{ color: row.positive ? '#BE1520' : '#78716C' }}>{row.delta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-muted-foreground">Configuração anterior: Rentabilidade · 01/06 – 25/08/2026</p>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
