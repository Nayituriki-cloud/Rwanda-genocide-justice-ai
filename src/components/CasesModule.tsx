import React, { useState } from 'react';
import { 
  Search, Filter, ShieldCheck, AlertTriangle, Eye, FileText, 
  Scale, ExternalLink, Calendar, MapPin, Building, ChevronRight, X, User
} from 'lucide-react';
import { CaseRecord, LegalStatus, UserRole } from '../types';

interface CasesModuleProps {
  cases: CaseRecord[];
  initialStatusFilter?: string | null;
  onSelectCaseForAI?: (caseId: string) => void;
  onSelectCaseForBuilder?: (caseId: string) => void;
  currentRole: UserRole;
}

export const CasesModule: React.FC<CasesModuleProps> = ({
  cases,
  initialStatusFilter,
  onSelectCaseForAI,
  onSelectCaseForBuilder,
  currentRole
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter || 'ALL');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);

  const statuses: { label: string; value: string; badgeColor: string; description: string }[] = [
    { label: 'All Cases', value: 'ALL', badgeColor: 'bg-slate-800 text-slate-300', description: 'Complete judicial record repository' },
    { label: 'CONVICTED', value: 'CONVICTED', badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800', description: 'Found guilty beyond reasonable doubt by competent tribunal' },
    { label: 'ACCUSED / INDICTED', value: 'ACCUSED / INDICTED', badgeColor: 'bg-blue-950 text-blue-300 border border-blue-800', description: 'Formally indicted; undergoing lawful judicial trial process' },
    { label: 'WANTED BY AUTHORITY', value: 'WANTED BY AUTHORITY', badgeColor: 'bg-red-950 text-red-300 border border-red-800', description: 'Subject to official international arrest warrants and Red Notices' },
    { label: 'ALLEGATION / UNVERIFIED', value: 'ALLEGATION / UNVERIFIED', badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800', description: 'Open preliminary inquiry; unverified leads; presumption of innocence applies' },
    { label: 'CLEARED / ACQUITTED', value: 'CLEARED / ACQUITTED', badgeColor: 'bg-purple-950 text-purple-300 border border-purple-800', description: 'Formally acquitted by court of law; completely cleared of criminal liability' },
  ];

  const filteredCases = cases.filter(c => {
    const matchesStatus = statusFilter === 'ALL' || c.legalStatus === statusFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      c.suspectName.toLowerCase().includes(query) ||
      c.caseNumber.toLowerCase().includes(query) ||
      c.knownAliases.some(a => a.toLowerCase().includes(query)) ||
      c.locations.some(l => l.toLowerCase().includes(query)) ||
      c.charges.some(ch => ch.toLowerCase().includes(query)) ||
      c.courtOrAuthority.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: LegalStatus) => {
    switch (status) {
      case 'CONVICTED':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">CONVICTED</span>;
      case 'ACCUSED / INDICTED':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-blue-950 text-blue-300 border border-blue-800 rounded">ACCUSED / INDICTED</span>;
      case 'WANTED BY AUTHORITY':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-red-950 text-red-300 border border-red-800 rounded">WANTED BY AUTHORITY</span>;
      case 'ALLEGATION / UNVERIFIED':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-amber-950 text-amber-300 border border-amber-800 rounded">ALLEGATION / UNVERIFIED</span>;
      case 'CLEARED / ACQUITTED':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-purple-950 text-purple-300 border border-purple-800 rounded">CLEARED / ACQUITTED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Case Database & Judicial Records
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Searchable repository categorized strictly under lawful standards of proof. Presumption of innocence strictly applied.
            </p>
          </div>

          {/* Search Input and Export Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name, alias, case #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <button
              onClick={() => {
                const headers = ['Case ID', 'Case Number', 'Name', 'Status', 'Court', 'Country', 'Charges', 'Locations', 'Summary'];
                const rows = filteredCases.map(c => [
                  c.id, c.caseNumber, c.suspectName, c.legalStatus, c.courtOrAuthority, c.country,
                  c.charges.join('; '), c.locations.join('; '), c.summary
                ]);
                const escape = (str: string) => `"${String(str).replace(/"/g, '""')}"`;
                const csv = [headers.map(escape).join(','), ...rows.map(r => r.map(escape).join(','))].join('\r\n');
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Rwanda_Cases_${statusFilter}_${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Download CSV table of filtered cases"
            >
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Status Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {statuses.map(st => (
            <button
              key={st.value}
              onClick={() => setStatusFilter(st.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                statusFilter === st.value
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{st.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-slate-900 rounded text-slate-400">
                {st.value === 'ALL' ? cases.length : cases.filter(c => c.legalStatus === st.value).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Strict Ethical Warning for Cases */}
      <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-lg flex items-center gap-2 text-xs text-slate-400">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong className="text-slate-200">Ethical Rule:</strong> Never label someone a perpetrator solely because an AI system or tip suspects them. Guilt is established exclusively through final verdicts of competent international or national courts.
        </span>
      </div>

      {/* Cases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {c.photoUrl ? (
                      <img src={c.photoUrl} alt={c.suspectName} className="h-full w-full object-cover grayscale contrast-125" />
                    ) : (
                      <User className="w-6 h-6 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                      {c.suspectName}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">{c.caseNumber}</p>
                  </div>
                </div>
              </div>

              <div>{getStatusBadge(c.legalStatus)}</div>

              {c.knownAliases.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">Aliases: </span>
                  <span className="text-slate-300">{c.knownAliases.join(', ')}</span>
                </div>
              )}

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {c.summary}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1 text-[11px] text-slate-400">
                <span className="font-mono text-slate-500">Locations: </span>
                <span className="text-slate-300">{c.locations.slice(0, 3).join(', ')}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-mono">
              <span>View Judicial Dossier</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <p className="text-slate-300 text-sm">No cases match the selected filter criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
            className="text-xs text-amber-400 underline font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Case Details Drawer / Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-5 border-b border-slate-800 flex items-start justify-between gap-4 z-10">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                  <img src={selectedCase.photoUrl} alt={selectedCase.suspectName} className="h-full w-full object-cover grayscale contrast-125" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-cinzel text-lg font-bold text-slate-100">
                      {selectedCase.suspectName}
                    </h2>
                    {getStatusBadge(selectedCase.legalStatus)}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                    <span>Case Ref: {selectedCase.caseNumber}</span>
                    <span>•</span>
                    <span>{selectedCase.courtOrAuthority}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs text-slate-300">
              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-mono text-amber-400 text-[11px] font-semibold uppercase">
                  Executive Case Summary
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {selectedCase.summary}
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Source: {selectedCase.verifiedSource}
                </div>
              </div>

              {/* Grid: Charges & Current Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                    Formal Charges / Indictment Counts
                  </div>
                  <ul className="space-y-1.5">
                    {selectedCase.charges.map((charge, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-mono">•</span>
                        <span>{charge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                    Current Legal Status & Custody
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedCase.currentCaseStatus}
                  </p>
                  <div className="pt-2 text-[11px] text-slate-400">
                    <span className="font-mono text-slate-500">Jurisdiction Country: </span>
                    <span className="text-slate-200">{selectedCase.country}</span>
                  </div>
                </div>
              </div>

              {/* Court Decisions History */}
              <div className="space-y-3">
                <div className="font-cinzel text-sm font-bold text-slate-200 uppercase tracking-wide">
                  Chamber Decisions & Sentences
                </div>
                <div className="space-y-2">
                  {selectedCase.courtDecisions.map((dec, i) => (
                    <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                      <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                        <span className="text-amber-400 font-medium">{dec.chamber}</span>
                        <span>{dec.date}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{dec.decision}</p>
                      {dec.sentence && (
                        <div className="text-[11px] font-mono text-emerald-400 pt-1">
                          Imposed Sentence: {dec.sentence}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Witnesses and Evidence Cross-References */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                    Witness References
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.witnessReferences.map((w, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300 font-mono text-[11px]">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                    Evidence Exhibits
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.evidenceReferences.map((ev, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-amber-300 font-mono text-[11px]">
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 font-mono">
                Verified judicial record • Last updated: {selectedCase.lastUpdated}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    let content = `========================================================================\n`;
                    content += `  RWANDA GENOCIDE JUSTICE AI - OFFICIAL JUDICIAL CASE BRIEF\n`;
                    content += `========================================================================\n\n`;
                    content += `CASE NUMBER: ${selectedCase.caseNumber}\n`;
                    content += `TARGET PERSON: ${selectedCase.suspectName}\n`;
                    content += `LEGAL STATUS: ${selectedCase.legalStatus}\n`;
                    content += `COURT / AUTHORITY: ${selectedCase.courtOrAuthority}\n`;
                    content += `COUNTRY: ${selectedCase.country}\n`;
                    if (selectedCase.knownAliases.length) content += `ALIASES: ${selectedCase.knownAliases.join(', ')}\n`;
                    content += `LOCATIONS: ${selectedCase.locations.join(', ')}\n`;
                    content += `RELEVANT DATES: ${selectedCase.relevantDates.join(', ')}\n\n`;
                    content += `SUMMARY:\n${selectedCase.summary}\n\n`;
                    content += `CHARGES:\n${selectedCase.charges.map(ch => `  - ${ch}`).join('\n')}\n\n`;
                    content += `COURT DECISIONS:\n${selectedCase.courtDecisions.map(d => `  * ${d.chamber} (${d.date}): ${d.decision} ${d.sentence ? `[Sentence: ${d.sentence}]` : ''}`).join('\n')}\n\n`;
                    content += `CURRENT CUSTODY / STATUS:\n${selectedCase.currentCaseStatus}\n\n`;
                    content += `EVIDENCE REFERENCES: ${selectedCase.evidenceReferences.join(', ')}\n`;
                    content += `WITNESS REFERENCES: ${selectedCase.witnessReferences.join(', ')}\n`;
                    content += `SOURCE: ${selectedCase.verifiedSource}\n\n`;
                    content += `========================================================================\n`;
                    content += `Presumption of innocence applies until final court verdict. Non-vigilante system.\n`;
                    
                    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Case_Brief_${selectedCase.caseNumber.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors"
                >
                  Download Brief (.TXT)
                </button>

                {onSelectCaseForAI && (
                  <button
                    onClick={() => {
                      const id = selectedCase.id;
                      setSelectedCase(null);
                      onSelectCaseForAI(id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs transition-colors"
                  >
                    Analyze with AI Investigator
                  </button>
                )}
                {onSelectCaseForBuilder && currentRole !== 'Public User' && (
                  <button
                    onClick={() => {
                      const id = selectedCase.id;
                      setSelectedCase(null);
                      onSelectCaseForBuilder(id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors"
                  >
                    Generate Case Dossier
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
