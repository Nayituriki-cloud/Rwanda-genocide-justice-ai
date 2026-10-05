/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { EthicalBanner } from './components/EthicalBanner';
import { InvestigateDashboard } from './components/InvestigateDashboard';
import { CasesModule } from './components/CasesModule';
import { EvidenceVault } from './components/EvidenceVault';
import { WantedPersonsModule } from './components/WantedPersonsModule';
import { FugitiveTrackingModule } from './components/FugitiveTrackingModule';
import { HistoricalMap } from './components/HistoricalMap';
import { TimelineModule } from './components/TimelineModule';
import { WitnessProtectionModule } from './components/WitnessProtectionModule';
import { AiInvestigatorModule } from './components/AiInvestigatorModule';
import { CaseBuilderModule } from './components/CaseBuilderModule';
import { CourtRecordsModule } from './components/CourtRecordsModule';
import { ArchivesModule } from './components/ArchivesModule';
import { LeadSubmissionModule } from './components/LeadSubmissionModule';
import { SecurityCenter } from './components/SecurityCenter';
import { PublicEducationModule } from './components/PublicEducationModule';
import { DownloadCenterModal } from './components/DownloadCenterModal';

import { 
  CaseRecord, EvidenceItem, WantedPerson, FugitiveTrackDossier, 
  TimelineEvent, HistoricalLocation, CourtRecord, SubmittedLead, 
  AuditLogEntry, WitnessRecord, UserRole 
} from './types';

import { CASE_RECORDS } from './data/cases';
import { EVIDENCE_ITEMS } from './data/evidence';
import { VERIFIED_WANTED_PERSONS, FUGITIVE_TRACKING_DOSSIERS } from './data/wanted';
import { TIMELINE_EVENTS } from './data/timeline';
import { HISTORICAL_LOCATIONS } from './data/locations';
import { COURT_RECORDS } from './data/courtRecords';
import { PROTECTED_WITNESSES } from './data/witnesses';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('Investigator');
  const [activeTab, setActiveTab] = useState<string>('investigate');

  // Datasets
  const [cases, setCases] = useState<CaseRecord[]>(CASE_RECORDS);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(EVIDENCE_ITEMS);
  const [wantedPersons, setWantedPersons] = useState<WantedPerson[]>(VERIFIED_WANTED_PERSONS);
  const [fugitiveDossiers, setFugitiveDossiers] = useState<FugitiveTrackDossier[]>(FUGITIVE_TRACKING_DOSSIERS);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(TIMELINE_EVENTS);
  const [locations, setLocations] = useState<HistoricalLocation[]>(HISTORICAL_LOCATIONS);
  const [courtRecords, setCourtRecords] = useState<CourtRecord[]>(COURT_RECORDS);
  const [witnesses, setWitnesses] = useState<WitnessRecord[]>(PROTECTED_WITNESSES);
  const [leads, setLeads] = useState<SubmittedLead[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Inter-tab prefill states
  const [initialCaseStatusFilter, setInitialCaseStatusFilter] = useState<string | null>(null);
  const [aiPrefilledQuery, setAiPrefilledQuery] = useState<string>('');
  const [caseBuilderInitialCaseId, setCaseBuilderInitialCaseId] = useState<string | null>(null);
  const [leadPrefilledPerson, setLeadPrefilledPerson] = useState<string>('');
  const [isDownloadCenterOpen, setIsDownloadCenterOpen] = useState<boolean>(false);

  // Fetch live data from backend server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesRes, evRes, wantedRes, tlRes, locRes, crRes, witRes, leadsRes, logsRes] = await Promise.all([
          fetch('/api/cases').catch(() => null),
          fetch('/api/evidence').catch(() => null),
          fetch('/api/wanted').catch(() => null),
          fetch('/api/timeline').catch(() => null),
          fetch('/api/locations').catch(() => null),
          fetch('/api/court-records').catch(() => null),
          fetch(`/api/witnesses?role=${encodeURIComponent(currentRole)}`).catch(() => null),
          fetch('/api/leads').catch(() => null),
          fetch('/api/audit-logs').catch(() => null),
        ]);

        if (casesRes?.ok) {
          const d = await casesRes.json();
          if (d.cases) setCases(d.cases);
        }
        if (evRes?.ok) {
          const d = await evRes.json();
          if (d.evidence) setEvidence(d.evidence);
        }
        if (wantedRes?.ok) {
          const d = await wantedRes.json();
          if (d.wantedPersons) setWantedPersons(d.wantedPersons);
          if (d.dossiers) setFugitiveDossiers(d.dossiers);
        }
        if (tlRes?.ok) {
          const d = await tlRes.json();
          if (d.timeline) setTimeline(d.timeline);
        }
        if (locRes?.ok) {
          const d = await locRes.json();
          if (d.locations) setLocations(d.locations);
        }
        if (crRes?.ok) {
          const d = await crRes.json();
          if (d.records) setCourtRecords(d.records);
        }
        if (witRes?.ok) {
          const d = await witRes.json();
          if (d.witnesses) setWitnesses(d.witnesses);
        }
        if (leadsRes?.ok) {
          const d = await leadsRes.json();
          if (d.leads) setLeads(d.leads);
        }
        if (logsRes?.ok) {
          const d = await logsRes.json();
          if (d.logs) setAuditLogs(d.logs);
        }
      } catch (e) {
        console.error('Error fetching backend records:', e);
      }
    };

    fetchData();
  }, [currentRole]);

  // Handler for navigation with filters
  const handleNavigate = (tab: string, filter?: string) => {
    setActiveTab(tab);
    if (tab === 'cases' && filter) {
      setInitialCaseStatusFilter(filter);
    } else {
      setInitialCaseStatusFilter(null);
    }
  };

  const handleSelectCaseForAI = (caseId: string) => {
    const c = cases.find(item => item.id === caseId);
    if (c) {
      setAiPrefilledQuery(`Analyze the documentary evidence and witness references for case ${c.caseNumber} (${c.suspectName}). What corroborating primary exhibits support the charges?`);
    }
    setActiveTab('ai-investigator');
  };

  const handleSelectCaseForBuilder = (caseId: string) => {
    setCaseBuilderInitialCaseId(caseId);
    setActiveTab('case-builder');
  };

  const handleSubmitLeadForPerson = (personName: string) => {
    setLeadPrefilledPerson(personName);
    setActiveTab('lead');
  };

  const handleAnalyzeDocument = (docTitle: string) => {
    setAiPrefilledQuery(`Cross-reference the document "${docTitle}" against tribunal case judgments and contemporaneous records.`);
    setActiveTab('ai-investigator');
  };

  const handleRefreshLogs = async () => {
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const d = await res.json();
        if (d.logs) setAuditLogs(d.logs);
      }
    } catch (err) {
      console.error('Failed to refresh logs:', err);
    }
  };

  const isWitnessAuthorized = currentRole === 'Investigator' || currentRole === 'Prosecutor' || currentRole === 'Administrator';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* Institutional Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenDownloadCenter={() => setIsDownloadCenterOpen(true)}
      />

      {/* Mandatory Anti-Vigilante & Rule of Law Banner */}
      <EthicalBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'investigate' && (
          <InvestigateDashboard
            cases={cases}
            evidence={evidence}
            wantedPersons={wantedPersons}
            leads={leads}
            onNavigate={handleNavigate}
            currentRole={currentRole}
          />
        )}

        {activeTab === 'cases' && (
          <CasesModule
            cases={cases}
            initialStatusFilter={initialCaseStatusFilter}
            onSelectCaseForAI={handleSelectCaseForAI}
            onSelectCaseForBuilder={handleSelectCaseForBuilder}
            currentRole={currentRole}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceVault
            evidence={evidence}
            currentRole={currentRole}
            onInvestigateEvidence={(id) => {
              setAiPrefilledQuery(`Examine the authenticity, custody log, and trial relevance of exhibit ${id}.`);
              setActiveTab('ai-investigator');
            }}
          />
        )}

        {activeTab === 'wanted' && (
          <WantedPersonsModule
            wantedPersons={wantedPersons}
            onSubmitLeadForPerson={handleSubmitLeadForPerson}
          />
        )}

        {activeTab === 'tracking' && (
          <FugitiveTrackingModule
            dossiers={fugitiveDossiers}
            currentRole={currentRole}
            onNavigateToLeads={() => setActiveTab('lead')}
          />
        )}

        {activeTab === 'map' && (
          <HistoricalMap
            locations={locations}
            cases={cases}
            onSelectCase={(id) => {
              handleNavigate('cases');
            }}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineModule
            timeline={timeline}
            evidence={evidence}
            courtRecords={courtRecords}
            onSelectEvidence={(evId) => setActiveTab('evidence')}
            onSelectCourtRecord={(recId) => setActiveTab('court')}
          />
        )}

        {activeTab === 'witness' && (
          <WitnessProtectionModule
            witnesses={witnesses}
            currentRole={currentRole}
            isAuthorized={isWitnessAuthorized}
            onRequestRoleUpgrade={() => setCurrentRole('Investigator')}
          />
        )}

        {activeTab === 'ai-investigator' && (
          <AiInvestigatorModule
            currentRole={currentRole}
            prefilledQuery={aiPrefilledQuery}
          />
        )}

        {activeTab === 'case-builder' && (
          <CaseBuilderModule
            cases={cases}
            initialCaseId={caseBuilderInitialCaseId}
            currentRole={currentRole}
          />
        )}

        {activeTab === 'court' && (
          <CourtRecordsModule
            records={courtRecords}
          />
        )}

        {activeTab === 'archives' && (
          <ArchivesModule
            evidence={evidence}
            onAnalyzeDocument={handleAnalyzeDocument}
          />
        )}

        {activeTab === 'lead' && (
          <LeadSubmissionModule
            leads={leads}
            onLeadSubmitted={(newLead) => {
              setLeads([newLead, ...leads]);
            }}
            currentRole={currentRole}
            prefilledPerson={leadPrefilledPerson}
          />
        )}

        {activeTab === 'education' && (
          <PublicEducationModule
            onNavigateToTimeline={() => setActiveTab('timeline')}
            onNavigateToCourt={() => setActiveTab('court')}
          />
        )}

        {activeTab === 'security' && (
          <SecurityCenter
            logs={auditLogs}
            currentRole={currentRole}
            onRefreshLogs={handleRefreshLogs}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <div className="font-cinzel text-sm font-bold text-slate-300 uppercase tracking-wider">
              RWANDA GENOCIDE JUSTICE AI
            </div>
            <div className="font-serif italic text-slate-400">
              “Truth through evidence. Justice through law. Memory for generations.”
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] text-slate-400">
            <span className="text-amber-400">REMEMBER</span>
            <span>→</span>
            <span className="text-blue-400">DOCUMENT</span>
            <span>→</span>
            <span className="text-emerald-400">VERIFY</span>
            <span>→</span>
            <span className="text-purple-400">INVESTIGATE</span>
            <span>→</span>
            <span className="text-slate-200">JUSTICE</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            <div>ICTR • IRMCT • NPPA Collaborative Support</div>
            <div className="mt-0.5">Strict Presumption of Innocence • Non-Vigilante Mandate</div>
          </div>
        </div>
      </footer>

      {/* Central Easy Download Center Modal */}
      <DownloadCenterModal
        isOpen={isDownloadCenterOpen}
        onClose={() => setIsDownloadCenterOpen(false)}
        cases={cases}
        evidence={evidence}
        wantedPersons={wantedPersons}
        timeline={timeline}
        auditLogs={auditLogs}
      />
    </div>
  );
}
