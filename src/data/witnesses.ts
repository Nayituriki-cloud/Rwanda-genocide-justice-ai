import { WitnessRecord } from '../types';

export const PROTECTED_WITNESSES: WitnessRecord[] = [
  {
    id: 'WIT-TA',
    pseudonym: 'Witness TA',
    dateOfStatement: '14 May 1999',
    location: 'Butare Prefecture / In-Camera Deposition Arusha',
    statementExcerpt: 'I was present outside the prefecture office when the Minister arrived in a convoy. She gathered the Interahamwe leaders and told them: "Work must begin here in Butare. The women must not be spared. They must be eliminated." She provided fuel canisters to the militia drivers.',
    evidenceReferences: ['EVD-BUT-PREF-94', 'EVD-VEH-LOG-BUT'],
    reliabilityAssessment: 'High - Corroborated by Forensic & Documentary Evidence',
    investigatorNotes: 'Deposition tested through extensive cross-examination in the Butare Group trial (ICTR-98-42-T). Credibility affirmed by Trial Chamber II and upheld on appeal.',
    isRedactedForPublic: true,
    protectiveMeasures: [
      'Voice distortion in public hearing broadcasts',
      'Shielded witness box with opaque screen',
      'Pseudonym assigned under Rule 75 of ICTR Rules of Procedure and Evidence',
      'Confidential sealed address and safe third-country relocation'
    ],
    relatedCaseNumbers: ['ICTR-98-42-T (Pauline Nyiramasuhuko)']
  },
  {
    id: 'WIT-BEX',
    pseudonym: 'Witness BEX',
    dateOfStatement: '22 October 2001',
    location: 'Kivumu Commune / In-Camera Hearing',
    statementExcerpt: 'We were packed inside Nyange Church for days without water. On 16 April in the morning, the communal police inspector arrived with the priest. They held a discussion outside. Then the Caterpillar bulldozer started roaring. The driver hit the left wall first, and then the bell tower collapsed onto everyone inside.',
    evidenceReferences: ['EVD-NYA-BULL-01', 'EVD-NYA-PHOTO-94'],
    reliabilityAssessment: 'High - Multiple Independent Survivor Accounts',
    investigatorNotes: 'Corroborated by independent statements of three surviving altar servers and the physical mechanical impact forensic survey EVD-NYA-BULL-01.',
    isRedactedForPublic: true,
    protectiveMeasures: [
      'Identity fully redacted in public court registers',
      'No physical photographic recordings permitted',
      'Protection extended under IRMCT Witness Support and Protection Unit (WPU)'
    ],
    relatedCaseNumbers: ['IRMCT-01-67-I (Fulgence Kayishema)', 'ICTR-01-66-I (Athanase Seromba)']
  },
  {
    id: 'WIT-KJ',
    pseudonym: 'Witness KJ',
    dateOfStatement: '18 September 1997',
    location: 'Kigali / Confidential Location',
    statementExcerpt: 'On the morning of 7 April at Camp Kigali, after the soldiers surrounded the Belgian peacekeepers, we saw Colonel Bagosora arriving in an open-top military jeep. He held a quick exchange with the camp commandant before departing towards the Ministry. Shortly thereafter, automatic gunfire broke out against the peacekeepers.',
    evidenceReferences: ['EVD-BEL-AUTOPSY-94', 'EVD-FAR-RAD-09'],
    reliabilityAssessment: 'High - Corroborated by Forensic & Documentary Evidence',
    investigatorNotes: 'Corroborated by UNAMIR radio transmission logs and Belgian military commission findings. Formed core pillar of Trial Chamber I Military I verdict.',
    isRedactedForPublic: true,
    protectiveMeasures: [
      'Closed session testimony (Rule 79)',
      'Pseudonymization across all trial transcripts',
      'Strict witness relocation protocol'
    ],
    relatedCaseNumbers: ['ICTR-98-41-T (Théoneste Bagosora)']
  },
  {
    id: 'WIT-S14',
    pseudonym: 'Protected Survivor S-14',
    dateOfStatement: '08 August 2003',
    location: 'Bisesero Hills / Karongi Field Recording',
    statementExcerpt: 'In Bisesero, we gathered on Mount Muyira with rocks and spears. Aminadabu Birara organized our defense so we could push back the first militia assaults. But then Sikubwabo and Ndimbati arrived with trucks of gendarmes with machine guns and grenades. They attacked continuously for three days until nearly everyone was dead.',
    evidenceReferences: ['EVD-BIS-MAP-94', 'EVD-MUG-CENSUS-94', 'EVD-RED-NOTICE-SIK'],
    reliabilityAssessment: 'High - Multiple Independent Survivor Accounts',
    investigatorNotes: 'Detailed account of the historic Bisesero resistance. Statement has been authenticated and entered into international fugitive dossiers for Sikubwabo and Ryandikayo.',
    isRedactedForPublic: true,
    protectiveMeasures: [
      'Protection under Rwandan National Witness Protection Scheme & IRMCT',
      'Biometric and residential secrecy',
      'Identity restricted to certified prosecutor credentials only'
    ],
    relatedCaseNumbers: ['ICTR-95-1D-I (Charles Sikubwabo)', 'ICTR-95-1E-R90 (Ryandikayo)']
  },
  {
    id: 'WIT-GO',
    pseudonym: 'Witness GO',
    dateOfStatement: '11 February 2002',
    location: 'Kigali / Arusha Registry',
    statementExcerpt: 'I worked in the transmission room. The radio announcers were provided with typed lists of people to broadcast. Hassan Ngeze and Ferdinand Nahimana came to the studio frequently to review the broadcast queue. When a name was broadcast, militia men at the barriers knew they had green light to execute.',
    evidenceReferences: ['EVD-RTLM-AUD-23', 'EVD-KANG-26', 'EVD-RTLM-SHARE-REG'],
    reliabilityAssessment: 'High - Corroborated by Forensic & Documentary Evidence',
    investigatorNotes: 'Critical insider witness inside RTLM. Testified in Media Trial under Rule 75 protective order. Testimony validated against broadcast logs.',
    isRedactedForPublic: true,
    protectiveMeasures: [
      'Voice alteration',
      'Facial distortion filter',
      'Sealed personal identifiers under judicial lock'
    ],
    relatedCaseNumbers: ['ICTR-99-52-T (Media Trial)']
  }
];
