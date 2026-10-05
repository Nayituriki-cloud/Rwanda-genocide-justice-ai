export type LegalStatus = 
  | 'CONVICTED'
  | 'ACCUSED / INDICTED'
  | 'WANTED BY AUTHORITY'
  | 'ALLEGATION / UNVERIFIED'
  | 'CLEARED / ACQUITTED';

export type UserRole = 
  | 'Public User'
  | 'Verified Researcher'
  | 'Investigator'
  | 'Prosecutor'
  | 'Administrator';

export type LeadClassification =
  | 'NEW LEAD'
  | 'DUPLICATE'
  | 'INSUFFICIENT INFORMATION'
  | 'REQUIRES HUMAN REVIEW'
  | 'POTENTIALLY IMPORTANT';

export interface CaseRecord {
  id: string;
  caseNumber: string;
  suspectName: string;
  knownAliases: string[];
  legalStatus: LegalStatus;
  charges: string[];
  courtOrAuthority: string;
  country: string;
  photoUrl: string;
  relevantDates: string[];
  locations: string[];
  organizationsInvolved: string[];
  witnessReferences: string[];
  evidenceReferences: string[];
  courtDecisions: {
    chamber: string;
    date: string;
    decision: string;
    sentence?: string;
  }[];
  currentCaseStatus: string;
  summary: string;
  lastUpdated: string;
  verifiedSource: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'Document' | 'Photograph' | 'Audio Recording' | 'Witness Statement' | 'Court Record' | 'Map' | 'Historical Archive' | 'Forensic Report';
  source: string;
  dateObtained: string;
  chainOfCustody: {
    date: string;
    custodian: string;
    action: string;
    verifiedBy: string;
  }[];
  authenticityStatus: 'Verified Authentic' | 'Certified Official Copy' | 'Forensic Review Complete' | 'Primary Historical Archive';
  sha256Hash: string;
  relatedCaseId?: string;
  relatedCases: string[];
  relatedPeople: string[];
  relatedLocations: string[];
  description: string;
  investigatorNotes: string;
  contentSnippet?: string;
  classificationLevel: 'Public Educational' | 'Unclassified Court Exhibit' | 'Restricted Judicial' | 'Confidential Investigation';
}

export interface WitnessRecord {
  id: string; // e.g. "Witness-TA"
  pseudonym: string;
  dateOfStatement: string;
  location: string;
  statementExcerpt: string;
  evidenceReferences: string[];
  reliabilityAssessment: 'High - Corroborated by Forensic & Documentary Evidence' | 'High - Multiple Independent Survivor Accounts' | 'Moderate - Partially Corroborated' | 'Pending Corroboration';
  investigatorNotes: string;
  isRedactedForPublic: boolean;
  protectiveMeasures: string[];
  relatedCaseNumbers: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  formattedDate: string;
  location: string;
  prefecture: string;
  coordinates: [number, number]; // [lat, lng]
  title: string;
  description: string;
  peopleInvolved: string[];
  evidenceIds: string[];
  courtRecordIds: string[];
  category: 'Prelude & Warning' | 'Assassination & Outbreak' | 'Massacre & Resistance' | 'Propaganda & Incitement' | 'Liberation & Cessation' | 'International Justice & ICTR' | 'Gacaca & Reconciliation' | 'Fugitive Tracking';
}

export interface WantedPerson {
  id: string;
  name: string;
  aliases: string[];
  officialNoticeDate: string;
  issuingAuthority: string;
  caseNumber: string;
  legalStatus: 'WANTED BY AUTHORITY' | 'ACTIVE RED NOTICE';
  charges: string[];
  photoUrl: string;
  officialSourceUrl: string;
  sourceCitation: string;
  lastKnownContext: string;
  internationalCooperationStatus: string;
  mandatoryWarning: string;
}

export interface SubmittedLead {
  id: string;
  submittedAt: string;
  personInvolved: string;
  locationReported: string;
  dateTimeInfo: string;
  description: string;
  supportingDocsDescription?: string;
  contactInfo?: string;
  isAnonymous: boolean;
  status: 'Received' | 'Triaged' | 'Assigned to Investigator' | 'Corroboration Required' | 'Closed';
  aiClassification?: LeadClassification;
  aiConfidenceMatch?: number; // e.g. 84%
  matchedPersonOrCase?: string;
  aiTriageSummary?: string;
  verifiedByInvestigator?: string;
}

export interface FugitiveTrackDossier {
  fugitiveId: string;
  name: string;
  caseStatus: string;
  officialWantedNotice: string;
  previousConfirmedLocations: string[];
  investigativeLeadsCount: number;
  internationalCooperationRequests: {
    targetCountry: string;
    requestType: 'Mutual Legal Assistance (MLA)' | 'Interpol Red Notice Diffusion' | 'Extradition Request';
    dateFiled: string;
    status: 'Pending Judicial Review' | 'Active Bilateral Exchange' | 'Under Execution';
  }[];
  responsibleAgency: string;
  lastVerifiedInformation: string;
  investigationStatus: string;
}

export interface CourtRecord {
  id: string;
  caseNumber: string;
  title: string;
  jurisdiction: 'ICTR' | 'IRMCT' | 'National Public Prosecution Authority (NPPA Rwanda)' | 'Gacaca Jurisdictions' | 'Universal Jurisdiction (France / Belgium / Canada)';
  documentType: 'Indictment' | 'Trial Judgment' | 'Appeals Judgment' | 'Sentence' | 'Extradition Decision' | 'Rule 11bis Transfer';
  dateIssued: string;
  presidingJudges?: string[];
  keyFindings: string[];
  legalPrecedentsEstablished: string[];
  archiveUrl?: string;
}

export interface HistoricalLocation {
  id: string;
  name: string;
  prefecture: string;
  coordinates: [number, number];
  type: 'Massacre Site & Memorial' | 'Judicial Headquarters' | 'Key Infrastructure & Transmission' | 'Resistance Site' | 'Commune Office';
  historicalSignificance: string;
  documentedIncidentsCount: number;
  memorialInfo?: string;
  relatedCaseIds: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: UserRole;
  userIdentifier: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  sha256Verification: string;
  status: 'SUCCESS' | 'RESTRICTED' | 'FLAGGED';
}

export interface CaseBuilderOutput {
  caseTitle: string;
  caseNumber: string;
  targetPerson: string;
  generatedDate: string;
  facts: string[];
  sourceBasedClaims: {
    claim: string;
    sourceDocument: string;
    dateOfDocument: string;
  }[];
  allegations: string[];
  aiInferences: {
    inference: string;
    supportingDocuments: string[];
    confidence: 'HIGH' | 'MODERATE' | 'PRELIMINARY';
  }[];
  unverifiedLeads: string[];
  evidenceIndexes: {
    evidenceId: string;
    title: string;
    relevance: string;
  }[];
  witnessReferences: string[];
  timelineSummary: string[];
  locationsDocumented: string[];
  contradictionsIdentified: string[];
  outstandingQuestionsForInvestigators: string[];
  recommendedInvestigativeFollowUp: string[];
  legalStatusAssessment: string;
}
