import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Representatives } from './pages/Representatives';
import { RepresentativeProfile } from './pages/RepresentativeProfile';
import { Clients } from './pages/Clients';
import { ClientProfile } from './pages/ClientProfile';
import { FieldAudit } from './pages/FieldAudit';
import { OccurrenceDetail } from './pages/OccurrenceDetail';
import { Territories } from './pages/Territories';
import { TerritoryDetail } from './pages/TerritoryDetail';
import { Coverage } from './pages/Coverage';
import { Goals } from './pages/Goals';
import { AIEngine } from './pages/AIEngine';
import { CompetitiveIntelligence } from './pages/CompetitiveIntelligence';
import { Administration } from './pages/Administration';
import { FormBuilder } from './pages/FormBuilder';
import { FormEditor } from './pages/FormEditor';
import { Campaigns } from './pages/Campaigns';
import { Settings } from './pages/Settings';
import { CommercialSteering } from './pages/CommercialSteering';
import { SteeringRoute } from './pages/SteeringRoute';
import { SteeringRuleEditor } from './pages/SteeringRuleEditor';
import { SteeringPriority } from './pages/SteeringPriority';
import { SteeringBriefing } from './pages/SteeringBriefing';
import { SteeringMissions } from './pages/SteeringMissions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="representatives" element={<Representatives />} />
          <Route path="representatives/:id" element={<RepresentativeProfile />} />
          <Route path="territories" element={<Territories />} />
          <Route path="territories/:id" element={<TerritoryDetail />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientProfile />} />
          <Route path="field-audit" element={<FieldAudit />} />
          <Route path="field-audit/:id" element={<OccurrenceDetail />} />
          <Route path="coverage" element={<Coverage />} />
          <Route path="goals" element={<Goals />} />
          <Route path="ai-engine" element={<AIEngine />} />
          <Route path="intelligence" element={<CompetitiveIntelligence />} />
          <Route path="administration" element={<Administration />} />
          <Route path="form-builder" element={<FormBuilder />} />
          <Route path="form-builder/novo" element={<FormEditor />} />
          <Route path="form-builder/:id" element={<FormEditor />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="settings" element={<Settings />} />
          <Route path="steering" element={<CommercialSteering />} />
          <Route path="steering/route" element={<SteeringRoute />} />
          <Route path="direcionamento" element={<SteeringRoute />} />
          <Route path="direcionamento/nova" element={<SteeringRuleEditor />} />
          <Route path="direcionamento/:id" element={<SteeringRuleEditor />} />
          <Route path="steering/priority" element={<SteeringPriority />} />
          <Route path="steering/briefing" element={<SteeringBriefing />} />
          <Route path="steering/missions" element={<SteeringMissions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
