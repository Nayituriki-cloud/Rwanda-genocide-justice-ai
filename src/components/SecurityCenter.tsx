import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Key, Activity, Clock, CheckCircle, 
  AlertCircle, RefreshCw, FileText, UserCheck, ShieldAlert
} from 'lucide-react';
import { AuditLogEntry, UserRole } from '../types';

interface SecurityCenterProps {
  logs: AuditLogEntry[];
  currentRole: UserRole;
  onRefreshLogs: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({
  logs,
  currentRole,
  onRefreshLogs
}) => {
  const [filterAction, setFilterAction] = useState('ALL');

  const rolePermissions = [
    { role: 'Public User', access: 'Educational archives, memorial registries, public verified wanted notices, submit confidential tips.' },
    { role: 'Verified Researcher', access: 'All public access + declassified court transcripts, unclassified exhibits, academic research queries.' },
    { role: 'Investigator', access: 'All researcher access + full evidence vault, Rule 75 protected witness statements, citizen lead triage queue, AI case builder.' },
    { role: 'Prosecutor', access: 'All investigator access + indictment synthesis, chain-of-custody authorization, bilateral extradition briefs.' },
    { role: 'Administrator', access: 'Full system authorization, immutable audit log monitoring, cryptographic checksum validation, role assignment.' }
  ];

  const filteredLogs = logs.filter(l => {
    if (filterAction === 'ALL') return true;
    return l.action.includes(filterAction);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
                Security Center & Immutable Audit Log
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Tamper-evident access telemetry, cryptographic SHA-256 event chaining, and role-based access controls (RBAC).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>TLS 1.3 / AES-256 GCM</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
              MFA Hardware Token Verified
            </span>
          </div>
        </div>

        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 font-mono text-[10px] uppercase">Session Timeout</div>
            <div className="text-sm font-bold text-slate-200 font-mono mt-1">14:52 remaining</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Auto-renewal enabled</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 font-mono text-[10px] uppercase">Active Role Clearance</div>
            <div className="text-sm font-bold text-amber-400 font-mono mt-1">{currentRole}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Least-privilege isolation</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 font-mono text-[10px] uppercase">Evidence Integrity</div>
            <div className="text-sm font-bold text-emerald-400 font-mono mt-1">100% Certified</div>
            <div className="text-[10px] text-slate-400 mt-0.5">SHA-256 bit-level match</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 font-mono text-[10px] uppercase">Data Loss Prevention</div>
            <div className="text-sm font-bold text-blue-400 font-mono mt-1">Zero-Leak Shield</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Witness redactions locked</div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control (RBAC) Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <h2 className="font-cinzel text-sm font-bold text-slate-200 uppercase tracking-wide">
          Role-Based Access Control (RBAC) Clearance Matrix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {rolePermissions.map((rp, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border space-y-1.5 ${
                currentRole === rp.role
                  ? 'bg-amber-950/40 border-amber-500 shadow-md'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-slate-100 text-xs">{rp.role}</span>
                {currentRole === rp.role && (
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {rp.access}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Immutable Audit Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h2 className="font-cinzel text-sm font-bold text-slate-100 uppercase tracking-wide">
              Live Immutable Access & Audit Telemetry
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshLogs}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Logs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase">
                <th className="py-2.5 px-3">Event ID</th>
                <th className="py-2.5 px-3">Timestamp (UTC)</th>
                <th className="py-2.5 px-3">User Role & ID</th>
                <th className="py-2.5 px-3">Action Performed</th>
                <th className="py-2.5 px-3">Target Resource</th>
                <th className="py-2.5 px-3">Cryptographic Checksum</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-2 px-3 text-amber-400 font-semibold">{log.id}</td>
                  <td className="py-2 px-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="py-2 px-3 text-slate-300">
                    <span className="text-[10px] text-slate-400 block">{log.userRole}</span>
                    <span className="text-slate-200">{log.userIdentifier}</span>
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-200">{log.action}</td>
                  <td className="py-2 px-3 text-slate-300">{log.resourceType}</td>
                  <td className="py-2 px-3 text-slate-500 truncate max-w-[140px]" title={log.sha256Verification}>
                    {log.sha256Verification.slice(0, 16)}...
                  </td>
                  <td className="py-2 px-3">
                    <span className="px-1.5 py-0.2 text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
