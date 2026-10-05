import React, { useState } from 'react';
import { Eye, Shield, Lock, AlertTriangle, CheckCircle, FileText, UserCheck, ShieldAlert } from 'lucide-react';
import { WitnessRecord, UserRole } from '../types';

interface WitnessProtectionModuleProps {
  witnesses: WitnessRecord[];
  currentRole: UserRole;
  isAuthorized: boolean;
  onRequestRoleUpgrade: () => void;
}

export const WitnessProtectionModule: React.FC<WitnessProtectionModuleProps> = ({
  witnesses,
  currentRole,
  isAuthorized,
  onRequestRoleUpgrade
}) => {
  const [selectedWitness, setSelectedWitness] = useState<WitnessRecord | null>(witnesses[0] || null);

  return (
    <div className="space-y-6">
      {/* Header & Protection Mandate */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Witness Protection & In-Camera Depositions
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Operated under Rule 69 & Rule 75 of the UN ICTR/IRMCT Rules of Procedure and Evidence. Survivor and witness safety is paramount.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
              isAuthorized 
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                : 'bg-red-950 text-red-300 border border-red-800'
            }`}>
              {isAuthorized ? <CheckCircle className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isAuthorized ? `Authorized Access: ${currentRole}` : 'Public Redaction Active'}</span>
            </div>
          </div>
        </div>

        {/* Legal safeguard notice */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
          <div className="font-mono text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Witness Anonymity & Protection Protocols</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Witnesses and victims who provided testimony before the International Criminal Tribunal for Rwanda and national courts are legally protected by judicial non-disclosure orders. Personal real names, safe relocations, and biometric profiles remain strictly classified under permanent protective seal.
          </p>
        </div>
      </div>

      {/* Main Witness Module Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Witness List */}
        <div className="lg:col-span-5 space-y-3">
          {witnesses.map((w) => {
            const isSelected = selectedWitness?.id === w.id;
            return (
              <div
                key={w.id}
                onClick={() => setSelectedWitness(w)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/70 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono font-bold text-xs text-slate-100">{w.pseudonym}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">
                    {w.id}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Statement Date: {w.dateOfStatement}
                </div>

                <div className="text-xs text-slate-300 line-clamp-2">
                  {w.statementExcerpt}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-amber-400">{w.relatedCaseNumbers[0]}</span>
                  <span>{w.protectiveMeasures.length} Protective Orders</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Witness Detail Dossier */}
        <div className="lg:col-span-7">
          {selectedWitness ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-lg font-bold text-slate-100">
                      {selectedWitness.pseudonym}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                      RULE 75 PROTECTED
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Internal Repository Identifier: {selectedWitness.id}
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-slate-400">
                  <div>Statement Recorded:</div>
                  <div className="text-slate-200 font-semibold">{selectedWitness.dateOfStatement}</div>
                </div>
              </div>

              {/* Redacted vs Authorized Statement Excerpt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 font-semibold uppercase text-[11px]">
                    Sworn Statement / Deposition Excerpt:
                  </span>
                  {!isAuthorized && (
                    <span className="text-red-400 font-mono text-[10px] flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Redacted for Public Security
                    </span>
                  )}
                </div>

                <div className={`p-4 rounded-xl border text-xs leading-relaxed font-serif ${
                  isAuthorized
                    ? 'bg-slate-950 border-slate-800 text-slate-200'
                    : 'bg-red-950/20 border-red-900/40 text-red-300/80 font-mono italic'
                }`}>
                  "{selectedWitness.statementExcerpt}"
                </div>

                {!isAuthorized && (
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Authorized investigators and prosecutors may switch roles in the header to view unredacted depositions.
                    </span>
                    <button
                      onClick={onRequestRoleUpgrade}
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold rounded text-xs transition-colors shrink-0"
                    >
                      Authenticate Role
                    </button>
                  </div>
                )}
              </div>

              {/* Reliability Assessment */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="font-mono text-amber-400 font-semibold text-[11px] uppercase">
                  Investigator Reliability & Corroboration Assessment:
                </div>
                <div className="text-slate-200 font-medium">
                  {selectedWitness.reliabilityAssessment}
                </div>
                {isAuthorized && (
                  <div className="pt-2 text-slate-400 text-[11px] border-t border-slate-900">
                    <strong className="text-slate-300 font-mono">Investigator Confidential Notes: </strong>
                    {selectedWitness.investigatorNotes}
                  </div>
                )}
              </div>

              {/* Protective Measures In Effect */}
              <div className="space-y-2 text-xs">
                <div className="font-mono text-slate-400 font-semibold text-[11px] uppercase">
                  Judicial Protective Measures Granted:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedWitness.protectiveMeasures.map((measure, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2 text-slate-300 text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{measure}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Proceedings */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Associated Case:</span>
                <span className="text-amber-400 font-semibold">{selectedWitness.relatedCaseNumbers.join(', ')}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
