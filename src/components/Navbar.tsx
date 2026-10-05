import React from 'react';
import { Shield, Scale, Eye, UserCheck, Lock, AlertTriangle, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenDownloadCenter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenDownloadCenter
}) => {
  const roles: { role: UserRole; badge: string; color: string }[] = [
    { role: 'Public User', badge: 'Public Access', color: 'bg-slate-800 text-slate-300' },
    { role: 'Verified Researcher', badge: 'Academic Clearance', color: 'bg-blue-900/60 text-blue-200 border border-blue-700/50' },
    { role: 'Investigator', badge: 'OTP / NPPA Clearance', color: 'bg-amber-900/60 text-amber-200 border border-amber-700/50' },
    { role: 'Prosecutor', badge: 'Judicial Officer', color: 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/50' },
    { role: 'Administrator', badge: 'Security Master', color: 'bg-purple-900/60 text-purple-200 border border-purple-700/50' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top institution bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-950/30">
            <Scale className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold tracking-wider text-slate-100 uppercase">
                Rwanda Genocide Justice AI
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
                Official Judicial Support System
              </span>
            </div>
            <p className="text-[11px] text-slate-400 italic font-serif">
              "Truth through evidence. Justice through law. Memory for generations."
            </p>
          </div>
        </div>

        {/* Core methodology, Easy Download & Role switcher */}
        <div className="flex items-center gap-2.5">
          {/* Quick Downloads Center Button */}
          <button
            onClick={onOpenDownloadCenter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-medium shadow-sm transition-all"
            title="Download Cases, Evidence Ledgers, Wanted Circulars, and Audit Logs"
          >
            <span className="text-sm">📥</span>
            <span>Easy Downloads</span>
          </button>

          {/* Methodology badge */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded text-[11px] font-mono text-slate-300">
            <span className="text-amber-400">REMEMBER</span>
            <span className="text-slate-600">→</span>
            <span className="text-blue-400">DOCUMENT</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400">VERIFY</span>
            <span className="text-slate-600">→</span>
            <span className="text-purple-400">INVESTIGATE</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-300 font-semibold">JUSTICE</span>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <div className="flex items-center gap-1.5 px-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline font-mono">Role:</span>
            </div>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-slate-950 text-xs text-slate-200 font-medium py-1 px-2.5 rounded border border-slate-700/80 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              {roles.map(r => (
                <option key={r.role} value={r.role}>
                  {r.role} ({r.badge})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none text-xs font-medium">
          {[
            { id: 'investigate', label: '🔎 Investigate', badge: null },
            { id: 'cases', label: '📁 Cases', badge: '12' },
            { id: 'evidence', label: '🧾 Evidence Vault', badge: 'Verified' },
            { id: 'wanted', label: '👤 Wanted Persons', badge: 'Red Notice' },
            { id: 'tracking', label: '🎯 Fugitive Tracking', roleRequired: 'Investigator' },
            { id: 'map', label: '🗺️ Historical Map', badge: null },
            { id: 'timeline', label: '🕰️ Timeline', badge: '1994' },
            { id: 'witness', label: '👁️ Witness Protection', badge: 'Rule 75' },
            { id: 'ai-investigator', label: '🤖 AI Investigator', badge: 'Gemini' },
            { id: 'case-builder', label: '📋 Case Builder', roleRequired: 'Investigator' },
            { id: 'court', label: '⚖️ Court Records', badge: null },
            { id: 'archives', label: '📚 Archives', badge: null },
            { id: 'lead', label: '📤 Submit a Lead', badge: 'Public' },
            { id: 'education', label: '📖 Education & Memory', badge: null },
            { id: 'security', label: '🔐 Security Center', badge: 'Audit' },
          ].map((tab) => {
            const isRestricted = tab.roleRequired && currentRole === 'Public User' && tab.roleRequired === 'Investigator';
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 relative ${
                  activeTab === tab.id
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 font-mono bg-slate-800 text-slate-400 rounded">
                    {tab.badge}
                  </span>
                )}
                {isRestricted && (
                  <Lock className="w-2.5 h-2.5 text-slate-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
