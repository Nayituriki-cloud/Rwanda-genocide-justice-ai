import React, { useState } from 'react';
import { 
  Bot, Search, Sparkles, FileText, Scale, AlertTriangle, ArrowRight, 
  CheckCircle2, HelpCircle, Loader2, BookOpen, Layers, ShieldCheck, RefreshCw
} from 'lucide-react';
import { UserRole } from '../types';

interface AiInvestigatorModuleProps {
  currentRole: UserRole;
  prefilledQuery?: string;
}

export const AiInvestigatorModule: React.FC<AiInvestigatorModuleProps> = ({
  currentRole,
  prefilledQuery = ''
}) => {
  const [query, setQuery] = useState(prefilledQuery);
  const [investigationMode, setInvestigationMode] = useState<string>('CROSS_REFERENCE');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presetQueries = [
    {
      title: 'Cross-Reference Documents',
      query: 'Cross-reference the 11 January 1994 Dallaire Genocide Fax (EVD-UN-FAX-94) with the Trial Chamber findings in Prosecutor v. Bagosora (ICTR-98-41-T). What primary sources corroborating weapon distribution were cited?',
      mode: 'CROSS_REFERENCE'
    },
    {
      title: 'Detect Contradictory Statements',
      query: 'Compare eyewitness accounts regarding the destruction of Nyange Church on 16 April 1994. Did defense claims of spontaneous mob action withstand forensic engineering analysis of Caterpillar bulldozer impacts (EVD-NYA-BULL-01)?',
      mode: 'CONTRADICTION_DETECTION'
    },
    {
      title: 'Summarize Landmark Court Judgment',
      query: 'Summarize the landmark holding in Prosecutor v. Jean-Paul Akayesu (ICTR-96-4-T) regarding why sexual violence and rape were legally categorized as an act of genocide under Article 2 of the 1948 Convention.',
      mode: 'JUDGMENT_SUMMARY'
    },
    {
      title: 'Generate Questions for Investigators',
      query: 'For the fugitive Charles Sikubwabo (ICTR-95-1D-I), what outstanding evidentiary gaps exist between the Mugonero Hospital assault records and subsequent Bisesero mountain operations? Generate 5 priority questions for field investigators.',
      mode: 'INVESTIGATOR_QUESTIONS'
    },
    {
      title: 'Analyze Media Trial Precedents',
      query: 'Which specific broadcasts by RTLM (e.g. Kantano Habimana on 12 April 1994, EVD-RTLM-AUD-23) were admitted as direct and public incitement in Prosecutor v. Nahimana & Ngeze (ICTR-99-52-T)?',
      mode: 'EVIDENCE_INDEX'
    },
    {
      title: 'Examine Acquittal Standards',
      query: 'Analyze the reasons why André Ntagerura and Emmanuel Bagambiki were acquitted in the Cyangugu Group trial (ICTR-99-46-T). How did the standard of proof beyond reasonable doubt protect judicial integrity?',
      mode: 'RULE_OF_LAW'
    }
  ];

  const handleRunInvestigation = async (queryText?: string, mode?: string) => {
    const q = queryText || query;
    const m = mode || investigationMode;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);
    setLastQuery(q);

    try {
      const res = await fetch('/api/ai/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, mode: m, role: currentRole })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to complete investigation');
      setResults(data.answer);
    } catch (err: any) {
      setError(err.message || 'An error occurred during AI analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Mandate */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                AI Investigator & Document Research Engine
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Grounded across verified ICTR, IRMCT, and Rwandan National Public Prosecution archives. Every conclusion requires underlying source documents.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ethical AI Guardrails Enforced</span>
          </div>
        </div>

        {/* Ethical reminder */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong className="text-slate-200">System Constraint:</strong> The AI acts solely as a research assistant. It never declares unconvicted persons guilty, never fabricates evidence, never reveals protected witness identities, and never issues arrest or vigilante directives.
          </span>
        </div>
      </div>

      {/* Preset Research Templates */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
          Select Standard Research Directive or Custom Query:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {presetQueries.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(p.query);
                setInvestigationMode(p.mode);
                handleRunInvestigation(p.query, p.mode);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all text-left space-y-1.5 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-xs text-slate-200 group-hover:text-amber-300">
                  {p.title}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-slate-950 text-slate-400 rounded">
                  {p.mode}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {p.query}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Query Formulation Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-300 font-semibold uppercase flex items-center justify-between">
            <span>Investigative Query / "Ask the Archive":</span>
            <span className="text-slate-500 text-[11px]">Role Clearance: {currentRole}</span>
          </label>
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask questions such as: 'Show documented cases connected to Butare prefecture', 'What evidence supports this case?', 'What did the court determine?', 'Which documents mention this person?'..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 leading-relaxed font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Analysis Mode:</span>
            <select
              value={investigationMode}
              onChange={(e) => setInvestigationMode(e.target.value)}
              className="bg-slate-950 text-xs text-slate-200 py-1 px-2.5 rounded border border-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="CROSS_REFERENCE">Cross-Reference Documents</option>
              <option value="CONTRADICTION_DETECTION">Detect Contradictions</option>
              <option value="TIMELINE_EXTRACTION">Build Timeline</option>
              <option value="JUDGMENT_SUMMARY">Summarize Court Judgments</option>
              <option value="INVESTIGATOR_QUESTIONS">Generate Investigator Questions</option>
              <option value="EVIDENCE_INDEX">Create Evidence Index</option>
            </select>
          </div>

          <button
            onClick={() => handleRunInvestigation()}
            disabled={loading || !query.trim()}
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Archives...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute Investigation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Investigation Results Display */}
      {results && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <h2 className="font-cinzel text-base font-bold text-slate-100 uppercase tracking-wide">
                Investigative Report & Sourced Findings
              </h2>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Generated via Gemini 3.8 Flash • Sourced Citations
            </div>
          </div>

          {lastQuery && (
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs font-mono text-slate-400">
              <span className="text-amber-400 font-semibold">QUERY: </span>
              <span>{lastQuery}</span>
            </div>
          )}

          {/* Formatted Markdown-like Content */}
          <div className="text-xs text-slate-200 leading-relaxed space-y-3 font-sans whitespace-pre-line bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            {results}
          </div>

          {/* Verification Badge & Easy Download Action Bar */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Grounded on Official ICTR/IRMCT Admitted Records & Judgments</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  const blob = new Blob([
                    `# RWANDA GENOCIDE JUSTICE AI - INVESTIGATIVE REPORT\n` +
                    `Query: ${lastQuery}\n` +
                    `Date: ${new Date().toISOString()}\n\n` +
                    `${results}`
                  ], { type: 'text/markdown;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `AI_Investigative_Report_${new Date().toISOString().slice(0, 10)}.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1 transition-colors"
              >
                <span>Download Report (.MD)</span>
              </button>

              <button
                onClick={() => {
                  const blob = new Blob([
                    `RWANDA GENOCIDE JUSTICE AI - INVESTIGATIVE REPORT\n` +
                    `Query: ${lastQuery}\n` +
                    `Date: ${new Date().toISOString()}\n\n` +
                    `${results}`
                  ], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `AI_Investigative_Report_${new Date().toISOString().slice(0, 10)}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1 transition-colors"
              >
                <span>Download (.TXT)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1 transition-colors"
              >
                <span>Print</span>
              </button>

              <button
                onClick={() => handleRunInvestigation()}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono text-xs ml-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-analyze</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
