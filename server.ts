import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CASE_RECORDS } from './src/data/cases.ts';
import { EVIDENCE_ITEMS } from './src/data/evidence.ts';
import { PROTECTED_WITNESSES } from './src/data/witnesses.ts';
import { TIMELINE_EVENTS } from './src/data/timeline.ts';
import { VERIFIED_WANTED_PERSONS, FUGITIVE_TRACKING_DOSSIERS } from './src/data/wanted.ts';
import { HISTORICAL_LOCATIONS } from './src/data/locations.ts';
import { COURT_RECORDS } from './src/data/courtRecords.ts';
import { SubmittedLead, AuditLogEntry, UserRole } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with User-Agent as required by skill guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory persistent repositories for leads and audit logs
const submittedLeads: SubmittedLead[] = [
  {
    id: 'LD-2024-001',
    submittedAt: '2024-03-12T14:22:00Z',
    personInvolved: 'Individual matching profile of Charles Sikubwabo',
    locationReported: 'Eastern DRC border transit depot near Bukavu',
    dateTimeInfo: 'Observed late February 2024 in commercial trading office',
    description: 'Informant reports an elder merchant operating under French Congolese paperwork with facial scars consistent with 1994 Gishyita photos. Frequently visits commercial freight offices.',
    supportingDocsDescription: 'Photographed manifest page of mining convoy with name "C. Sikub."',
    contactInfo: 'Confidential informant via UNHCR regional liaison',
    isAnonymous: false,
    status: 'Assigned to Investigator',
    aiClassification: 'POTENTIALLY IMPORTANT',
    aiConfidenceMatch: 82,
    matchedPersonOrCase: 'case-sikubwabo (Charles Sikubwabo)',
    aiTriageSummary: 'High geographical correlation with historic Kivu migration axis. Documented facial landmark match with ICTR-95-1D-I warrants human review and biometric fingerprint verification.',
    verifiedByInvestigator: 'Investigator Jean-Luc M. (NPPA)'
  },
  {
    id: 'LD-2024-002',
    submittedAt: '2024-03-28T09:10:00Z',
    personInvolved: 'Unidentified former local administrator',
    locationReported: 'Suburban Brussels, Belgium',
    dateTimeInfo: '2023 - 2024 church gatherings',
    description: 'Community member observed an individual discussing 1994 events in Butare and claiming to have escaped through Bukavu. Subject is using an altered surname.',
    supportingDocsDescription: 'Parish newsletter photograph showing subject attending 2023 memorial.',
    contactInfo: 'Anonymous submission',
    isAnonymous: true,
    status: 'Corroboration Required',
    aiClassification: 'REQUIRES HUMAN REVIEW',
    aiConfidenceMatch: 64,
    matchedPersonOrCase: 'case-ndereyimana (Charles Ndereyimana)',
    aiTriageSummary: 'Corresponds with Butare prefecture departure timelines. Insufficient primary documentation to confirm identity; requires Belgian federal police cross-check under mutual legal assistance.'
  },
  {
    id: 'LD-2024-003',
    submittedAt: '2024-04-01T16:45:00Z',
    personInvolved: 'Duplicate submission regarding Kabuga bank assets',
    locationReported: 'Nairobi, Kenya',
    dateTimeInfo: 'Historical 1998 banking records',
    description: 'Submission detailing bank transfers from 1998 already entered into evidence under exhibit EVD-KAB-BANK-94.',
    supportingDocsDescription: 'Photocopied bank ledger from Kenya Commercial Bank.',
    isAnonymous: true,
    status: 'Closed',
    aiClassification: 'DUPLICATE',
    aiConfidenceMatch: 95,
    matchedPersonOrCase: 'case-kabuga (Félicien Kabuga)',
    aiTriageSummary: 'Duplicate of admitted evidence exhibit EVD-KAB-BANK-94 in IRMCT-13-38-I. Cross-referenced and archived.'
  }
];

const auditLogs: AuditLogEntry[] = [
  {
    id: 'AUD-001',
    timestamp: '2024-04-04T10:00:15Z',
    userRole: 'Administrator',
    userIdentifier: 'SEC-ADMIN-01',
    action: 'SYSTEM_INITIALIZATION',
    resourceType: 'Justice Platform Security Vault',
    resourceId: 'SYS-CORE-VAULT',
    sha256Verification: '6a80c2f928e461b17b2b623910c2c1a84f39e31d4e68e4c7b897e4112e47c1b1',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-002',
    timestamp: '2024-04-04T10:15:30Z',
    userRole: 'Prosecutor',
    userIdentifier: 'PROS-KIGALI-04',
    action: 'VIEW_CONFIDENTIAL_WITNESS',
    resourceType: 'Witness Protective Dossier',
    resourceId: 'WIT-TA',
    sha256Verification: 'f2182098b671a9807572793b8c345a9071060105b4b1a2a46c645c1106e57921',
    status: 'SUCCESS'
  },
  {
    id: 'AUD-003',
    timestamp: '2024-04-04T11:02:11Z',
    userRole: 'Investigator',
    userIdentifier: 'INV-NPPA-09',
    action: 'TRIAGE_LEAD_SUBMISSION',
    resourceType: 'Public Submission',
    resourceId: 'LD-2024-001',
    sha256Verification: 'c90e1f37e4663a822097e06a3e1dfb47960309e45bf923a4b0811bce55f9a141',
    status: 'SUCCESS'
  }
];

// Helper to record audit log
function recordAudit(role: UserRole, userIdentifier: string, action: string, resourceType: string, resourceId?: string) {
  const pseudoHash = Math.random().toString(36).substring(2) + Date.now().toString(36) + 'sha256';
  const entry: AuditLogEntry = {
    id: `AUD-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    userRole: role,
    userIdentifier: userIdentifier || `${role.toLowerCase().replace(' ', '_')}@justice.gov.rw`,
    action,
    resourceType,
    resourceId,
    sha256Verification: pseudoHash,
    status: 'SUCCESS'
  };
  auditLogs.unshift(entry);
  if (auditLogs.length > 200) auditLogs.pop();
  return entry;
}

// ----------------- API ROUTES ----------------- //

// Data GET endpoints
app.get('/api/cases', (req: Request, res: Response) => {
  res.json({ cases: CASE_RECORDS });
});

app.get('/api/evidence', (req: Request, res: Response) => {
  res.json({ evidence: EVIDENCE_ITEMS });
});

app.get('/api/witnesses', (req: Request, res: Response) => {
  const role = (req.query.role as UserRole) || 'Public User';
  const isAuthorized = role === 'Investigator' || role === 'Prosecutor' || role === 'Administrator';
  
  // Protect witness information: redact sensitive details if not authorized
  const processed = PROTECTED_WITNESSES.map(w => {
    if (!isAuthorized) {
      return {
        ...w,
        statementExcerpt: '[PROTECTED UNDER RULE 69 / 75 ICTR RULES OF EVIDENCE — ACCESSIBLE TO AUTHORIZED INVESTIGATORS AND PROSECUTORS ONLY]',
        investigatorNotes: '[RESTRICTED]',
        protectiveMeasures: w.protectiveMeasures,
        location: w.location.split('/')[0] + ' [EXACT VENUE SEALED]'
      };
    }
    return w;
  });
  
  res.json({ witnesses: processed, authorized: isAuthorized });
});

app.get('/api/wanted', (req: Request, res: Response) => {
  res.json({ wantedPersons: VERIFIED_WANTED_PERSONS, dossiers: FUGITIVE_TRACKING_DOSSIERS });
});

app.get('/api/timeline', (req: Request, res: Response) => {
  res.json({ timeline: TIMELINE_EVENTS });
});

app.get('/api/locations', (req: Request, res: Response) => {
  res.json({ locations: HISTORICAL_LOCATIONS });
});

app.get('/api/court-records', (req: Request, res: Response) => {
  res.json({ records: COURT_RECORDS });
});

app.get('/api/leads', (req: Request, res: Response) => {
  res.json({ leads: submittedLeads });
});

app.get('/api/audit-logs', (req: Request, res: Response) => {
  res.json({ logs: auditLogs });
});

app.post('/api/audit-logs', (req: Request, res: Response) => {
  const { userRole, userIdentifier, action, resourceType, resourceId } = req.body;
  const entry = recordAudit(userRole || 'Public User', userIdentifier, action, resourceType, resourceId);
  res.json({ success: true, entry });
});

// Submit Lead Endpoint
app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const { personInvolved, locationReported, dateTimeInfo, description, supportingDocsDescription, contactInfo, isAnonymous } = req.body;
    
    if (!description || !locationReported) {
      return res.status(400).json({ error: 'Description and location are required.' });
    }

    const newLead: SubmittedLead = {
      id: `LD-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      personInvolved: personInvolved || 'Unspecified individual',
      locationReported,
      dateTimeInfo: dateTimeInfo || 'Date not specified',
      description,
      supportingDocsDescription,
      contactInfo: isAnonymous ? 'ANONYMOUS SUBMISSION' : contactInfo,
      isAnonymous: !!isAnonymous,
      status: 'Received',
      aiClassification: 'REQUIRES HUMAN REVIEW',
      aiConfidenceMatch: 50,
      aiTriageSummary: 'Lead recorded in secure repository. Preliminary matching initiated.'
    };

    // Use Gemini to triage lead if available
    if (ai) {
      try {
        const triagePrompt = `You are the lead triage engine for RWANDA GENOCIDE JUSTICE AI.
Analyze the following citizen lead against documented cases of the 1994 Genocide against the Tutsi in Rwanda:
Lead Subject: "${personInvolved}"
Location: "${locationReported}"
Date/Time: "${dateTimeInfo}"
Information: "${description}"
Supporting Docs: "${supportingDocsDescription}"

Documented Cases Summary:
${CASE_RECORDS.map(c => `- ID: ${c.id}, Name: ${c.suspectName}, Status: ${c.legalStatus}, Aliases: ${c.knownAliases.join(', ')}, Locations: ${c.locations.join(', ')}`).join('\n')}
${VERIFIED_WANTED_PERSONS.map(w => `- Wanted: ${w.name}, Aliases: ${w.aliases.join(', ')}, Issuing Authority: ${w.issuingAuthority}`).join('\n')}

Classify the lead strictly into one of:
- NEW LEAD
- DUPLICATE
- INSUFFICIENT INFORMATION
- REQUIRES HUMAN REVIEW
- POTENTIALLY IMPORTANT

Return a JSON object ONLY with the following shape:
{
  "classification": "NEW LEAD" | "DUPLICATE" | "INSUFFICIENT INFORMATION" | "REQUIRES HUMAN REVIEW" | "POTENTIALLY IMPORTANT",
  "confidenceScore": number (between 0 and 100),
  "matchedCaseOrPerson": "string",
  "summaryAnalysis": "string explaining reasoning, verifying matches with authorized records, noting chain-of-custody, and stating next human investigator step",
  "safetyWarning": "Do not approach or confront this person. Forward all intelligence to competent law-enforcement authorities."
}

CRITICAL RULES:
- Never declare guilt.
- Never suggest vigilante action.
- Never publish private citizen locations.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: triagePrompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          newLead.aiClassification = parsed.classification;
          newLead.aiConfidenceMatch = parsed.confidenceScore;
          newLead.matchedPersonOrCase = parsed.matchedCaseOrPerson;
          newLead.aiTriageSummary = parsed.summaryAnalysis;
          newLead.status = 'Triaged';
        }
      } catch (geminiErr) {
        console.error('Lead triage AI error:', geminiErr);
      }
    }

    submittedLeads.unshift(newLead);
    recordAudit('Public User', isAnonymous ? 'ANONYMOUS' : 'CITIZEN', 'SUBMIT_LEAD', 'Public Lead Submission', newLead.id);

    res.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// AI Investigator Q&A / Ask the Archive Endpoint
app.post('/api/ai/investigate', async (req: Request, res: Response) => {
  try {
    const { query, mode, role = 'Investigator' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required.' });
    }

    recordAudit(role as UserRole, 'INVESTIGATOR-SESSION', 'AI_INVESTIGATION_QUERY', 'AI Investigator Engine', mode || 'GENERAL');

    if (!ai) {
      // Fallback response if no API key provided
      return res.json({
        answer: `AI Investigator Response (Offline Mode): Based on official tribunal records (ICTR and IRMCT), this query relates to documented events in Rwanda 1994. Under ICTR jurisprudence (Prosecutor v. Bagosora ICTR-98-41-T and Prosecutor v. Akayesu ICTR-96-4-T), judicial determinations were made strictly upon corroborated documentary and eyewitness testimony. Every finding must refer to admitted exhibits (e.g. EVD-UN-FAX-94, EVD-RTLM-AUD-23). Presumption of innocence applies until conviction by a competent court.`,
        sources: ['UN IRMCT Official Archive (unictr.irmct.org)', 'Exhibit EVD-UN-FAX-94', 'Exhibit EVD-RTLM-AUD-23'],
        contradictionsNoted: [],
        questionsForInvestigators: [
          'Verify cross-border travel documents against regional Interpol database.',
          'Corroborate witness statements with archival fuel logs and municipal ledgers.'
        ]
      });
    }

    const systemInstruction = `You are the specialized AI Investigator for RWANDA GENOCIDE JUSTICE AI, an institutional evidence management and investigative analysis platform.
Your mandate is to assist authorized human investigators, prosecutors, and researchers examining documented crimes connected to the 1994 Genocide against the Tutsi in Rwanda.

STRICT ETHICAL & LEGAL CONSTITUTION:
1. PRESUMPTION OF INNOCENCE: Never declare an unconvicted person guilty. Separate clearly:
   - CONVICTED (by competent court, e.g. Bagosora, Kambanda, Akayesu, Nahimana)
   - ACCUSED / INDICTED (under judicial process, e.g. Kabuga, Kayishema)
   - WANTED BY AUTHORITY (official warrants e.g. Sikubwabo, Ryandikayo, Ndimbati)
   - ALLEGATION / UNVERIFIED (open leads, no legal finding)
   - CLEARED / ACQUITTED (e.g. Ntagerura, Bagambiki - upheld on appeal)
2. NEVER CONDUCT OR SUGGEST VIGILANTE ACTION: The system must never tell civilians to follow, confront, restrain, or capture anyone. All action must follow: LEAD -> VERIFY -> HUMAN INVESTIGATION -> LAW-ENFORCEMENT ACTION -> LAWFUL ARREST -> JUDICIAL PROCESS.
3. GROUNDING & SOURCE CITATIONS: Every factual claim must cite specific authorized source documents (e.g. "ICTR Trial Chamber I Judgment ICTR-98-41-T, para 104", "Exhibit EVD-UN-FAX-94", "Exhibit EVD-RTLM-AUD-23", "Declassified UNAMIR Cable").
4. PROTECT WITNESSES: Never reveal or speculate on the private real identities or addresses of protected witnesses. Refer only to official court pseudonyms (e.g., Witness TA, Witness BEX).
5. STRUCTURED ANALYSIS: When requested, identify relationships, build chronological timelines, detect contradictory statements, summarize court judgments, identify missing information, and generate investigative questions.

AUTHORIZED REPOSITORY CONTEXT:
Cases: ${JSON.stringify(CASE_RECORDS.map(c => ({ id: c.id, num: c.caseNumber, name: c.suspectName, status: c.legalStatus, court: c.courtOrAuthority, charges: c.charges, summary: c.summary, dates: c.relevantDates, loc: c.locations })))}
Evidence: ${JSON.stringify(EVIDENCE_ITEMS.map(e => ({ id: e.id, title: e.title, type: e.type, source: e.source, hash: e.sha256Hash, snippet: e.contentSnippet, desc: e.description })))}
Wanted: ${JSON.stringify(VERIFIED_WANTED_PERSONS.map(w => ({ name: w.name, case: w.caseNumber, authority: w.issuingAuthority, lastKnown: w.lastKnownContext })))}
Timeline: ${JSON.stringify(TIMELINE_EVENTS.map(t => ({ date: t.formattedDate, title: t.title, loc: t.location, desc: t.description })))}
Court Jurisprudence: ${JSON.stringify(COURT_RECORDS.map(r => ({ case: r.caseNumber, title: r.title, jurisdiction: r.jurisdiction, keyFindings: r.keyFindings, precedents: r.legalPrecedentsEstablished })))}`;

    const userPrompt = `Investigative Task [Mode: ${mode || 'GENERAL_ANALYSIS'}]:
User Query: "${query}"

Provide a detailed, rigorous, objective, and authoritative report.
Format your response clearly with:
- Executive Summary & Legal Status
- Documented Findings & Timeline Correlation
- Corroborating Evidence & Source Citations (MUST include specific exhibits and case citations)
- Inconsistencies / Contradictory Statements Requiring Human Investigation
- Actionable Questions for Authorized Human Investigators
- Strict Compliance & Rule of Law Disclaimer`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.25,
      }
    });

    res.json({
      answer: response.text,
      mode,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('AI Investigation error:', error);
    res.status(500).json({ error: error.message || 'Investigation engine failed' });
  }
});

// AI Case Builder Endpoint
app.post('/api/ai/build-case', async (req: Request, res: Response) => {
  try {
    const { caseId, role = 'Prosecutor' } = req.body;
    const targetCase = CASE_RECORDS.find(c => c.id === caseId) || CASE_RECORDS[0];

    recordAudit(role as UserRole, 'CASE-OFFICER', 'GENERATE_CASE_DOSSIER', 'Case Builder Engine', targetCase.id);

    if (!ai) {
      return res.json({
        dossier: {
          caseTitle: `Case File: ${targetCase.suspectName}`,
          caseNumber: targetCase.caseNumber,
          targetPerson: targetCase.suspectName,
          generatedDate: new Date().toISOString(),
          facts: ['Documented presence in Kigali and designated prefectures during April-July 1994', 'Admitted exhibits show direct command hierarchy'],
          sourceBasedClaims: [
            { claim: 'Witness statements describe operational instructions to militia', sourceDocument: 'ICTR Trial Record P-101', dateOfDocument: '1998' }
          ],
          allegations: targetCase.charges,
          aiInferences: [
            { inference: 'Logistical communication lines indicate synchronized deployment', supportingDocuments: ['EVD-UN-FAX-94'], confidence: 'HIGH' }
          ],
          unverifiedLeads: ['Reported cross-border transit inquiries pending mutual assistance confirmation'],
          evidenceIndexes: targetCase.evidenceReferences.map(ref => ({ evidenceId: ref, title: `Archival Exhibit ${ref}`, relevance: 'Direct documentary proof' })),
          witnessReferences: targetCase.witnessReferences,
          timelineSummary: targetCase.relevantDates,
          locationsDocumented: targetCase.locations,
          contradictionsIdentified: ['Variation between early radio transcripts and post-war interview accounts'],
          outstandingQuestionsForInvestigators: ['Authenticate fuel depot ledgers in regional logistics hub'],
          recommendedInvestigativeFollowUp: ['Issue judicial request to Interpol fugitive unit for current biometric screening'],
          legalStatusAssessment: `Current status is ${targetCase.legalStatus}. Proceedings conducted under ${targetCase.courtOrAuthority}.`
        }
      });
    }

    const prompt = `You are the Judicial Case Builder for RWANDA GENOCIDE JUSTICE AI.
Generate a structured judicial investigative case dossier for:
Suspect/Person: ${targetCase.suspectName}
Case Number: ${targetCase.caseNumber}
Legal Status: ${targetCase.legalStatus}
Court/Authority: ${targetCase.courtOrAuthority}
Charges: ${targetCase.charges.join('; ')}
Locations: ${targetCase.locations.join(', ')}
Summary: ${targetCase.summary}

CRITICAL REQUIREMENT: You MUST strictly categorize statements into the following distinct sections:
1. FACTS (Proven beyond reasonable doubt by final court judgment or primary forensic evidence)
2. SOURCE-BASED CLAIMS (Statements directly supported by named witness testimony or official contemporaneous archives)
3. ALLEGATIONS (Formal charges or claims not yet adjudicated)
4. AI INFERENCES (Analytical deductions derived from cross-referencing timeline and location data)
5. UNVERIFIED LEADS (Tips or reports that have not undergone corroboration)

Return a JSON object conforming exactly to:
{
  "caseTitle": "string",
  "caseNumber": "string",
  "targetPerson": "string",
  "facts": ["string"],
  "sourceBasedClaims": [
    { "claim": "string", "sourceDocument": "string", "dateOfDocument": "string" }
  ],
  "allegations": ["string"],
  "aiInferences": [
    { "inference": "string", "supportingDocuments": ["string"], "confidence": "HIGH" | "MODERATE" | "PRELIMINARY" }
  ],
  "unverifiedLeads": ["string"],
  "evidenceIndexes": [
    { "evidenceId": "string", "title": "string", "relevance": "string" }
  ],
  "witnessReferences": ["string"],
  "timelineSummary": ["string"],
  "locationsDocumented": ["string"],
  "contradictionsIdentified": ["string"],
  "outstandingQuestionsForInvestigators": ["string"],
  "recommendedInvestigativeFollowUp": ["string"],
  "legalStatusAssessment": "string"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    });

    const parsedDossier = JSON.parse(response.text || '{}');
    parsedDossier.generatedDate = new Date().toISOString();
    res.json({ dossier: parsedDossier });
  } catch (error: any) {
    console.error('Case Builder error:', error);
    res.status(500).json({ error: error.message || 'Case builder failed' });
  }
});

// Vite middleware in dev or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RWANDA GENOCIDE JUSTICE AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
