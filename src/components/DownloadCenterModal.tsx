import React from 'react';
import { 
  X, Download, FileText, FileSpreadsheet, ShieldCheck, Scale, 
  Clock, ShieldAlert, BookOpen, CheckCircle, Database
} from 'lucide-react';
import { CaseRecord, EvidenceItem, WantedPerson, TimelineEvent, AuditLogEntry } from '../types';
import { downloadCSV, downloadJSON, downloadMarkdown, downloadText } from '../utils/exportUtils';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  cases: CaseRecord[];
  evidence: EvidenceItem[];
  wantedPersons: WantedPerson[];
  timeline: TimelineEvent[];
  auditLogs: AuditLogEntry[];
}

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({
  isOpen,
  onClose,
  cases,
  evidence,
  wantedPersons,
  timeline,
  auditLogs
}) => {
  if (!isOpen) return null;

  // 1. Export Cases as CSV
  const handleExportCasesCSV = () => {
    const headers = ['Case ID', 'Case Number', 'Suspect Name', 'Legal Status', 'Court or Authority', 'Country', 'Charges', 'Locations', 'Current Status', 'Verified Source'];
    const rows = cases.map(c => [
      c.id,
      c.caseNumber,
      c.suspectName,
      c.legalStatus,
      c.courtOrAuthority,
      c.country,
      c.charges.join('; '),
      c.locations.join('; '),
      c.currentCaseStatus,
      c.verifiedSource
    ]);
    downloadCSV(rows, headers, `Rwanda_Genocide_Cases_Database_${new Date().toISOString().slice(0, 10)}`);
  };

  // 2. Export Cases as Full Markdown Brief
  const handleExportCasesMarkdown = () => {
    let md = `# RWANDA GENOCIDE JUSTICE AI - OFFICIAL CASE DATABASE\n`;
    md += `*Generated: ${new Date().toISOString()}*\n`;
    md += `*Tagline: "Truth through evidence. Justice through law. Memory for generations."*\n\n`;
    md += `> MANDATORY NOTICE: Presumption of innocence applies until final court conviction. Non-vigilante legal standard.\n\n`;
    md += `---\n\n`;

    cases.forEach((c, idx) => {
      md += `## ${idx + 1}. ${c.suspectName} (${c.caseNumber})\n`;
      md += `- **Legal Status:** ${c.legalStatus}\n`;
      md += `- **Court/Authority:** ${c.courtOrAuthority}\n`;
      md += `- **Jurisdiction/Country:** ${c.country}\n`;
      if (c.knownAliases.length) md += `- **Known Aliases:** ${c.knownAliases.join(', ')}\n`;
      md += `- **Relevant Dates:** ${c.relevantDates.join(', ')}\n`;
      md += `- **Locations:** ${c.locations.join(', ')}\n`;
      md += `- **Charges:**\n${c.charges.map(ch => `  * ${ch}`).join('\n')}\n`;
      md += `- **Summary:** ${c.summary}\n`;
      md += `- **Court Decisions:**\n${c.courtDecisions.map(d => `  * **${d.chamber} (${d.date}):** ${d.decision} ${d.sentence ? `[Sentence: ${d.sentence}]` : ''}`).join('\n')}\n`;
      md += `- **Current Status:** ${c.currentCaseStatus}\n`;
      md += `- **Verified Source:** ${c.verifiedSource}\n\n`;
      md += `---\n\n`;
    });

    downloadMarkdown(md, `Rwanda_Genocide_Official_Case_Briefs_${new Date().toISOString().slice(0, 10)}`);
  };

  // 3. Export Evidence Vault as CSV
  const handleExportEvidenceCSV = () => {
    const headers = ['Evidence ID', 'Title', 'Format Type', 'Source', 'Date Obtained', 'Authenticity Status', 'SHA-256 Hash', 'Related Case', 'Related Locations', 'Investigator Notes'];
    const rows = evidence.map(e => [
      e.id,
      e.title,
      e.type,
      e.source,
      e.dateObtained,
      e.authenticityStatus,
      e.sha256Hash,
      e.relatedCaseId || e.relatedCases.join('; '),
      e.relatedLocations.join('; '),
      e.investigatorNotes
    ]);
    downloadCSV(rows, headers, `Evidence_Vault_Registry_SHA256_${new Date().toISOString().slice(0, 10)}`);
  };

  // 4. Export Evidence as Authenticity Certificate Ledger
  const handleExportEvidenceLedger = () => {
    let md = `# RWANDA GENOCIDE JUSTICE AI - CERTIFICATE OF EVIDENCE INTEGRITY & CUSTODY\n`;
    md += `*Cryptographic Ledger - SHA-256 Authenticated*\n`;
    md += `*Export Date: ${new Date().toISOString()}*\n\n`;

    evidence.forEach((e) => {
      md += `### [${e.id}] ${e.title}\n`;
      md += `- **Format Type:** ${e.type}\n`;
      md += `- **Authenticity Status:** ${e.authenticityStatus}\n`;
      md += `- **SHA-256 Hash:** \`${e.sha256Hash}\`\n`;
      md += `- **Primary Source:** ${e.source} (Acquired: ${e.dateObtained})\n`;
      md += `- **Description:** ${e.description}\n`;
      if (e.contentSnippet) md += `- **Certified Excerpt:** "${e.contentSnippet}"\n`;
      md += `- **Chain of Custody History:**\n`;
      e.chainOfCustody.forEach(c => {
        md += `  * ${c.date} | Custodian: ${c.custodian} | Action: ${c.action} (Verified by: ${c.verifiedBy})\n`;
      });
      md += `\n`;
    });

    downloadMarkdown(md, `Evidence_Authenticity_Ledger_${new Date().toISOString().slice(0, 10)}`);
  };

  // 5. Export Verified Wanted Persons Bulletin
  const handleExportWantedBulletin = () => {
    let txt = `========================================================================\n`;
    txt += `  UNITED NATIONS IRMCT / REPUBLIC OF RWANDA NPPA\n`;
    txt += `  OFFICIAL VERIFIED WANTED PERSONS BULLETIN (RED NOTICES)\n`;
    txt += `========================================================================\n`;
    txt += `MANDATORY WARNING:\n`;
    txt += `“Do not approach or confront this person. Provide information to the\n`;
    txt += ` appropriate law-enforcement authority or the IRMCT Office of the Prosecutor.”\n`;
    txt += `========================================================================\n\n`;

    wantedPersons.forEach((w, idx) => {
      txt += `[PERSON ${idx + 1}] ${w.name.toUpperCase()}\n`;
      txt += `Case Ref: ${w.caseNumber} | Status: ${w.legalStatus}\n`;
      if (w.aliases.length) txt += `Aliases: ${w.aliases.join(', ')}\n`;
      txt += `Issuing Authority: ${w.issuingAuthority}\n`;
      txt += `Date of Notice: ${w.officialNoticeDate}\n`;
      txt += `Charges:\n${w.charges.map(ch => `  - ${ch}`).join('\n')}\n`;
      txt += `Context: ${w.lastKnownContext}\n`;
      txt += `International Cooperation: ${w.internationalCooperationStatus}\n`;
      txt += `Source: ${w.sourceCitation}\n`;
      txt += `------------------------------------------------------------------------\n\n`;
    });

    downloadText(txt, `Verified_Wanted_Persons_Bulletin_${new Date().toISOString().slice(0, 10)}`);
  };

  // 6. Export Historical Timeline Chronology
  const handleExportTimeline = () => {
    let md = `# RWANDA 1994 GENOCIDE & JUSTICE TIMELINE CHRONOLOGY\n`;
    md += `*Methodological Flow: DATE → LOCATION → EVENT → PEOPLE → EVIDENCE → COURT RECORD*\n\n`;

    timeline.forEach(t => {
      md += `### ${t.formattedDate} — ${t.title}\n`;
      md += `- **Location:** ${t.location} (${t.prefecture})\n`;
      md += `- **Category:** ${t.category}\n`;
      md += `- **Documented Description:** ${t.description}\n`;
      md += `- **Key Persons Involved:** ${t.peopleInvolved.join(', ')}\n`;
      md += `- **Supporting Evidence IDs:** ${t.evidenceIds.join(', ')}\n`;
      md += `- **Court Precedent Citations:** ${t.courtRecordIds.join(', ')}\n\n`;
    });

    downloadMarkdown(md, `Rwanda_1994_Historical_Timeline_${new Date().toISOString().slice(0, 10)}`);
  };

  // 7. Export Audit Telemetry CSV
  const handleExportAuditLogsCSV = () => {
    const headers = ['Event ID', 'Timestamp', 'User Role', 'User Identifier', 'Action', 'Resource Type', 'Resource ID', 'SHA-256 Checksum', 'Status'];
    const rows = auditLogs.map(l => [
      l.id,
      l.timestamp,
      l.userRole,
      l.userIdentifier,
      l.action,
      l.resourceType,
      l.resourceId || '',
      l.sha256Verification,
      l.status
    ]);
    downloadCSV(rows, headers, `Security_Audit_Logs_${new Date().toISOString().slice(0, 10)}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-5 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg font-bold text-slate-100 uppercase tracking-wide">
                Download Center & Export Hub
              </h2>
              <p className="text-xs text-slate-400">
                Easy 1-click download of verified judicial records, evidence ledgers, and dossiers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 space-y-4 text-xs">
          {/* Section: Cases */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel font-bold text-slate-200 text-sm">
                  Judicial Cases Repository ({cases.length} Records)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400">
                Full Database
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Complete index of Convicted, Indicted, Wanted, Preliminary Inquiry, and Acquitted records under ICTR and Rwandan NPPA jurisdictions.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleExportCasesCSV}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Spreadsheet (CSV)</span>
              </button>
              <button
                onClick={handleExportCasesMarkdown}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Download Comprehensive Dossier (.MD)</span>
              </button>
              <button
                onClick={() => downloadJSON(cases, `Cases_Database_${new Date().toISOString().slice(0, 10)}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Raw JSON</span>
              </button>
            </div>
          </div>

          {/* Section: Evidence Vault */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-cinzel font-bold text-slate-200 text-sm">
                  Admitted Evidence Vault & Chain of Custody ({evidence.length} Exhibits)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                SHA-256 Stamped
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Forensic reports, declassified UNAMIR cables, radio broadcast transcripts, exhumation surveys, and complete chain-of-custody transfer logs.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleExportEvidenceCSV}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Evidence Index (CSV)</span>
              </button>
              <button
                onClick={handleExportEvidenceLedger}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Download Authenticity Certificate Ledger (.MD)</span>
              </button>
              <button
                onClick={() => downloadJSON(evidence, `Evidence_Vault_${new Date().toISOString().slice(0, 10)}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Raw JSON</span>
              </button>
            </div>
          </div>

          {/* Section: Wanted Persons Circulars */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="font-cinzel font-bold text-slate-200 text-sm">
                  Official Verified Wanted Persons Bulletin ({wantedPersons.length} Notices)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950 text-red-300 border border-red-800">
                Interpol Red Notices
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official wanted profiles from UN IRMCT and NPPA Rwanda, incorporating mandatory anti-vigilante warnings and lawful submission procedures.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleExportWantedBulletin}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-red-400" />
                <span>Download Official Wanted Circular (.TXT)</span>
              </button>
              <button
                onClick={() => downloadJSON(wantedPersons, `Wanted_Persons_${new Date().toISOString().slice(0, 10)}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Download JSON Dataset</span>
              </button>
            </div>
          </div>

          {/* Section: Timeline & Security Logs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-cinzel font-bold text-slate-200 text-xs">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>1994 Historical Timeline</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Full chronology linking Date → Location → Event → People → Evidence → Court Records.
              </p>
              <button
                onClick={handleExportTimeline}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Timeline (.MD)</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-cinzel font-bold text-slate-200 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Security Audit Logs</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Immutable access telemetry and SHA-256 access checksums for compliance.
              </p>
              <button
                onClick={handleExportAuditLogsCSV}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Audit Logs (CSV)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>All downloads generated locally with standard UTF-8 encoding</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
