import { EvidenceItem } from '../types';

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'EVD-UN-FAX-94',
    title: 'UNAMIR Urgent Cable: Dallaire "Genocide Fax"',
    type: 'Document',
    source: 'United Nations Department of Peacekeeping Operations (DPKO) Declassified Archives',
    dateObtained: '11 January 1994',
    chainOfCustody: [
      {
        date: '1994-01-11T03:00:00Z',
        custodian: 'Gen. Roméo Dallaire (Force Commander, UNAMIR Kigali)',
        action: 'Drafted and transmitted encrypted cable to UN HQ New York',
        verifiedBy: 'UNAMIR Communications Officer'
      },
      {
        date: '1995-10-14T10:00:00Z',
        custodian: 'UN Office of Legal Affairs',
        action: 'Declassified and provided under official request to ICTR Office of the Prosecutor',
        verifiedBy: 'UN Legal Counsel'
      },
      {
        date: '1998-02-12T14:30:00Z',
        custodian: 'ICTR Registry Arusha',
        action: 'Admitted into evidence as Prosecution Exhibit P-101 in Prosecutor v. Bagosora',
        verifiedBy: 'Court Registrar'
      }
    ],
    authenticityStatus: 'Verified Authentic',
    sha256Hash: 'a718f45c92881a93b4a2e7c3e590fa188cb20d41864e43e26cf8ad8a91437b01',
    relatedCaseId: 'case-bagosora',
    relatedCases: ['ICTR-98-41-T (Military I)', 'ICTR-97-23-DP'],
    relatedPeople: ['Gen. Roméo Dallaire', 'Major-General Maurice Baril', 'Jean-Pierre (Informant)', 'Théoneste Bagosora'],
    relatedLocations: ['Kigali', 'Camp Kigali', 'UNAMIR HQ (Hotel des Mille Collines / Amahoro)'],
    description: 'Urgent cable warning that an informant (Jean-Pierre) had been trained by Interahamwe militia, detailing plans to register all Tutsis in Kigali, stage massacres capable of killing 1,000 victims in 20 minutes, and provoke the withdrawal of Belgian peacekeepers.',
    investigatorNotes: 'Critical evidentiary link establishing early awareness of coordinated weapon caches and systematic planning among high-ranking FAR officers and militia leadership.',
    contentSnippet: 'SUBJECT: REQUEST FOR PROTECTION FOR INFORMANT... Informant claims Interahamwe has trained 1,700 men in RGF military camps... has been ordered to register all Tutsi in Kigali. He suspects it is for their extermination.',
    classificationLevel: 'Unclassified Court Exhibit'
  },
  {
    id: 'EVD-RTLM-AUD-23',
    title: 'RTLM Broadcast Audio Reel & Certified Transcript #23',
    type: 'Audio Recording',
    source: 'National Institute of Audiovisual Heritage (INA) / ICTR Evidence Archive',
    dateObtained: '12 April 1994',
    chainOfCustody: [
      {
        date: '1994-04-12T08:15:00Z',
        custodian: 'Monitored and recorded by International Red Cross & Diplomatic Listening Post in Kigali',
        action: 'Magnetic tape recording recorded off-air',
        verifiedBy: 'Monitoring Engineer'
      },
      {
        date: '1996-05-20T11:00:00Z',
        custodian: 'ICTR Language Services & Audio Forensics',
        action: 'Acoustic verification and certified sworn translation from Kinyarwanda to French/English',
        verifiedBy: 'Sworn Tribunal Translator #04'
      }
    ],
    authenticityStatus: 'Verified Authentic',
    sha256Hash: 'd9b231c5e62f0108ec9f2ba9045b41fa70f2951167a3a93e3d2319efb38e07cb',
    relatedCaseId: 'case-nahimana',
    relatedCases: ['ICTR-99-52-T (Media Trial)', 'ICTR-97-23-DP (Kambanda)'],
    relatedPeople: ['Kantano Habimana (Announcer)', 'Ferdinand Nahimana', 'Hassan Ngeze', 'Félicien Kabuga'],
    relatedLocations: ['Kigali', 'RTLM Studios', 'Gisenyi Transmitter'],
    description: 'Audio recording of RTLM host Kantano Habimana directing Interahamwe squads to specific road barriers in Kigali, identifying vehicles carrying Tutsis seeking refuge, and calling for "clearing the brush".',
    investigatorNotes: 'Used in the Media Trial to substantiate direct and public incitement to commit genocide. Demonstrates real-time logistical coordination between broadcasters and death squads.',
    contentSnippet: 'KANTANO HABIMANA: "...You people who are at the barrier near Gikondo, be vigilant! A red Peugeot is moving towards you. Inspect everyone inside. Do not let any inyenzi slip away..."',
    classificationLevel: 'Unclassified Court Exhibit'
  },
  {
    id: 'EVD-NYA-BULL-01',
    title: 'Nyange Church Demolition Forensic Survey & Bulldozer Log',
    type: 'Forensic Report',
    source: 'ICTR Forensic Investigation Unit & Kibuye Public Works Inspection',
    dateObtained: '16 April 1994 / Exhumed 1995',
    chainOfCustody: [
      {
        date: '1995-11-03T09:00:00Z',
        custodian: 'ICTR Crime Scene Examination Bureau',
        action: 'On-site structural evaluation of collapsed parish masonry and mechanical Caterpillar impact points',
        verifiedBy: 'Lead Forensic Architect Dr. E. Meyer'
      },
      {
        date: '2001-04-18T16:00:00Z',
        custodian: 'Prosecutor v. Athanase Seromba (ICTR-01-66-I)',
        action: 'Admitted as Prosecution Physical Evidence P-44',
        verifiedBy: 'Trial Chamber Registrar'
      }
    ],
    authenticityStatus: 'Forensic Review Complete',
    sha256Hash: '34e12cbb54d24176498a9d18fae4c253816a1e94876274e1d3e89bc8e561145b',
    relatedCaseId: 'case-kayishema',
    relatedCases: ['IRMCT-01-67-I (Kayishema)', 'ICTR-01-66-I (Seromba)'],
    relatedPeople: ['Fulgence Kayishema', 'Father Athanase Seromba', 'Anastase Nkinamubanzi (Bulldozer Driver)'],
    relatedLocations: ['Nyange Parish', 'Kivumu Commune', 'Kibuye Prefecture'],
    description: 'Forensic architectural assessment proving that the collapse of Nyange Church roof on 16 April 1994, which crushed over 2,000 Tutsi refugees, was intentionally caused by systematic mechanical demolition using commercial Caterpillar front-loaders, not artillery or incidental shelling.',
    investigatorNotes: 'Key forensic exhibit connecting Fulgence Kayishema to the requisition of municipal fuel and equipment used to execute the demolition order.',
    contentSnippet: 'FINDINGS: Impact analysis on load-bearing pillars 3, 4, and 7 shows direct mechanical strikes consistent with Caterpillar 920 track bucket blades. Structural collapse was deliberate and total.',
    classificationLevel: 'Unclassified Court Exhibit'
  },
  {
    id: 'EVD-KANG-26',
    title: 'Kangura Newspaper Issue No. 26: "The Ten Commandments of the Hutu"',
    type: 'Historical Archive',
    source: 'National University of Rwanda Documentation Centre / ICTR Archives',
    dateObtained: 'December 1990',
    chainOfCustody: [
      {
        date: '1990-12-10T12:00:00Z',
        custodian: 'Kangura Publishing Bureau, Kigali',
        action: 'Original print publication run distributed across Rwanda',
        verifiedBy: 'Editor-in-Chief Hassan Ngeze'
      },
      {
        date: '1997-03-15T10:00:00Z',
        custodian: 'ICTR OTP Investigation Team',
        action: 'Acquisition of verified primary print issue and forensic paper analysis',
        verifiedBy: 'Archivist L. Henderson'
      }
    ],
    authenticityStatus: 'Primary Historical Archive',
    sha256Hash: '723a1052bdff4a976cfca19277f24ea15c548a609d94511ef937e1b5df16a943',
    relatedCaseId: 'case-nahimana',
    relatedCases: ['ICTR-99-52-T', 'ICTR-96-4-T'],
    relatedPeople: ['Hassan Ngeze', 'Ferdinand Nahimana'],
    relatedLocations: ['Kigali', 'Gisenyi'],
    description: 'Original copy of Kangura Issue 26 containing the infamous "Ten Commandments of the Hutu", which instructed Hutus to cease all commercial and social cooperation with Tutsis and advocated military readiness.',
    investigatorNotes: 'Foundational document demonstrating premeditated propaganda infrastructure and ideological priming prior to the 1994 outbreak.',
    contentSnippet: 'COMMANDMENT 8: The Hutu must cease having pity for the Tutsi... COMMANDMENT 10: The Hutus must be firm and vigilant against their common enemy.',
    classificationLevel: 'Public Educational'
  },
  {
    id: 'EVD-MUR-FOR-95',
    title: 'Murambi Technical School Exhumation & Forensic Pathology Report',
    type: 'Forensic Report',
    source: 'Physicians for Human Rights (PHR) & National Commission for the Fight Against Genocide (CNLG)',
    dateObtained: 'July 1995 - August 1996',
    chainOfCustody: [
      {
        date: '1995-07-22T08:00:00Z',
        custodian: 'Forensic Anthropology Team (PHR / Dr. William Haglund)',
        action: 'Excavation of mass graves surrounding Murambi polytechnic buildings and lime preservation analysis',
        verifiedBy: 'Chief Medical Examiner'
      },
      {
        date: '2004-06-11T14:00:00Z',
        custodian: 'CNLG / Kigali Genocide Memorial Repository',
        action: 'Integrated into national genocide archive and legal repository for universal jurisdiction proceedings',
        verifiedBy: 'Director of National Archives'
      }
    ],
    authenticityStatus: 'Forensic Review Complete',
    sha256Hash: '8b48f95c1c045b8e4e97a3a992bc60c490a614210cfef0c173e34b9d0b005118',
    relatedCaseId: 'case-dossier-gik94',
    relatedCases: ['NPPA-GIK-1994', 'ICTR-98-42-T'],
    relatedPeople: ['Aloys Simba (Convicted)', 'Laurent Bucyibaruta (Convicted in Paris 2022)'],
    relatedLocations: ['Murambi', 'Gikongoro Prefecture', 'Nyamagabe'],
    description: 'Pathological and osteological analysis of thousands of victims exhumed from mass burial trenches at Murambi Technical School, documenting perimortem trauma from machetes, clubs, and grenade shrapnel.',
    investigatorNotes: 'Provides scientific documentation of the coordinated assault on 16-17 April 1994, where an estimated 45,000 refugees who had been instructed by local authorities to gather at Murambi were massacred.',
    contentSnippet: 'SKELETAL TRAUMA SURVEY: 87.4% of examined crania exhibit blunt force or sharp-force perimortem lacerations. Stratigraphic evidence indicates burial immediately followed mass execution.',
    classificationLevel: 'Unclassified Court Exhibit'
  },
  {
    id: 'EVD-KAB-BANK-94',
    title: 'Félicien Kabuga Banque Commerciale du Rwanda Letters of Credit',
    type: 'Document',
    source: 'Banque Commerciale du Rwanda / UK Export Credit Guarantee Department Subpoena',
    dateObtained: '1993 - 1994 (Subpoenaed 1999)',
    chainOfCustody: [
      {
        date: '1999-04-12T10:00:00Z',
        custodian: 'ICTR Special Financial Investigation Team',
        action: 'Seized during banking audit authorized by Arusha Tribunal Subpoena',
        verifiedBy: 'Senior Financial Investigator P. Tremblay'
      },
      {
        date: '2020-06-02T11:00:00Z',
        custodian: 'IRMCT Hague Prosecutor Evidence Vault',
        action: 'Integrated into updated indictment evidence file for IRMCT-13-38-I',
        verifiedBy: 'Senior Trial Attorney'
      }
    ],
    authenticityStatus: 'Verified Authentic',
    sha256Hash: '43ac91c2bfe71946394101e4a1936c0a0c4f828bb7c4e5114c029df4b3e5a283',
    relatedCaseId: 'case-kabuga',
    relatedCases: ['IRMCT-13-38-I (Kabuga)'],
    relatedPeople: ['Félicien Kabuga', 'Ebenezer Mugenzi', 'Directors of Chillington Tool Company'],
    relatedLocations: ['Kigali', 'Nairobi', 'London', 'Mombasa'],
    description: 'Financial letters of credit and import declarations demonstrating that Félicien Kabuga imported hundreds of thousands of machetes, files, and cutlasses from manufacturers between November 1993 and March 1994, disproportionate to agricultural demand.',
    investigatorNotes: 'Crucial corporate and banking paper trail proving material and logistical supply of slaughter weapons to Interahamwe depots.',
    contentSnippet: 'DOCUMENT OF CREDIT BCR/93/LC-4882: Applicant: Kabuga Félicien. Goods: 581,000 agricultural machetes, heavy gauge steel. Delivery Port: Mombasa, routed to Kigali Bonded Warehouse.',
    classificationLevel: 'Restricted Judicial'
  },
  {
    id: 'EVD-MUG-CENSUS-94',
    title: 'Mugonero Hospital & Church Survivor Registry & Incident Logs',
    type: 'Witness Statement',
    source: 'Mugonero Adventist Hospital Archives / ICTR Case Files',
    dateObtained: '16 April 1994 / Recorded 1995',
    chainOfCustody: [
      {
        date: '1995-09-14T09:30:00Z',
        custodian: 'ICTR Field Office Kibuye',
        action: 'Deposited by surviving hospital nursing staff and pastors',
        verifiedBy: 'Field Investigator R. Santos'
      }
    ],
    authenticityStatus: 'Verified Authentic',
    sha256Hash: '9184fc31969bbca872504b868e4cb38e0787e9140cfae609e25b90f46c65b112',
    relatedCaseId: 'case-sikubwabo',
    relatedCases: ['ICTR-95-1D-I (Sikubwabo)', 'ICTR-95-1-T (Elizaphan & Gérard Ntakirutimana)'],
    relatedPeople: ['Charles Sikubwabo', 'Pastor Elizaphan Ntakirutimana', 'Dr. Gérard Ntakirutimana'],
    relatedLocations: ['Mugonero', 'Gishyita Commune', 'Kibuye'],
    description: 'Contemporary handwritten letter and survivor accounts recording the famous desperate letter from Tutsi pastors to church president: "We wish to inform you that tomorrow we will be killed with our families", and the subsequent military-led assault commanded by Sikubwabo.',
    investigatorNotes: 'Corroborates the operational timeline of Sikubwabo and regional authorities in organizing the massacre of refugees in church complexes.',
    contentSnippet: 'LETTER DATED 15 APRIL 1994: "Our Dear Pastor... We wish to inform you that tomorrow we will be killed with our families. We beseech you to intervene on our behalf..." Answer received: "You must be eliminated."',
    classificationLevel: 'Unclassified Court Exhibit'
  },
  {
    id: 'EVD-BEL-AUTOPSY-94',
    title: 'Belgian Military Commission of Inquiry: Camp Kigali Peacekeeper Autopsies',
    type: 'Forensic Report',
    source: 'Belgian Military Auditor-General & Ministry of Defence',
    dateObtained: '7 April 1994 / Formal Report 1996',
    chainOfCustody: [
      {
        date: '1994-04-14T10:00:00Z',
        custodian: 'Belgian Military Pathology Corps, Brussels',
        action: 'Post-mortem examination of 10 Belgian UNAMIR peacekeepers slain at Camp Kigali',
        verifiedBy: 'Chief Military Coroner'
      },
      {
        date: '2000-02-18T15:00:00Z',
        custodian: 'ICTR Trial Chamber I',
        action: 'Formal transmittal to UN Tribunal under bilateral mutual legal assistance treaty',
        verifiedBy: 'Belgian Federal Magistrate'
      }
    ],
    authenticityStatus: 'Certified Official Copy',
    sha256Hash: '5e09f48ac8c13049b109355ea24761014e7a8298dc117c461159e19d6756bf02',
    relatedCaseId: 'case-bagosora',
    relatedCases: ['ICTR-98-41-T (Military I)', 'Brussels Assize Court 2007 (Major Ntuyahaga)'],
    relatedPeople: ['Théoneste Bagosora', 'Major Bernard Ntuyahaga', 'Lieut. Thierry Lotin (UNAMIR)'],
    relatedLocations: ['Camp Kigali', 'Kigali', 'Prime Minister Residence'],
    description: 'Comprehensive ballistic and anatomical post-mortem files of the 10 Belgian paratroopers who were disarmed and slaughtered at Camp Kigali after attempting to protect Prime Minister Agathe Uwilingiyimana.',
    investigatorNotes: 'Directly supported the conviction of Bagosora and his military subordinates, proving intent to force the withdrawal of the Belgian UN contingent.',
    contentSnippet: 'CORONER CONCLUSION: Trauma demonstrates sustained close-quarters small arms fire and fragmentation following disarming. Defensive wounds noted.',
    classificationLevel: 'Unclassified Court Exhibit'
  }
];
