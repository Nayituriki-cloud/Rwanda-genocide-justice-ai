import React from 'react';
import { 
  Search, Shield, FileText, Users, MapPin, Scale, AlertOctagon, 
  ExternalLink, ArrowRight, Eye, CheckCircle2, Clock, BookOpen, UserCheck, ShieldAlert
} from 'lucide-react';
import { CaseRecord, EvidenceItem, WantedPerson, SubmittedLead, UserRole } from '../types';

interface InvestigateDashboardProps {
  cases: CaseRecord[];
  evidence: EvidenceItem[];
  wantedPersons: WantedPerson[];
  leads: SubmittedLead[];
  onNavigate: (tab: string, filter?: string) => void;
  currentRole: UserRole;
}

export const InvestigateDashboard: React.FC<InvestigateDashboardProps> = ({
  cases,
  evidence,
  wantedPersons,
  leads,
  onNavigate,
  currentRole
}) => {
  const convictedCount = cases.filter(c => c.legalStatus === 'CONVICTED').length;
  const indictedCount = cases.filter(c => c.legalStatus === 'ACCUSED / INDICTED').length;
  const wantedCount = cases.filter(c => c.legalStatus === 'WANTED BY AUTHORITY').length;
  const allegationCount = cases.filter(c => c.legalStatus === 'ALLEGATION / UNVERIFIED').length;
  const clearedCount = cases.filter(c => c.legalStatus === 'CLEARED / ACQUITTED').length;

  return (
    <div className="space-y-6">
      {/* Hero Mandate Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>CENTRAL INVESTIGATIVE REPOSITORY & EVIDENCE MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100 tracking-wide">
            Support for Lawful Accountability & Historical Truth
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Dedicated to documenting, preserving evidence, and supporting lawful investigation of crimes connected to the
            <strong className="text-amber-200 ml-1">1994 Genocide against the Tutsi in Rwanda</strong>. Powered by verified judicial records from the International Criminal Tribunal for Rwanda (ICTR), the UN International Residual Mechanism (IRMCT), and Rwandan National Public Prosecution Authority (NPPA).
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <button
              onClick={() => onNavigate('ai-investigator')}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold flex items-center gap-1.5 shadow-lg shadow-amber-950/50 transition-colors"
            >
              <span>Launch AI Investigator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('lead')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Submit Information (Lead)</span>
            </button>
            <button
              onClick={() => onNavigate('evidence')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Browse Evidence Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Key Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <button
          onClick={() => onNavigate('cases', 'CONVICTED')}
          className="text-left bg-slate-900/90 border border-slate-800 hover:border-emerald-600/50 p-4 rounded-xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>CONVICTED</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono group-hover:scale-105 transition-transform">
            {convictedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Final judicial verdicts</div>
        </button>

        <button
          onClick={() => onNavigate('cases', 'ACCUSED / INDICTED')}
          className="text-left bg-slate-900/90 border border-slate-800 hover:border-blue-600/50 p-4 rounded-xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>INDICTED</span>
            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-400 mt-2 font-mono group-hover:scale-105 transition-transform">
            {indictedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Under judicial process</div>
        </button>

        <button
          onClick={() => onNavigate('wanted')}
          className="text-left bg-slate-900/90 border border-slate-800 hover:border-red-600/50 p-4 rounded-xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>WANTED BY AUTH.</span>
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-red-400 mt-2 font-mono group-hover:scale-105 transition-transform">
            {wantedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Official Red Notices</div>
        </button>

        <button
          onClick={() => onNavigate('cases', 'ALLEGATION / UNVERIFIED')}
          className="text-left bg-slate-900/90 border border-slate-800 hover:border-amber-600/50 p-4 rounded-xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>PRELIMINARY</span>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-2 font-mono group-hover:scale-105 transition-transform">
            {allegationCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Unverified inquiry leads</div>
        </button>

        <button
          onClick={() => onNavigate('cases', 'CLEARED / ACQUITTED')}
          className="text-left bg-slate-900/90 border border-slate-800 hover:border-purple-600/50 p-4 rounded-xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>ACQUITTED</span>
            <span className="h-2 w-2 rounded-full bg-purple-500" />
          </div>
          <div className="text-2xl font-bold text-purple-300 mt-2 font-mono group-hover:scale-105 transition-transform">
            {clearedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Affirmed under rule of law</div>
        </button>
      </div>

      {/* Main Grid: Wanted Persons Notices + Live Evidence Vault Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Official Wanted Persons / Red Notices */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <h2 className="font-cinzel text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Verified Wanted Persons
                </h2>
              </div>
              <button
                onClick={() => onNavigate('wanted')}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {wantedPersons.slice(0, 3).map((w) => (
                <div key={w.id} className="p-3 bg-slate-950 border border-red-900/30 rounded-lg space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-xs text-slate-100">{w.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">Case: {w.caseNumber}</p>
                    </div>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-red-950 text-red-300 border border-red-800 rounded">
                      RED NOTICE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {w.lastKnownContext}
                  </p>
                  <div className="p-1.5 rounded bg-red-950/40 border border-red-900/40 text-[10px] text-red-300 italic">
                    ⚠️ {w.mandatoryWarning}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <button
                onClick={() => onNavigate('tracking')}
                className="text-xs text-slate-400 hover:text-slate-200 font-mono flex items-center justify-center gap-1 mx-auto"
              >
                <span>Fugitive Tracking Intelligence Unit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Citizen Lead Triage Feed (For Investigators) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h2 className="font-cinzel text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Intelligence Leads Queue
                </h2>
              </div>
              <button
                onClick={() => onNavigate('lead')}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                Submit New
              </button>
            </div>

            <div className="space-y-2.5">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400">{lead.id}</span>
                    <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded ${
                      lead.aiClassification === 'POTENTIALLY IMPORTANT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      lead.aiClassification === 'DUPLICATE' ? 'bg-slate-800 text-slate-400' :
                      'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {lead.aiClassification || 'PENDING TRIAGE'}
                    </span>
                  </div>
                  <div className="font-medium text-slate-200 text-[11px] truncate">
                    {lead.personInvolved}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    {lead.locationReported}
                  </div>
                  {lead.aiConfidenceMatch && (
                    <div className="text-[10px] text-emerald-400 font-mono pt-0.5">
                      Match Confidence: {lead.aiConfidenceMatch}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Evidence Vault Spotlight & Interactive Tools */}
        <div className="lg:col-span-2 space-y-4">
          {/* Workflow Pipeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h2 className="font-cinzel text-sm font-bold text-slate-200 uppercase tracking-wide mb-3">
              Standard Investigation & Judicial Pipeline
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">1. LEAD</div>
                <div className="text-[11px] text-slate-400 font-sans">Citizen tip or diplomatic archive intake</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-blue-400 font-bold">2. VERIFY</div>
                <div className="text-[11px] text-slate-400 font-sans">Cross-check against authentic tribunal files</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold">3. INVESTIGATE</div>
                <div className="text-[11px] text-slate-400 font-sans">Corroborate witnesses, fuel logs, and forensics</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">4. ACTION</div>
                <div className="text-[11px] text-slate-400 font-sans">Interpol Red Notice & lawful police arrest</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-amber-300 font-bold">5. JUDICIAL</div>
                <div className="text-[11px] text-slate-400 font-sans">Fair trial before competent national or UN court</div>
              </div>
            </div>
          </div>

          {/* Admitted Evidence Highlights */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h2 className="font-cinzel text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Admitted Evidence Vault (SHA-256 Verified)
                </h2>
              </div>
              <button
                onClick={() => onNavigate('evidence')}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono"
              >
                Open Full Vault
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {evidence.slice(0, 4).map((item) => (
                <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 text-slate-300 rounded">
                        {item.type}
                      </span>
                      <h3 className="font-semibold text-xs text-slate-100 mt-1 line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[10px] font-mono text-slate-500 truncate">
                    HASH: {item.sha256Hash}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Exploration Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigate('map')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-600/50 transition-all text-left group"
            >
              <MapPin className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-cinzel font-semibold text-xs text-slate-100">Historical Map</div>
              <div className="text-[11px] text-slate-400 mt-1">Explore Murambi, Nyange, Bisesero & Kigali incidents</div>
            </button>

            <button
              onClick={() => onNavigate('timeline')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-600/50 transition-all text-left group"
            >
              <Clock className="w-5 h-5 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-cinzel font-semibold text-xs text-slate-100">1994 Timeline</div>
              <div className="text-[11px] text-slate-400 mt-1">Trace Date → Location → Event → Evidence → Court</div>
            </button>

            <button
              onClick={() => onNavigate('witness')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-600/50 transition-all text-left group"
            >
              <Eye className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-cinzel font-semibold text-xs text-slate-100">Protected Witnesses</div>
              <div className="text-[11px] text-slate-400 mt-1">Rule 75 sealed transcripts & reliability assessments</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
