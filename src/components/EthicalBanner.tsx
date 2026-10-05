import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Scale, X, ExternalLink } from 'lucide-react';

export const EthicalBanner: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="bg-slate-900 border-b border-amber-900/30 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono text-[11px] text-amber-400">LEGAL & ETHICAL PROTOCOL ACTIVE:</span>
          <span className="truncate">Rule of law enforced. Zero vigilante tolerance. Presumption of innocence until final court verdict.</span>
        </div>
        <button
          onClick={() => setMinimized(false)}
          className="text-[11px] text-amber-400 hover:text-amber-300 underline font-mono"
        >
          View Mandate
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border-b border-amber-800/40 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-300 uppercase tracking-wider font-mono text-[11px]">
                Judicial Notice & Anti-Vigilante Mandate
              </span>
              <span className="px-1.5 py-0.2 text-[10px] bg-red-950 text-red-300 border border-red-800/50 rounded font-mono">
                NON-VIGILANTE SYSTEM
              </span>
            </div>
            <p className="text-slate-300 mt-0.5 text-[11px] leading-relaxed">
              This platform is an official investigation and evidence management support system. It <strong className="text-amber-200">never conducts vigilante actions, encourages confronting individuals, or orders arrests</strong>.
              Presumption of innocence is absolute until conviction by a competent judicial authority. All public intelligence follows:
              <span className="font-mono text-amber-300 ml-1">LEAD → VERIFY → HUMAN INVESTIGATION → LAW-ENFORCEMENT ACTION → LAWFUL ARREST → JUDICIAL PROCESS</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/70 border border-slate-700/50 text-[11px] text-slate-300 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHA-256 Tamper Sealed</span>
          </div>
          <button
            onClick={() => setMinimized(true)}
            className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors"
            title="Minimize Notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
