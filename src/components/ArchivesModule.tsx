import React, { useState } from 'react';
import { BookOpen, Search, FileText, Download, Hash, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { EvidenceItem } from '../types';

interface ArchivesModuleProps {
  evidence: EvidenceItem[];
  onAnalyzeDocument?: (docTitle: string) => void;
}

export const ArchivesModule: React.FC<ArchivesModuleProps> = ({
  evidence,
  onAnalyzeDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<EvidenceItem | null>(evidence[0] || null);

  const archiveDocs = evidence.filter(e => 
    e.type === 'Document' || e.type === 'Historical Archive' || e.type === 'Audio Recording'
  );

  const filtered = archiveDocs.filter(d => {
    const q = searchTerm.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.source.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      (d.contentSnippet && d.contentSnippet.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Historical Archives & Primary Source Records
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Declassified diplomatic telegrams, broadcast transcripts, newspaper publications, and cabinet logs from 1990-1994.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search archival text, source, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map(doc => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/70 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">{doc.id}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">
                    {doc.type}
                  </span>
                </div>
                <h3 className="font-cinzel text-xs font-bold text-slate-100">
                  {doc.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {doc.description}
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                  Date: {doc.dateObtained}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Document Reader View */}
        <div className="lg:col-span-7">
          {selectedDoc ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded">
                    {selectedDoc.classificationLevel}
                  </span>
                  <h2 className="font-cinzel text-lg font-bold text-slate-100 mt-2">
                    {selectedDoc.title}
                  </h2>
                  <div className="text-xs font-mono text-slate-400">
                    Source: {selectedDoc.source}
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-slate-400">
                  <div>Ref ID: {selectedDoc.id}</div>
                  <div>Archived: {selectedDoc.dateObtained}</div>
                </div>
              </div>

              {/* Primary Content Snippet */}
              {selectedDoc.contentSnippet && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-amber-400 font-semibold text-[11px] uppercase flex items-center justify-between">
                    <span>Archival Text Excerpt / Transcription:</span>
                    <span className="text-slate-500 text-[10px]">Certified Primary Record</span>
                  </div>
                  <div className="font-mono text-xs text-amber-200/90 leading-relaxed whitespace-pre-line p-3 bg-slate-900/50 rounded-lg border border-slate-800/80">
                    {selectedDoc.contentSnippet}
                  </div>
                </div>
              )}

              {/* Comprehensive Description & Context */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="font-mono text-slate-400 font-semibold text-[11px] uppercase">
                  Contextual Background & Evidentiary Significance:
                </div>
                <p className="leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
                  {selectedDoc.description}
                </p>
              </div>

              {/* Cryptographic SHA-256 Seal */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="truncate mr-2">
                  <span className="text-slate-500">SHA-256 HASH: </span>
                  <span className="text-slate-300">{selectedDoc.sha256Hash}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] shrink-0">
                  AUTHENTICATED
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  Related Cases: {selectedDoc.relatedCases.join(', ')}
                </div>
                {onAnalyzeDocument && (
                  <button
                    onClick={() => onAnalyzeDocument(selectedDoc.title)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs rounded font-mono transition-colors"
                  >
                    Analyze with AI Investigator
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
