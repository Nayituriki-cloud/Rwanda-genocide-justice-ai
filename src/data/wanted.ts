import { WantedPerson, FugitiveTrackDossier } from '../types';

export const VERIFIED_WANTED_PERSONS: WantedPerson[] = [
  {
    id: 'WNT-SIKUBWABO',
    name: 'Charles Sikubwabo',
    aliases: ['Sikubwabo Bourgmestre', 'Charles Gishyita'],
    officialNoticeDate: 'November 1995 (Reconfirmed IRMCT 2023)',
    issuingAuthority: 'United Nations International Residual Mechanism for Criminal Tribunals (IRMCT) & NPPA Rwanda',
    caseNumber: 'ICTR-95-1D-I',
    legalStatus: 'WANTED BY AUTHORITY',
    charges: [
      'Genocide',
      'Complicity in Genocide',
      'Crimes Against Humanity (Extermination, Murder, Rape, Other Inhumane Acts)',
      'Violations of Common Article 3 of the Geneva Conventions'
    ],
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    officialSourceUrl: 'https://www.irmct.org/en/cases/mict-12-16',
    sourceCitation: 'UN IRMCT Official Fugitive Register / Interpol Red Notice Control Ref A-182/4-2002',
    lastKnownContext: 'Commanded militia and communal police during attacks on Mugonero Hospital (16 April 1994) and coordinated hunts across Bisesero mountains. Previous intelligence leads placed him across Central and Southern Africa under forged documentation.',
    internationalCooperationStatus: 'Active Interpol Red Notice; UN Rewards for Justice eligible up to $5M USD for information leading to arrest; bilateral Mutual Legal Assistance (MLA) active with Great Lakes regional states.',
    mandatoryWarning: 'Do not approach or confront this person. Provide information to the appropriate law-enforcement authority or the IRMCT Office of the Prosecutor.'
  },
  {
    id: 'WNT-RYANDIKAYO',
    name: 'Ryandikayo',
    aliases: ['Ryandikayo Merchant of Gishyita'],
    officialNoticeDate: '1995 (Amended 2002, Tracked Active 2024)',
    issuingAuthority: 'UN IRMCT & National Public Prosecution Authority (NPPA Rwanda)',
    caseNumber: 'ICTR-95-1E-R90',
    legalStatus: 'ACTIVE RED NOTICE',
    charges: [
      'Genocide',
      'Direct and Public Incitement to Commit Genocide',
      'Crimes Against Humanity (Murder, Extermination, Rape)'
    ],
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    officialSourceUrl: 'https://www.irmct.org/en/cases/mict-12-17',
    sourceCitation: 'UN IRMCT Warrant of Arrest / Republic of Rwanda International Red Notice',
    lastKnownContext: 'Prominent businessman in Gishyita who allegedly supplied transportation, weapons, and led militia attacks against thousands of civilians sheltering in Mubuga Catholic Church and Bisesero.',
    internationalCooperationStatus: 'Intelligence analysis underway by IRMCT OTP Fugitive Tracking Team to verify conflicting cross-border reports.',
    mandatoryWarning: 'Do not approach or confront this person. Provide information to the appropriate law-enforcement authority or the IRMCT Office of the Prosecutor.'
  },
  {
    id: 'WNT-NDIMBATI',
    name: 'Aloys Ndimbati',
    aliases: ['Bourgmestre of Gisovu'],
    officialNoticeDate: 'November 1995',
    issuingAuthority: 'UN IRMCT / NPPA Rwanda',
    caseNumber: 'ICTR-95-1F-I',
    legalStatus: 'WANTED BY AUTHORITY',
    charges: [
      'Genocide',
      'Complicity in Genocide',
      'Crimes Against Humanity (Extermination)'
    ],
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    officialSourceUrl: 'https://www.irmct.org/en/cases/mict-12-18',
    sourceCitation: 'UN IRMCT Fugitive File / Interpol Red Notice #A-184/4-2002',
    lastKnownContext: 'Accused of orchestrating the extermination of Tutsis in Gisovu commune and directing municipal fuel trucks and militia reinforcements into Bisesero hills. Active warrant maintained while forensic confirmation of death claims is independently investigated.',
    internationalCooperationStatus: 'Active international arrest warrant transferred to Rwandan judiciary under Rule 11bis.',
    mandatoryWarning: 'Do not approach or confront this person. Provide information to the appropriate law-enforcement authority or the IRMCT Office of the Prosecutor.'
  },
  {
    id: 'WNT-NDEREYIMANA',
    name: 'Charles Ndereyimana',
    aliases: ['Ndereyimana Butare'],
    officialNoticeDate: '2008 (Updated NPPA 2023)',
    issuingAuthority: 'National Public Prosecution Authority of Rwanda (NPPA)',
    caseNumber: 'NPPA-RW-1994-082',
    legalStatus: 'ACTIVE RED NOTICE',
    charges: [
      'Genocide',
      'Conspiracy to Commit Genocide',
      'Crimes Against Humanity (Extermination, Persecution)'
    ],
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    officialSourceUrl: 'https://www.nppa.gov.rw/genocide-fugitives-unit',
    sourceCitation: 'NPPA Rwanda Fugitive Tracking Unit (FTU) Bulletin No. 42 / Interpol Red Notice',
    lastKnownContext: 'Former communal official in Butare prefecture who supervised roadblock executions and rounded up intellectual Tutsi youth near the university campus.',
    internationalCooperationStatus: 'Extradition treaty requests submitted by Rwanda to three host countries under bilateral judicial cooperation protocols.',
    mandatoryWarning: 'Do not approach or confront this person. Provide information to the appropriate law-enforcement authority or the IRMCT Office of the Prosecutor.'
  }
];

export const FUGITIVE_TRACKING_DOSSIERS: FugitiveTrackDossier[] = [
  {
    fugitiveId: 'WNT-SIKUBWABO',
    name: 'Charles Sikubwabo',
    caseStatus: 'Active International Warrant - Priority 1',
    officialWantedNotice: 'UN IRMCT Warrant / Interpol Red Notice A-182/4-2002',
    previousConfirmedLocations: ['Gishyita (Rwanda 1994)', 'Goma (DRC 1994-1996)', 'Brazzaville / Bangui transit corridor'],
    investigativeLeadsCount: 14,
    internationalCooperationRequests: [
      {
        targetCountry: 'Democratic Republic of the Congo',
        requestType: 'Mutual Legal Assistance (MLA)',
        dateFiled: '2021-04-10',
        status: 'Active Bilateral Exchange'
      },
      {
        targetCountry: 'Republic of South Africa',
        requestType: 'Interpol Red Notice Diffusion',
        dateFiled: '2023-06-15',
        status: 'Under Execution'
      }
    ],
    responsibleAgency: 'UN IRMCT Office of the Prosecutor (Fugitive Tracking Team) & NPPA Genocide Tracking Unit',
    lastVerifiedInformation: 'Intelligence synthesis confirmed historic use of alias documents in mining areas. DNA cross-checks conducted on reported remains returned negative in 2022.',
    investigationStatus: 'Active tracking. Human investigators coordinating with regional security agencies.'
  },
  {
    fugitiveId: 'WNT-RYANDIKAYO',
    name: 'Ryandikayo',
    caseStatus: 'Active International Notice - Priority 2',
    officialWantedNotice: 'UN IRMCT MICT-12-17',
    previousConfirmedLocations: ['Kibuye (1994)', 'Bukavu (1995)'],
    investigativeLeadsCount: 8,
    internationalCooperationRequests: [
      {
        targetCountry: 'Interpol General Secretariat (Lyon)',
        requestType: 'Interpol Red Notice Diffusion',
        dateFiled: '2022-09-01',
        status: 'Under Execution'
      }
    ],
    responsibleAgency: 'NPPA Rwanda / IRMCT OTP',
    lastVerifiedInformation: 'Cross-border identity matching ongoing following lead submission #LD-2024-03.',
    investigationStatus: 'Documentary analysis and survivor witness corroboration.'
  }
];
