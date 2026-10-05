import React, { useState } from 'react';
import { 
  FileCheck, Download, Printer, Shield, Scale, AlertTriangle, 
  CheckCircle, Loader2, Sparkles, BookOpen, Layers, UserCheck
} from 'lucide-react';
import { CaseRecord, CaseBuilderOutput, UserRole } from '../types';

interface CaseBuilderModuleProps {
  cases: CaseRecord[];
  initialCaseId?: string | null;
  currentRole: UserRole;
}

export const CaseBuilderModule: React.FC<CaseBuilderModuleProps> = ({
  cases,
  initialCaseId,
  currentRole
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseId || cases[0]?.id || '');
  const [dossier, setDossier] = useState<CaseBuilderOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleGenerateDossier = async () => {
    if (!selectedCaseId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/build-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: selectedCaseId, role: currentRole })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to assemble case dossier');
      setDossier(data.dossier);
    } catch (err: any) {
      setError(err.message || 'Error assembling dossier');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (!dossier) return;
    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Case_Dossier_${dossier.caseNumber.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Case Builder & Judicial Summary Engine
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Assemble comprehensive investigative dossiers with strictly demarcated standard-of-proof tiers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              Authorized Role: {currentRole}
            </span>
          </div>
        </div>

        {/* Case selector & action */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <label className="text-[11px] font-mono text-slate-400 font-semibold uppercase block mb-1">
              Target Suspect / Record File:
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.suspectName} ({c.caseNumber} - {c.legalStatus})
                </option>
              ))}
            </select>
          </div>

          <div className="self-end sm:self-auto sm:mt-5">
            <button
              onClick={handleGenerateDossier}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Judicial Dossier...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Case Dossier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Structured Output Dossier */}
      {dossier ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
          {/* Dossier Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded">
                  OFFICIAL INVESTIGATIVE DOSSIER
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {new Date(dossier.generatedDate).toLocaleString()}
                </span>
              </div>
              <h2 className="font-cinzel text-xl font-bold text-slate-100 mt-1">
                {dossier.caseTitle}
              </h2>
              <div className="text-xs font-mono text-slate-400">
                Case No: {dossier.caseNumber} • Target: {dossier.targetPerson}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  let md = `# CASE DOSSIER: ${dossier.caseTitle}\n`;
                  md += `**Case Number:** ${dossier.caseNumber} | **Target:** ${dossier.targetPerson}\n`;
                  md += `**Generated:** ${dossier.generatedDate}\n\n`;
                  md += `## 1. FACTS (PROVEN BEYOND REASONABLE DOUBT)\n`;
                  dossier.facts.forEach(f => { md += `- ${f}\n`; });
                  md += `\n## 2. SOURCE-BASED CLAIMS\n`;
                  dossier.sourceBasedClaims.forEach(s => {
                    md += `- ${s.claim} *(Source: ${s.sourceDocument}, Date: ${s.dateOfDocument})*\n`;
                  });
                  md += `\n## 3. ALLEGATIONS\n`;
                  dossier.allegations.forEach(a => { md += `- ${a}\n`; });
                  md += `\n## 4. AI INFERENCES\n`;
                  dossier.aiInferences.forEach(inf => {
                    md += `- [${inf.confidence} CONFIDENCE] ${inf.inference} *(Supporting: ${inf.supportingDocuments.join(', ')})*\n`;
                  });
                  md += `\n## 5. UNVERIFIED LEADS\n`;
                  dossier.unverifiedLeads.forEach(u => { md += `- ${u}\n`; });
                  md += `\n## CONTRADICTIONS IDENTIFIED\n`;
                  dossier.contradictionsIdentified.forEach(c => { md += `- ${c}\n`; });
                  md += `\n## RECOMMENDED INVESTIGATIVE FOLLOW-UP\n`;
                  dossier.recommendedInvestigativeFollowUp.forEach(r => { md += `- ${r}\n`; });
                  md += `\n## LEGAL STATUS ASSESSMENT\n${dossier.legalStatusAssessment}\n`;

                  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Case_Dossier_${dossier.caseNumber.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Download (.MD)</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* 5 Distinct Evidentiary Tiers Required by Mandate */}
          <div className="space-y-4">
            {/* TIER 1: FACT */}
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-l-emerald-500 border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" />
                <span>TIER 1: FACT (Admitted Primary Evidence or Final Judgment Finding)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200 pl-2">
                {dossier.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-mono">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TIER 2: SOURCE-BASED CLAIM */}
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-l-blue-500 border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>TIER 2: SOURCE-BASED CLAIM (Directly Sourced Witness Testimony or Official Record)</span>
              </div>
              <div className="space-y-2 text-xs">
                {dossier.sourceBasedClaims.map((item, i) => (
                  <div key={i} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <p className="text-slate-200">{item.claim}</p>
                    <div className="text-[10px] font-mono text-blue-300 flex items-center justify-between">
                      <span>Source Document: {item.sourceDocument}</span>
                      <span>Date: {item.dateOfDocument}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER 3: ALLEGATION */}
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-l-amber-500 border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>TIER 3: ALLEGATION (Formal Indictment Counts & Alleged Offenses)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200 pl-2">
                {dossier.allegations.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TIER 4: AI INFERENCE */}
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-l-purple-500 border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>TIER 4: AI INFERENCE (Analytical Deductions from Timeline & Location Matrix)</span>
              </div>
              <div className="space-y-2 text-xs">
                {dossier.aiInferences.map((inf, i) => (
                  <div key={i} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <p className="text-slate-200">{inf.inference}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Supporting Evidence: {inf.supportingDocuments.join(', ')}</span>
                      <span className="text-purple-300">Confidence: {inf.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER 5: UNVERIFIED LEAD */}
            <div className="p-4 rounded-xl bg-slate-950 border-l-4 border-l-slate-600 border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>TIER 5: UNVERIFIED LEAD (Citizen Tips & Inquiries Awaiting Corroboration)</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300 pl-2">
                {dossier.unverifiedLeads.map((lead, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-500 font-mono">•</span>
                    <span>{lead}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contradictions & Investigator Follow-up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-mono text-amber-400 font-semibold text-[11px] uppercase">
                Contradictions Identified for Human Review:
              </div>
              <ul className="space-y-1 text-slate-300">
                {dossier.contradictionsIdentified.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-mono">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-mono text-emerald-400 font-semibold text-[11px] uppercase">
                Recommended Investigative Follow-Up:
              </div>
              <ul className="space-y-1 text-slate-300">
                {dossier.recommendedInvestigativeFollowUp.map((rec, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-mono">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal status assessment */}
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-[11px] text-slate-400 font-mono">
            <strong className="text-slate-200">Legal Status Assessment: </strong>
            {dossier.legalStatusAssessment}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <FileCheck className="w-10 h-10 text-amber-500/60 mx-auto" />
          <h3 className="font-cinzel text-base font-bold text-slate-200">
            Select a Case Record to Assemble Investigative Dossier
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            The Case Builder will synthesize documentary evidence, witness testimonies, identified contradictions, and procedural history into a five-tier evidentiary breakdown.
          </p>
          <button
            onClick={handleGenerateDossier}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs transition-colors"
          >
            Synthesize Dossier for {selectedCase?.suspectName}
          </button>
        </div>
      )}
    </div>
  );
};
