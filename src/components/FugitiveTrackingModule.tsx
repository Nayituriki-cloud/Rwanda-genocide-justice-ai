import React from 'react';
import { Target, Globe, Shield, FileCheck, AlertTriangle, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { FugitiveTrackDossier, UserRole } from '../types';

interface FugitiveTrackingModuleProps {
  dossiers: FugitiveTrackDossier[];
  currentRole: UserRole;
  onNavigateToLeads: () => void;
}

export const FugitiveTrackingModule: React.FC<FugitiveTrackingModuleProps> = ({
  dossiers,
  currentRole,
  onNavigateToLeads
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Authorized Fugitive Tracking Unit (FTU)
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cooperative intelligence dashboard for UN IRMCT Office of the Prosecutor and National Public Prosecution Authority (NPPA).
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>UN Mechanism Tracking Protocols Active</span>
          </div>
        </div>

        {/* Operational doctrine statement */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="font-mono text-amber-400 font-bold uppercase text-[11px]">
            Institutional Tracking Doctrine:
          </div>
          <p className="text-slate-300 leading-relaxed">
            The UN International Residual Mechanism for Criminal Tribunals operates without an independent police force. As demonstrated in the historic captures of <strong className="text-slate-100">Félicien Kabuga (France, 2020)</strong> and <strong className="text-slate-100">Fulgence Kayishema (South Africa, 2023)</strong>, apprehension relies entirely upon forensic document analysis, telecom tracing, intelligence sharing, and execution by sovereign national law-enforcement agencies under Mutual Legal Assistance (MLA).
          </p>
          <div className="pt-1 font-mono text-[11px] text-amber-300 font-semibold">
            LEAD → VERIFY → HUMAN INVESTIGATION → LAW-ENFORCEMENT ACTION → LAWFUL ARREST → JUDICIAL PROCESS
          </div>
        </div>
      </div>

      {/* Active Fugitive Tracking Files */}
      <div className="space-y-6">
        {dossiers.map((d) => (
          <div
            key={d.fugitiveId}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-red-950 text-red-300 border border-red-800 rounded">
                  {d.caseStatus}
                </span>
                <h2 className="font-cinzel text-lg font-bold text-slate-100 mt-1">
                  Target: {d.name}
                </h2>
                <p className="text-xs text-slate-400 font-mono">Notice: {d.officialWantedNotice}</p>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono text-slate-400">Investigative Leads Logged</div>
                <div className="text-xl font-bold text-amber-400 font-mono">{d.investigativeLeadsCount} Dossiers</div>
              </div>
            </div>

            {/* Grid: Locations & Last Verified Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                  Confirmed Historic Transit Points & Locations
                </div>
                <ul className="space-y-1 text-slate-300">
                  {d.previousConfirmedLocations.map((loc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-amber-500 font-mono">•</span>
                      <span>{loc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                  Last Verified Information & Analysis
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {d.lastVerifiedInformation}
                </p>
                <div className="pt-1 text-[11px] text-slate-400 font-mono">
                  Agency in Charge: {d.responsibleAgency}
                </div>
              </div>
            </div>

            {/* International Cooperation Requests (MLA & Extradition) */}
            <div className="space-y-2">
              <div className="font-cinzel text-xs font-bold text-slate-200 uppercase tracking-wide">
                Active Bilateral Judicial Assistance & Interpol Diffusions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {d.internationalCooperationRequests.map((req, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-slate-200 font-medium">{req.targetCountry}</span>
                      <span className="text-amber-400">{req.status}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">{req.requestType}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Filed: {req.dateFiled}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 text-[11px]">
                Status: {d.investigationStatus}
              </span>
              <button
                onClick={onNavigateToLeads}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono flex items-center gap-1.5 transition-colors"
              >
                <span>View Related Leads ({d.investigativeLeadsCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
