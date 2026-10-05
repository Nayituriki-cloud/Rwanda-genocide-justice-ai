import React, { useState } from 'react';
import { Clock, Calendar, MapPin, Users, FileText, Scale, ArrowRight, Filter } from 'lucide-react';
import { TimelineEvent, EvidenceItem, CourtRecord } from '../types';

interface TimelineModuleProps {
  timeline: TimelineEvent[];
  evidence: EvidenceItem[];
  courtRecords: CourtRecord[];
  onSelectEvidence?: (evidenceId: string) => void;
  onSelectCourtRecord?: (recordId: string) => void;
}

export const TimelineModule: React.FC<TimelineModuleProps> = ({
  timeline,
  evidence,
  courtRecords,
  onSelectEvidence,
  onSelectCourtRecord
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(timeline[0]);

  const categories = [
    'ALL',
    'Prelude & Warning',
    'Assassination & Outbreak',
    'Massacre & Resistance',
    'Propaganda & Incitement',
    'Liberation & Cessation',
    'International Justice & ICTR',
    'Gacaca & Reconciliation',
    'Fugitive Tracking'
  ];

  const filtered = timeline.filter(ev => {
    if (selectedCategory === 'ALL') return true;
    return ev.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Interactive Rwanda 1994 & Justice Timeline
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Methodological continuity: <strong className="text-amber-200">DATE → LOCATION → EVENT → PEOPLE → EVIDENCE → COURT RECORD</strong>
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <span>Showing: {filtered.length} Key Chronological Nodes</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chronology Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline Event Cards List */}
        <div className="lg:col-span-7 space-y-3">
          {filtered.map((item, idx) => {
            const isSelected = selectedEvent?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedEvent(item)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/70 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {item.formattedDate}
                      </span>
                      <span className="px-1.5 py-0.2 text-[9px] font-mono bg-slate-800 text-slate-300 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{item.location.split('(')[0]}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Micro Chain Bar */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400">
                  <span className="text-slate-500">People: {item.peopleInvolved.length}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Evidence: {item.evidenceIds.length}</span>
                  <span>•</span>
                  <span className="text-blue-400">Court Recs: {item.courtRecordIds.length}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Event Deep-Dive Panel */}
        <div className="lg:col-span-5">
          {selectedEvent ? (
            <div className="sticky top-28 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded">
                  {selectedEvent.category}
                </span>
                <div className="text-xs font-mono text-amber-400 font-bold mt-2">
                  {selectedEvent.formattedDate}
                </div>
                <h2 className="font-cinzel text-base font-bold text-slate-100 mt-1">
                  {selectedEvent.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Event Description */}
              <div className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {selectedEvent.description}
              </div>

              {/* People Involved */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-slate-400 font-semibold text-[11px] uppercase">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>Key Documented Persons:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.peopleInvolved.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded font-mono text-[11px] text-slate-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Associated Evidence */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-slate-400 font-semibold text-[11px] uppercase">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Supporting Evidence Items:</span>
                </div>
                <div className="space-y-1.5">
                  {selectedEvent.evidenceIds.map((evId) => {
                    const ev = evidence.find(e => e.id === evId);
                    return (
                      <div
                        key={evId}
                        onClick={() => onSelectEvidence && onSelectEvidence(evId)}
                        className="p-2.5 bg-slate-950 border border-slate-800 hover:border-emerald-600/50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="font-mono text-[10px] text-emerald-400 font-semibold">{evId}</div>
                        <div className="text-xs text-slate-200">{ev ? ev.title : 'Official Exhibit Record'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Court Records Citations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-slate-400 font-semibold text-[11px] uppercase">
                  <Scale className="w-3.5 h-3.5 text-purple-400" />
                  <span>Judicial Precedents & Decisions:</span>
                </div>
                <div className="space-y-1.5">
                  {selectedEvent.courtRecordIds.map((recId) => {
                    const rec = courtRecords.find(r => r.id === recId);
                    return (
                      <div
                        key={recId}
                        onClick={() => onSelectCourtRecord && onSelectCourtRecord(recId)}
                        className="p-2.5 bg-slate-950 border border-slate-800 hover:border-purple-600/50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="font-mono text-[10px] text-purple-400 font-semibold">{recId}</div>
                        <div className="text-xs text-slate-200">{rec ? rec.title : 'ICTR / IRMCT Ruling'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
              Select an event to examine its judicial chain
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
