import React, { useState } from 'react';
import { Send, Shield, AlertTriangle, CheckCircle, Clock, Lock, FileText, UserCheck, Eye } from 'lucide-react';
import { SubmittedLead, LeadClassification, UserRole } from '../types';

interface LeadSubmissionModuleProps {
  leads: SubmittedLead[];
  onLeadSubmitted: (newLead: SubmittedLead) => void;
  currentRole: UserRole;
  prefilledPerson?: string;
}

export const LeadSubmissionModule: React.FC<LeadSubmissionModuleProps> = ({
  leads,
  onLeadSubmitted,
  currentRole,
  prefilledPerson = ''
}) => {
  const [personInvolved, setPersonInvolved] = useState(prefilledPerson);
  const [locationReported, setLocationReported] = useState('');
  const [dateTimeInfo, setDateTimeInfo] = useState('');
  const [description, setDescription] = useState('');
  const [supportingDocs, setSupportingDocs] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successLead, setSuccessLead] = useState<SubmittedLead | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Investigator filter for lead triage queue
  const [triageFilter, setTriageFilter] = useState<string>('ALL');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !locationReported.trim()) {
      setError('Please provide at least the location and description of what you know.');
      return;
    }
    if (!acceptedTerms) {
      setError('You must confirm that you understand this platform does not condone vigilante actions.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personInvolved,
          locationReported,
          dateTimeInfo,
          description,
          supportingDocsDescription: supportingDocs,
          contactInfo: isAnonymous ? 'ANONYMOUS' : contactInfo,
          isAnonymous
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit lead');

      onLeadSubmitted(data.lead);
      setSuccessLead(data.lead);
      // Reset form
      setPersonInvolved('');
      setLocationReported('');
      setDateTimeInfo('');
      setDescription('');
      setSupportingDocs('');
      setContactInfo('');
      setIsAnonymous(false);
      setAcceptedTerms(false);
    } catch (err: any) {
      setError(err.message || 'Error transmitting lead');
    } finally {
      setSubmitting(false);
    }
  };

  const isInvestigator = currentRole === 'Investigator' || currentRole === 'Prosecutor' || currentRole === 'Administrator';

  const filteredQueue = leads.filter(l => {
    if (triageFilter === 'ALL') return true;
    return l.aiClassification === triageFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl font-bold text-slate-100 uppercase tracking-wide">
              Confidential Citizen Lead Submission
            </h1>
            <p className="text-xs text-slate-400">
              Submit documented information to competent authorities. Original data is cryptographically preserved and triaged for human investigators.
            </p>
          </div>
        </div>

        {/* Protection & Anti-Vigilante Warning */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
          <div className="font-mono text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Strict Privacy & Non-Vigilante Assurance</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Submitted information is transferred exclusively to authorized national and international investigators.
            <strong className="text-slate-200 ml-1">Do not attempt to follow, photograph in secret, or confront any person yourself.</strong>
            AI triage assists with record cross-referencing and never determines criminal guilt.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submission Form (I HAVE INFORMATION) */}
        <div className={isInvestigator ? "lg:col-span-6" : "lg:col-span-8 lg:col-start-3"}>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                Formal Information Intake Form
              </span>
              <h2 className="font-cinzel text-lg font-bold text-slate-100 mt-0.5">
                "I Have Information"
              </h2>
            </div>

            {successLead && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-mono font-bold text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Lead Successfully Transmitted to Investigation Registry</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your lead has been assigned ID: <strong className="font-mono text-slate-100">{successLead.id}</strong>.
                  AI Triage Classification: <strong className="font-mono text-amber-300">{successLead.aiClassification}</strong> (Confidence: {successLead.aiConfidenceMatch}%).
                  The record has been forwarded to human investigators.
                </p>
                <button
                  onClick={() => setSuccessLead(null)}
                  className="text-[11px] text-emerald-300 underline font-mono pt-1"
                >
                  Submit another report
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono text-slate-300 font-semibold uppercase text-[11px]">
                  Person or Suspect Involved (Known Name or Aliases):
                </label>
                <input
                  type="text"
                  value={personInvolved}
                  onChange={(e) => setPersonInvolved(e.target.value)}
                  placeholder="e.g. Individual matching Charles Sikubwabo, or former local leader..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-slate-300 font-semibold uppercase text-[11px]">
                    Location Observed / Relevant City & Country: *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationReported}
                    onChange={(e) => setLocationReported(e.target.value)}
                    placeholder="e.g. Eastern DRC, Brussels, Nairobi..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-slate-300 font-semibold uppercase text-[11px]">
                    Approximate Date / Time of Observation:
                  </label>
                  <input
                    type="text"
                    value={dateTimeInfo}
                    onChange={(e) => setDateTimeInfo(e.target.value)}
                    placeholder="e.g. February 2024, or historic 1994 recollection"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-slate-300 font-semibold uppercase text-[11px]">
                  What You Know / Detailed Observations: *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe in detail what was observed, statements made, employment, associates, or historical knowledge connected to 1994 events..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-slate-300 font-semibold uppercase text-[11px]">
                  Supporting Documents / Photos Description:
                </label>
                <input
                  type="text"
                  value={supportingDocs}
                  onChange={(e) => setSupportingDocs(e.target.value)}
                  placeholder="e.g. Scanned manifest, church newsletter, passport copy reference..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Contact info vs Anonymous toggle */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
                    />
                    <span>Submit Anonymously (Identity Shielded)</span>
                  </label>
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {!isAnonymous && (
                  <div className="space-y-1">
                    <label className="font-mono text-slate-400 text-[10px] uppercase">
                      Contact Information (Email or Secure Phone for Verification):
                    </label>
                    <input
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="investigators will only reach out if critical corroboration is required"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Mandatory Anti-Vigilante Checkbox */}
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-amber-700 bg-slate-900 text-amber-500 focus:ring-0"
                  />
                  <span className="leading-relaxed">
                    I confirm that I have not approached, followed, or confronted any person, and I understand that this platform operates strictly under lawful institutional law-enforcement channels.
                  </span>
                </label>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-colors"
              >
                {submitting ? (
                  <span>Encrypting & Triaging Submission...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Sourced Information to Authorities</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Investigator Triage Queue (Visible for Investigator / Prosecutor / Admin) */}
        {isInvestigator && (
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-500" />
                    <h2 className="font-cinzel text-sm font-bold text-slate-100 uppercase tracking-wide">
                      Investigator Lead Triage Queue
                    </h2>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Clearance: {currentRole} • {leads.length} Records In Vault
                  </div>
                </div>

                <select
                  value={triageFilter}
                  onChange={(e) => setTriageFilter(e.target.value)}
                  className="bg-slate-950 text-[11px] font-mono text-slate-200 py-1 px-2 rounded border border-slate-700"
                >
                  <option value="ALL">All Categories</option>
                  <option value="POTENTIALLY IMPORTANT">Potentially Important</option>
                  <option value="REQUIRES HUMAN REVIEW">Requires Human Review</option>
                  <option value="NEW LEAD">New Lead</option>
                  <option value="DUPLICATE">Duplicate</option>
                  <option value="INSUFFICIENT INFORMATION">Insufficient Information</option>
                </select>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredQueue.map((lead) => (
                  <div key={lead.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-slate-500 text-[10px]">{lead.id}</span>
                        <h3 className="font-semibold text-slate-200 text-xs">{lead.personInvolved}</h3>
                      </div>
                      <span className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                        lead.aiClassification === 'POTENTIALLY IMPORTANT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        lead.aiClassification === 'DUPLICATE' ? 'bg-slate-800 text-slate-400' :
                        'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {lead.aiClassification || 'PENDING'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <span className="font-mono text-slate-500">Location: </span>
                      <span className="text-slate-300">{lead.locationReported}</span>
                      <span className="mx-2 text-slate-600">•</span>
                      <span className="font-mono text-slate-500">Date: </span>
                      <span className="text-slate-300">{lead.dateTimeInfo}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      {lead.description}
                    </p>

                    {lead.aiTriageSummary && (
                      <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/30 text-[11px] space-y-1">
                        <div className="font-mono text-amber-400 font-semibold text-[10px] uppercase flex items-center justify-between">
                          <span>AI Triage Analysis:</span>
                          {lead.aiConfidenceMatch && (
                            <span>Confidence Match: {lead.aiConfidenceMatch}%</span>
                          )}
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {lead.aiTriageSummary}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Status: {lead.status}</span>
                      <span>Contact: {lead.isAnonymous ? 'ANONYMOUS' : 'CONFIDENTIAL RECORD'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
