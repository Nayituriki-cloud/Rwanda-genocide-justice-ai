import React, { useState } from 'react';
import { MapPin, Layers, Shield, Eye, Building, Scale, AlertTriangle, ChevronRight, Compass } from 'lucide-react';
import { HistoricalLocation, CaseRecord } from '../types';

interface HistoricalMapProps {
  locations: HistoricalLocation[];
  cases: CaseRecord[];
  onSelectCase: (caseId: string) => void;
}

export const HistoricalMap: React.FC<HistoricalMapProps> = ({
  locations,
  cases,
  onSelectCase
}) => {
  const [selectedLocation, setSelectedLocation] = useState<HistoricalLocation>(locations[0]);
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'MEMORIALS' | 'JURISDICTIONS' | 'RESISTANCE'>('ALL');

  const filteredLocations = locations.filter(loc => {
    if (activeLayer === 'ALL') return true;
    if (activeLayer === 'MEMORIALS') return loc.type.includes('Memorial');
    if (activeLayer === 'JURISDICTIONS') return loc.type.includes('Judicial') || loc.type.includes('Commune');
    if (activeLayer === 'RESISTANCE') return loc.type.includes('Resistance') || loc.type.includes('Infrastructure');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Map Mandate */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Historical Map of Rwanda & Judicial Jurisdictions
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Documented 1994 incident locations, genocide memorial sites, and international court jurisdictions.
            </p>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 border border-slate-800 rounded-lg text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setActiveLayer('ALL')}
              className={`px-2.5 py-1 rounded transition-colors ${activeLayer === 'ALL' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All Sites
            </button>
            <button
              onClick={() => setActiveLayer('MEMORIALS')}
              className={`px-2.5 py-1 rounded transition-colors ${activeLayer === 'MEMORIALS' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Memorials
            </button>
            <button
              onClick={() => setActiveLayer('JURISDICTIONS')}
              className={`px-2.5 py-1 rounded transition-colors ${activeLayer === 'JURISDICTIONS' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Tribunals
            </button>
            <button
              onClick={() => setActiveLayer('RESISTANCE')}
              className={`px-2.5 py-1 rounded transition-colors ${activeLayer === 'RESISTANCE' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Key Sectors
            </button>
          </div>
        </div>

        {/* Protection safety note */}
        <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-slate-300">Privacy Safeguard:</strong> This public map displays solely documented historical sites and official tribunal jurisdictions. It strictly never displays private residences or precise locations of witnesses or civilians.
          </span>
        </div>
      </div>

      {/* Interactive Map Layout: Vector Cartographic Grid & Selected Site Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Canvas (Stylized Vector Display) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl relative min-h-[460px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-3 border-b border-slate-800">
            <span className="text-amber-400 font-bold uppercase tracking-wider">Cartographic Coordinate Grid: RWANDA 1994</span>
            <span>Scale: 1:1,000,000 Verified</span>
          </div>

          {/* Visual Map Matrix */}
          <div className="relative my-4 flex-1 rounded-xl bg-slate-950/90 border border-slate-800 p-6 flex flex-col justify-between overflow-hidden">
            {/* Background Grid Lines & Contour Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-600">
              LAT: -1.0°S to -2.8°S | LNG: 28.8°E to 30.8°E
            </div>

            {/* Geographical Markers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10 py-6">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-3 rounded-xl border text-left transition-all relative group ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950/50'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="font-cinzel font-bold text-xs text-slate-100 truncate">
                          {loc.name.split('(')[0]}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono px-1 py-0.2 bg-slate-950 text-slate-400 rounded">
                        {loc.documentedIncidentsCount}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                      {loc.prefecture}
                    </div>

                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                      [{loc.coordinates[0].toFixed(2)}°, {loc.coordinates[1].toFixed(2)}°]
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Watermark / Legend */}
            <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Memorial Site</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Judicial Hub</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Historical Incidents</span>
              </div>
              <span>Click any coordinate node to view archival dossier</span>
            </div>
          </div>
        </div>

        {/* Selected Location Details Panel */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded">
              {selectedLocation.type}
            </span>
            <h2 className="font-cinzel text-lg font-bold text-slate-100 mt-2">
              {selectedLocation.name}
            </h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Prefecture: {selectedLocation.prefecture}
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <span className="font-mono text-slate-400 text-[11px] font-semibold uppercase">
                Historical Significance (1994):
              </span>
              <p className="mt-1 leading-relaxed text-slate-200">
                {selectedLocation.historicalSignificance}
              </p>
            </div>

            {selectedLocation.memorialInfo && (
              <div className="p-3 bg-slate-950 border border-amber-900/30 rounded-lg space-y-1">
                <div className="font-mono text-amber-400 text-[10px] font-semibold uppercase">
                  Genocide Memorial & Commemoration:
                </div>
                <p className="text-[11px] text-amber-100/90 leading-relaxed font-serif">
                  {selectedLocation.memorialInfo}
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800">
              <div className="font-mono text-slate-400 text-[11px] font-semibold uppercase mb-2">
                Documented Cases Connected ({selectedLocation.relatedCaseIds.length}):
              </div>
              <div className="space-y-2">
                {selectedLocation.relatedCaseIds.map(caseId => {
                  const c = cases.find(item => item.id === caseId);
                  if (!c) return null;
                  return (
                    <div
                      key={caseId}
                      onClick={() => onSelectCase(caseId)}
                      className="p-2.5 bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-slate-200 text-xs group-hover:text-amber-300">
                          {c.suspectName}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {c.caseNumber} • {c.legalStatus}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
