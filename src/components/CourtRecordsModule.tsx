import React, { useState } from 'react';
import { Scale, FileText, ExternalLink, Search, CheckCircle2, BookOpen } from 'lucide-react';
import { CourtRecord } from '../types';

interface CourtRecordsModuleProps {
  records: CourtRecord[];
}

export const CourtRecordsModule: React.FC<CourtRecordsModuleProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState('ALL');

  const jurisdictions = ['ALL', 'ICTR', 'IRMCT', 'Gacaca Jurisdictions', 'Universal Jurisdiction'];

  const filtered = records.filter(r => {
    const matchesJ = jurisdictionFilter === 'ALL' || r.jurisdiction.includes(jurisdictionFilter);
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      r.title.toLowerCase().includes(query) ||
      r.caseNumber.toLowerCase().includes(query) ||
      r.documentType.toLowerCase().includes(query) ||
      r.keyFindings.some(f => f.toLowerCase().includes(query));
    return matchesJ && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Court Records & International Jurisprudence
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Verdicts, appeals judgments, sentences, and extradition precedents from the ICTR, IRMCT, Gacaca, and National Jurisdictions.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search rulings, case numbers, precedents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {jurisdictions.map(j => (
            <button
              key={j}
              onClick={() => setJurisdictionFilter(j)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                jurisdictionFilter === j
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {j}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(record => (
          <div key={record.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800 rounded">
                    {record.jurisdiction}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded">
                    {record.documentType}
                  </span>
                </div>
                <h2 className="font-cinzel text-base font-bold text-slate-100 mt-1">
                  {record.title}
                </h2>
                <div className="text-xs font-mono text-slate-400">
                  Case Ref: {record.caseNumber} • Date Issued: {record.dateIssued}
                </div>
              </div>

              {record.archiveUrl && (
                <a
                  href={record.archiveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 shrink-0"
                >
                  <span>Official UN Register</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {record.presidingJudges && (
              <div className="text-xs text-slate-400 font-mono">
                <span className="text-slate-500">Chamber Bench: </span>
                <span className="text-slate-300">{record.presidingJudges.join('; ')}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                Key Findings of Fact & Law:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {record.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {record.legalPrecedentsEstablished.length > 0 && (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                <div className="font-mono text-amber-400 font-semibold text-[10px] uppercase">
                  Jurisprudential Precedents Established:
                </div>
                <div className="flex flex-wrap gap-2">
                  {record.legalPrecedentsEstablished.map((prec, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-serif text-amber-200/90">
                      "{prec}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
