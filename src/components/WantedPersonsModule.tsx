import React from 'react';
import { ShieldAlert, AlertTriangle, ExternalLink, Send, ArrowRight, User } from 'lucide-react';
import { WantedPerson } from '../types';

interface WantedPersonsModuleProps {
  wantedPersons: WantedPerson[];
  onSubmitLeadForPerson: (personName: string) => void;
}

export const WantedPersonsModule: React.FC<WantedPersonsModuleProps> = ({
  wantedPersons,
  onSubmitLeadForPerson
}) => {
  return (
    <div className="space-y-6">
      {/* Header with High-Visibility Legal Disclaimer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-950/60 border border-red-800/60 text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
              Verified Wanted Persons (Official Red Notices)
            </h1>
            <p className="text-xs text-slate-400">
              Only verified records from the UN International Residual Mechanism for Criminal Tribunals (IRMCT) and Rwandan National Public Prosecution Authority (NPPA).
            </p>
          </div>
        </div>

        {/* Anti-Vigilante Red Warning Banner */}
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-mono font-bold uppercase tracking-wider text-red-300">
              Strict Non-Intervention & Non-Vigilante Notice:
            </div>
            <p className="leading-relaxed">
              <strong>“Do not approach or confront this person. Provide information to the appropriate law-enforcement authority.”</strong>
              Civilians are strictly prohibited from attempting surveillance, following, or detention. Under international protocols, all information must be submitted through lawful institutional channels for professional law-enforcement action.
            </p>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wantedPersons.map((person) => (
          <div
            key={person.id}
            className="bg-slate-900 border border-red-900/40 hover:border-red-600/50 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Profile Top Bar */}
              <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-slate-900 p-4 border-b border-red-900/30 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                    {person.photoUrl ? (
                      <img src={person.photoUrl} alt={person.name} className="h-full w-full object-cover grayscale contrast-125" />
                    ) : (
                      <User className="w-8 h-8 text-slate-600 m-auto mt-4" />
                    )}
                  </div>
                  <div>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-red-950 text-red-300 border border-red-800 rounded">
                      OFFICIAL WANTED NOTICE
                    </span>
                    <h2 className="font-cinzel text-base font-bold text-slate-100 mt-1">
                      {person.name}
                    </h2>
                    <p className="text-[11px] font-mono text-slate-400">Case Ref: {person.caseNumber}</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-5 space-y-4 text-xs text-slate-300">
                {person.aliases.length > 0 && (
                  <div>
                    <span className="font-mono text-slate-500">Known Aliases: </span>
                    <span className="text-slate-200">{person.aliases.join(', ')}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="font-mono text-slate-500 uppercase text-[10px] font-semibold">
                    Issuing Authority:
                  </span>
                  <div className="text-slate-200 font-medium">{person.issuingAuthority}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Date of Notice: {person.officialNoticeDate}</div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-slate-500 uppercase text-[10px] font-semibold">
                    Formal Charges:
                  </span>
                  <ul className="space-y-1 pl-2">
                    {person.charges.map((ch, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400 font-mono">•</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-mono text-slate-400 text-[10px] font-semibold uppercase">
                    Investigative Context & Background:
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {person.lastKnownContext}
                  </p>
                </div>

                <div className="text-[11px] text-slate-400">
                  <span className="font-mono text-slate-500">International Cooperation: </span>
                  <span>{person.internationalCooperationStatus}</span>
                </div>

                {/* Mandatory Warning on every profile as specified */}
                <div className="p-2.5 rounded bg-red-950/60 border border-red-800/80 text-red-200 font-serif italic text-[11px] leading-relaxed">
                  “{person.mandatoryWarning}”
                </div>
              </div>
            </div>

            {/* Profile Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">
                Source: {person.sourceCitation}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    let doc = `========================================================================\n`;
                    doc += `  UNITED NATIONS IRMCT / REPUBLIC OF RWANDA NPPA\n`;
                    doc += `  OFFICIAL RED NOTICE CIRCULAR: ${person.name.toUpperCase()}\n`;
                    doc += `========================================================================\n\n`;
                    doc += `CASE NUMBER: ${person.caseNumber}\n`;
                    doc += `LEGAL STATUS: ${person.legalStatus}\n`;
                    doc += `ISSUING AUTHORITY: ${person.issuingAuthority}\n`;
                    doc += `NOTICE DATE: ${person.officialNoticeDate}\n`;
                    if (person.aliases.length) doc += `KNOWN ALIASES: ${person.aliases.join(', ')}\n`;
                    doc += `\nFORMAL CHARGES:\n`;
                    person.charges.forEach(ch => { doc += `  - ${ch}\n`; });
                    doc += `\nINVESTIGATIVE CONTEXT:\n${person.lastKnownContext}\n\n`;
                    doc += `INTERNATIONAL COOPERATION STATUS:\n${person.internationalCooperationStatus}\n\n`;
                    doc += `OFFICIAL SOURCE REFERENCE:\n${person.sourceCitation} (${person.officialSourceUrl})\n\n`;
                    doc += `========================================================================\n`;
                    doc += `MANDATORY INSTRUCTION:\n`;
                    doc += `“${person.mandatoryWarning}”\n`;
                    doc += `========================================================================\n`;

                    const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Wanted_Notice_${person.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors"
                >
                  Download Circular (.TXT)
                </button>

                <button
                  onClick={() => onSubmitLeadForPerson(person.name)}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Lead</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
