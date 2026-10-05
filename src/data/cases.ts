import { CaseRecord } from '../types';

export const CASE_RECORDS: CaseRecord[] = [
  {
    id: 'case-bagosora',
    caseNumber: 'ICTR-98-41-T',
    suspectName: 'Théoneste Bagosora',
    knownAliases: ['Colonel Bagosora', 'The Kingmaker of the Apocalypse'],
    legalStatus: 'CONVICTED',
    charges: [
      'Genocide',
      'Crimes Against Humanity (Murder, Extermination, Persecution)',
      'Serious Violations of Article 3 Common to the Geneva Conventions and of Additional Protocol II'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR) / IRMCT',
    country: 'Rwanda / Mali (Prison)',
    photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['6 April 1994', '7 April 1994', '8 April 1994', 'July 1994'],
    locations: ['Kigali', 'Camp Kigali', 'Ministry of Defence', 'Gisenyi'],
    organizationsInvolved: ['Forces Armées Rwandaises (FAR)', 'Presidential Guard', 'Interahamwe militia'],
    witnessReferences: ['Witness A', 'Witness B', 'Gen. Roméo Dallaire (UNAMIR Commander)', 'Luc Marchal (Kigali Sector Commander)'],
    evidenceReferences: ['EVD-UN-FAX-94', 'EVD-MIL-CAB-01', 'EVD-BEL-AUTOPSY-94', 'EVD-FAR-RAD-09'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber I',
        date: '18 December 2008',
        decision: 'Guilty of Genocide, Crimes against Humanity, and War Crimes. Found to have exercised effective control over FAR soldiers and Presidential Guard during early hours of the genocide.',
        sentence: 'Life Imprisonment'
      },
      {
        chamber: 'Appeals Chamber',
        date: '14 December 2011',
        decision: 'Affirmed convictions for core crimes while vacating findings on specific prior conspiracy before 6 April.',
        sentence: 'Sentence adjusted to 35 Years Imprisonment'
      }
    ],
    currentCaseStatus: 'Convicted; served sentence under UN supervision in Koulikoro Prison, Mali until decease in September 2021.',
    summary: 'Directly orchestrated the military takeover in Kigali following the plane crash of 6 April 1994, leading to the murder of Prime Minister Agathe Uwilingiyimana, 10 Belgian peacekeepers, and the rapid deployment of roadblocks.',
    lastUpdated: '2024-04-01',
    verifiedSource: 'UN IRMCT Official Case Archives: ICTR-98-41-T (Military I Judgment)'
  },
  {
    id: 'case-kambanda',
    caseNumber: 'ICTR-97-23-DP',
    suspectName: 'Jean Kambanda',
    knownAliases: ['Prime Minister Kambanda'],
    legalStatus: 'CONVICTED',
    charges: [
      'Genocide',
      'Conspiracy to Commit Genocide',
      'Direct and Public Incitement to Commit Genocide',
      'Complicity in Genocide',
      'Crimes Against Humanity (Extermination, Murder)'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR)',
    country: 'Rwanda / Mali (Prison)',
    photoUrl: 'https://images.unsplash.com/photo-1453733190028-5fa154884791?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['8 April 1994', '19 April 1994', 'May 1994', '17 July 1994'],
    locations: ['Kigali', 'Gitarama', 'Butare', 'Gisenyi'],
    organizationsInvolved: ['Interim Government of Rwanda', 'MDR-Power faction', 'Interahamwe'],
    witnessReferences: ['Self-Admissions in Signed Plea Agreement', 'Official Cabinet Meeting Minutes', 'Prefectural Broadcast Logs'],
    evidenceReferences: ['EVD-CAB-MIN-94', 'EVD-RTLM-AUD-23', 'EVD-PLEA-KAM-98'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber I',
        date: '4 September 1998',
        decision: 'Guilty on all counts following voluntary guilty plea. First head of government in history convicted of genocide by an international tribunal.',
        sentence: 'Life Imprisonment'
      },
      {
        chamber: 'Appeals Chamber',
        date: '19 October 2000',
        decision: 'Upheld guilty plea and confirmed life imprisonment sentence in full.',
        sentence: 'Life Imprisonment (Affirmed)'
      }
    ],
    currentCaseStatus: 'Serving life imprisonment in Mali under IRMCT custodial enforcement.',
    summary: 'As Prime Minister of the Interim Government, Kambanda presided over cabinet decisions facilitating arms distributions, encouraged killings in Butare following the dismissal of moderate prefect Jean-Baptiste Habyalimana, and broadcast incitement over RTLM.',
    lastUpdated: '2024-01-15',
    verifiedSource: 'ICTR Case Record ICTR-97-23-DP / UN Treaty Series'
  },
  {
    id: 'case-akayesu',
    caseNumber: 'ICTR-96-4-T',
    suspectName: 'Jean-Paul Akayesu',
    knownAliases: ['Bourgmestre of Taba'],
    legalStatus: 'CONVICTED',
    charges: [
      'Genocide',
      'Direct and Public Incitement to Commit Genocide',
      'Crimes Against Humanity (Extermination, Murder, Torture, Rape and Other Inhumane Acts)'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR)',
    country: 'Rwanda / Mali (Prison)',
    photoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['7 April 1994', '19 April 1994', 'May 1994', 'June 1994'],
    locations: ['Taba Commune', 'Gitarama Prefecture'],
    organizationsInvolved: ['Communal Police of Taba', 'Interahamwe Taba Unit'],
    witnessReferences: ['Witness H', 'Witness J', 'Witness OO', 'Witness PP (Protected Sexual Violence Survivors)'],
    evidenceReferences: ['EVD-TABA-BUR-01', 'EVD-MED-REP-TABA', 'EVD-SURV-TEST-96'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber I',
        date: '2 September 1998',
        decision: 'Historic landmark judgment: convicted of genocide and crimes against humanity. First international judgment interpreting the 1948 Genocide Convention and formally ruling that systematic sexual violence and rape constitutes an act of genocide.',
        sentence: 'Life Imprisonment'
      },
      {
        chamber: 'Appeals Chamber',
        date: '1 June 2001',
        decision: 'Appeals Chamber unanimously rejected all appeals and affirmed the conviction and sentence in full.',
        sentence: 'Life Imprisonment (Final)'
      }
    ],
    currentCaseStatus: 'Serving life sentence in Mali under IRMCT framework.',
    summary: 'Bourgmestre who actively oversaw and ordered killings at the communal bureau of Taba, and permitted systematic sexual violence against Tutsi women who had sought refuge at the commune office.',
    lastUpdated: '2023-10-10',
    verifiedSource: 'ICTR Official Record ICTR-96-4-T; UN Human Rights Case Law'
  },
  {
    id: 'case-nyiramasuhuko',
    caseNumber: 'ICTR-98-42-T',
    suspectName: 'Pauline Nyiramasuhuko',
    knownAliases: ['Minister Pauline'],
    legalStatus: 'CONVICTED',
    charges: [
      'Genocide',
      'Conspiracy to Commit Genocide',
      'Crimes Against Humanity (Extermination, Rape, Persecution)',
      'Serious Violations of Common Article 3 & Additional Protocol II'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR) / IRMCT',
    country: 'Rwanda / Senegal (Custody transfer)',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['19 April 1994', 'May 1994', 'June 1994', 'July 1994'],
    locations: ['Butare Prefecture', 'Butare Prefecture Office', 'National University of Rwanda (UNR)'],
    organizationsInvolved: ['Interim Government (Ministry for Family Welfare)', 'Interahamwe Butare', 'Gendarmerie Butare'],
    witnessReferences: ['Witness TA', 'Witness QY', 'Witness QA', 'Witness SJ'],
    evidenceReferences: ['EVD-BUT-PREF-94', 'EVD-VEH-LOG-BUT', 'EVD-SURV-TEST-98'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber II (Butare Group)',
        date: '24 June 2011',
        decision: 'First woman in international jurisprudence convicted of genocide and incitement to rape as a crime against humanity.',
        sentence: 'Life Imprisonment'
      },
      {
        chamber: 'Appeals Chamber',
        date: '14 December 2015',
        decision: 'Upheld core genocide convictions; adjusted cumulative sentencing factors.',
        sentence: '47 Years Imprisonment'
      }
    ],
    currentCaseStatus: 'Serving sentence under international enforcement agreement in Senegal.',
    summary: 'Organized and supervised massacres in Butare prefecture after removing opposing local prefect. Commanded militia units and ordered them to rape and kill Tutsi women and children.',
    lastUpdated: '2024-02-20',
    verifiedSource: 'ICTR-98-42-T Judgment Archives / UN IRMCT'
  },
  {
    id: 'case-nahimana',
    caseNumber: 'ICTR-99-52-T',
    suspectName: 'Ferdinand Nahimana & Hassan Ngeze',
    knownAliases: ['The Media Trial Defendants', 'Founders of RTLM & Kangura'],
    legalStatus: 'CONVICTED',
    charges: [
      'Genocide',
      'Direct and Public Incitement to Commit Genocide',
      'Conspiracy to Commit Genocide',
      'Crimes Against Humanity (Persecution, Extermination)'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR)',
    country: 'Rwanda / Mali (Prison)',
    photoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['1990 - 1994', 'April 1994', 'May 1994', 'July 1994'],
    locations: ['Kigali', 'Gisenyi', 'RTLM Broadcasting Studios'],
    organizationsInvolved: ['Radio Télévision Libre des Mille Collines (RTLM)', 'Kangura Newspaper', 'CDR Party'],
    witnessReferences: ['Expert Witness Alison Des Forges', 'Witness GO', 'Witness WD', 'Former RTLM technicians'],
    evidenceReferences: ['EVD-RTLM-AUD-23', 'EVD-KANG-26', 'EVD-RTLM-SHARE-REG'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber I',
        date: '3 December 2003',
        decision: 'Landmark ruling establishing criminal responsibility of media executives for hate speech and direct incitement to genocide.',
        sentence: 'Life Imprisonment (Nahimana), Life (Ngeze)'
      },
      {
        chamber: 'Appeals Chamber',
        date: '28 November 2007',
        decision: 'Affirmed convictions for broadcasts made after 6 April 1994; reduced terms based on command nuances.',
        sentence: 'Nahimana: 30 Years; Ngeze: 35 Years'
      }
    ],
    currentCaseStatus: 'Sentences completed or serving supervised term under IRMCT jurisdiction.',
    summary: 'Utilized radio broadcasts and publications to dehumanize Tutsis (calling them "inyenzi" and "cockroaches"), broadcasting specific names and license plates of targets to be killed at barriers.',
    lastUpdated: '2023-11-12',
    verifiedSource: 'ICTR-99-52-T (Media Trial Judgment) / UN IRMCT'
  },
  {
    id: 'case-kabuga',
    caseNumber: 'IRMCT-13-38-I',
    suspectName: 'Félicien Kabuga',
    knownAliases: ['Faraji', 'Financier of the Genocide'],
    legalStatus: 'ACCUSED / INDICTED',
    charges: [
      'Genocide',
      'Direct and Public Incitement to Commit Genocide',
      'Conspiracy to Commit Genocide',
      'Crimes Against Humanity (Persecution, Extermination, Murder)'
    ],
    courtOrAuthority: 'International Residual Mechanism for Criminal Tribunals (IRMCT)',
    country: 'Arrested in France; Hague detention center',
    photoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['1993 - 1994', 'May 2020 (Arrested near Paris)', '2022 - 2023 (Proceedings)'],
    locations: ['Kigali', 'Gisenyi', 'Paris (Asnières-sur-Seine)', 'Nairobi'],
    organizationsInvolved: ['RTLM Executive Board', 'Fonds de Défense Nationale (FDN)', 'Interahamwe Finance Committee'],
    witnessReferences: ['Financial Auditors', 'Customs Import Agents', 'Former RTLM Accountants', 'Witness KAB-01'],
    evidenceReferences: ['EVD-KAB-BANK-94', 'EVD-MACH-IMP-93', 'EVD-RTLM-SHARE-REG'],
    courtDecisions: [
      {
        chamber: 'IRMCT Trial Chamber',
        date: '6 June 2023',
        decision: 'Trial Chamber found Kabuga unfit to participate meaningfully in his trial due to severe dementia, and proposed an alternative "trial of the facts" without conviction.',
        sentence: 'N/A'
      },
      {
        chamber: 'IRMCT Appeals Chamber',
        date: '7 August 2023',
        decision: 'Appeals Chamber ruled the alternative trial procedure had no basis in the Mechanism statute; ordered an indefinite stay of proceedings while subject to court-supervised periodic monitoring.',
        sentence: 'Indefinite Stay of Proceedings under Judicial Safeguards'
      }
    ],
    currentCaseStatus: 'Detained under judicial health supervision. Indictment remains legally active; not acquitted, but incapacitated from standing trial.',
    summary: 'Alleged principal financier of RTLM hate radio and importer of massive shipments of machetes and agricultural weapons used by Interahamwe militias across Rwanda.',
    lastUpdated: '2024-03-14',
    verifiedSource: 'IRMCT Case IRMCT-13-38-I / Official Hague Register'
  },
  {
    id: 'case-kayishema',
    caseNumber: 'IRMCT-01-67-I',
    suspectName: 'Fulgence Kayishema',
    knownAliases: ['Donatien Phiri', 'Fulgence Dushimiyimana'],
    legalStatus: 'ACCUSED / INDICTED',
    charges: [
      'Genocide',
      'Complicity in Genocide',
      'Conspiracy to Commit Genocide',
      'Crimes Against Humanity (Extermination, Murder)'
    ],
    courtOrAuthority: 'IRMCT / National Public Prosecution Authority (NPPA Rwanda transfer)',
    country: 'Arrested in South Africa (May 2023); Extradition / Transfer to Kigali underway',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['15-16 April 1994', '24 May 2023 (Arrest in Paarl, SA)'],
    locations: ['Nyange Parish (Kivumu Commune)', 'Kibuye Prefecture', 'Paarl (Western Cape, South Africa)'],
    organizationsInvolved: ['Judicial Police of Kivumu', 'Interahamwe Kivumu', 'Kivumu Commune Council'],
    witnessReferences: ['Witness BEX', 'Witness CBR', 'Father Seromba trial testimonies', 'Kivumu Parish Clergy'],
    evidenceReferences: ['EVD-NYA-BULL-01', 'EVD-NYA-PHOTO-94', 'EVD-FUG-TRACK-SA'],
    courtDecisions: [
      {
        chamber: 'IRMCT Referral Chamber',
        date: '2012 / Reconfirmed 2023',
        decision: 'Designated for referral to Rwandan national courts under Rule 11bis upon apprehension; judicial handover processed through South African extradition courts.',
        sentence: 'Pending Trial on the Merits'
      }
    ],
    currentCaseStatus: 'In South African judicial custody facing immigration and extradition proceedings to stand trial before Rwandan Specialised Chamber for International Crimes.',
    summary: 'Former judicial police inspector accused of planning and executing the slaughter of over 2,000 Tutsi men, women, and children seeking sanctuary inside Nyange Catholic Church, using fuel, explosives, and Caterpillar bulldozers to crush the building.',
    lastUpdated: '2024-04-02',
    verifiedSource: 'IRMCT Office of the Prosecutor / South African National Prosecuting Authority'
  },
  {
    id: 'case-sikubwabo',
    caseNumber: 'ICTR-95-1D-I',
    suspectName: 'Charles Sikubwabo',
    knownAliases: ['Sikubwabo Bourgmestre'],
    legalStatus: 'WANTED BY AUTHORITY',
    charges: [
      'Genocide',
      'Crimes Against Humanity (Murder, Extermination, Rape, Other Inhumane Acts)',
      'Violations of Common Article 3 of the Geneva Conventions'
    ],
    courtOrAuthority: 'International Residual Mechanism for Criminal Tribunals (IRMCT) & NPPA Rwanda',
    country: 'Fugitive (Reported historical movements in DRC / Central Africa)',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['April 1994', 'May 1994', 'June 1994', 'Ongoing Wanted Notice'],
    locations: ['Gishyita Commune', 'Bisesero Hills', 'Mugonero Hospital & Church Complex', 'Kibuye Prefecture'],
    organizationsInvolved: ['Gishyita Commune Police', 'Interahamwe Bisesero Taskforce'],
    witnessReferences: ['Witness SIK-01', 'Protected Survivor S-14', 'Mugonero Hospital Medical Staff'],
    evidenceReferences: ['EVD-MUG-CENSUS-94', 'EVD-BIS-MAP-94', 'EVD-RED-NOTICE-SIK'],
    courtDecisions: [
      {
        chamber: 'ICTR Trial Chamber II',
        date: 'Indictment Confirmed: 28 November 1995 (Amended 2000)',
        decision: 'International arrest warrant and Interpol Red Notice in force; cases transferred to Rwanda under Rule 11bis pending capture.',
        sentence: 'Pending Capture & Arraignment'
      }
    ],
    currentCaseStatus: 'Active international fugitive warrant. Tracked by UN IRMCT OTP Fugitive Tracking Team and Rwandan NPPA.',
    summary: 'Former bourgmestre of Gishyita commune accused of commanding and coordinating large-scale attacks on tens of thousands of Tutsis who had gathered for defense in Bisesero hills and at Mugonero church complex.',
    lastUpdated: '2024-03-25',
    verifiedSource: 'UN IRMCT Fugitives Profile / Interpol Red Notice #A-182/4-2002'
  },
  {
    id: 'case-ryandikayo',
    caseNumber: 'ICTR-95-1E-R90',
    suspectName: 'Ryandikayo',
    knownAliases: ['Ryandikayo Merchant of Gishyita'],
    legalStatus: 'WANTED BY AUTHORITY',
    charges: [
      'Genocide',
      'Complicity in Genocide',
      'Crimes Against Humanity (Murder, Extermination, Rape)'
    ],
    courtOrAuthority: 'IRMCT / National Public Prosecution Authority (NPPA Rwanda)',
    country: 'Fugitive',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['April - June 1994', 'Active Warrant'],
    locations: ['Gishyita', 'Kibuye Prefecture', 'Bisesero Hills', 'Mubuga Church'],
    organizationsInvolved: ['Interahamwe Gishyita', 'Local Merchants Coalition'],
    witnessReferences: ['Witness RYA-03', 'Witness BEX', 'Survivor Testimony Bisesero'],
    evidenceReferences: ['EVD-BIS-WIT-01', 'EVD-RED-NOTICE-RYA'],
    courtDecisions: [
      {
        chamber: 'ICTR Trial Chamber',
        date: '1995 / Amended 2002',
        decision: 'Indictment confirmed; subject to international arrest warrant and UN rewards program.',
        sentence: 'Pending Apprehension'
      }
    ],
    currentCaseStatus: 'Active fugitive wanted by international authorities. Intelligence analysis ongoing to verify cross-border reports or potential decease.',
    summary: 'Prominent merchant in Kibuye who allegedly funded, transported, and actively led armed militia assaults against civilians trapped in Mubuga church and throughout the Bisesero mountains.',
    lastUpdated: '2024-02-18',
    verifiedSource: 'UN IRMCT Fugitive Tracking Register'
  },
  {
    id: 'case-ndimbati',
    caseNumber: 'ICTR-95-1F-I',
    suspectName: 'Aloys Ndimbati',
    knownAliases: ['Bourgmestre Ndimbati'],
    legalStatus: 'WANTED BY AUTHORITY',
    charges: [
      'Genocide',
      'Direct and Public Incitement to Commit Genocide',
      'Crimes Against Humanity (Extermination, Murder)'
    ],
    courtOrAuthority: 'IRMCT / NPPA Rwanda',
    country: 'Fugitive (Subject to deceased status confirmation inquiry)',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['April - July 1994', 'Ongoing Judicial Tracking'],
    locations: ['Gisovu Commune', 'Bisesero Hills', 'Kibuye'],
    organizationsInvolved: ['Gisovu Communal Police', 'Tea Factory Drivers & Militia'],
    witnessReferences: ['Gisovu Factory Workers', 'Bisesero Survivors', 'Witness NDI-02'],
    evidenceReferences: ['EVD-GIS-TEA-LOGS', 'EVD-RED-NOTICE-NDI'],
    courtDecisions: [
      {
        chamber: 'ICTR Trial Chamber I',
        date: 'Indictment Confirmed: 1995',
        decision: 'International arrest warrant issued; referred to Rwanda under Rule 11bis.',
        sentence: 'Pending Formal Arraignment or Forensic Confirmation'
      }
    ],
    currentCaseStatus: 'Active warrant maintained pending definitive forensic confirmation of reported biological demise in 1997.',
    summary: 'Accused of orchestrating the extermination of Tutsis in Gisovu commune and mobilizing heavy machinery and armed squads to hunt down survivors holding out in Bisesero.',
    lastUpdated: '2024-01-20',
    verifiedSource: 'UN IRMCT Office of the Prosecutor'
  },
  {
    id: 'case-ntagerura',
    caseNumber: 'ICTR-99-46-T',
    suspectName: 'André Ntagerura',
    knownAliases: ['Minister Ntagerura'],
    legalStatus: 'CLEARED / ACQUITTED',
    charges: [
      'Genocide (Acquitted)',
      'Conspiracy to Commit Genocide (Acquitted)',
      'Direct and Public Incitement (Acquitted)',
      'Crimes Against Humanity (Acquitted)'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR)',
    country: 'Rwanda / Residing under UN protective relocation',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['1994', 'Trial 2001 - 2004', 'Appeal 2006'],
    locations: ['Cyangugu Prefecture', 'Kigali'],
    organizationsInvolved: ['Ministry of Transport and Communications (Trial focus)'],
    witnessReferences: ['Prosecution Witness MG', 'Defence Witness T-12', 'Ministry Transportation Registrars'],
    evidenceReferences: ['EVD-CYA-LOG-01', 'EVD-MIN-TRANS-DOCS', 'EVD-JUDG-NTAG-04'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber III (Cyangugu Case)',
        date: '25 February 2004',
        decision: 'Acquitted of all counts. The Trial Chamber found the prosecution failed to prove beyond a reasonable doubt that Ntagerura authorized the use of government vehicles to transport militia or weapons.',
        sentence: 'Full Acquittal on All Counts'
      },
      {
        chamber: 'Appeals Chamber',
        date: '7 July 2006',
        decision: 'The Appeals Chamber unanimously upheld the acquittal, finding no legal or factual errors in the Trial Chamber evaluation of evidence.',
        sentence: 'Acquittal Confirmed (Final)'
      }
    ],
    currentCaseStatus: 'Fully cleared and acquitted by competent international court of law. Enjoys complete presumption of innocence and legal clearance.',
    summary: 'Former Minister of Transport tried in the Cyangugu Group case. The court rigorously tested the prosecution evidence and concluded that reasonable doubt remained, leading to unanimous acquittal.',
    lastUpdated: '2023-09-01',
    verifiedSource: 'ICTR Trial Chamber III & Appeals Chamber Judgments (ICTR-99-46-A)'
  },
  {
    id: 'case-bagambiki',
    caseNumber: 'ICTR-99-46-A',
    suspectName: 'Emmanuel Bagambiki',
    knownAliases: ['Prefect Bagambiki'],
    legalStatus: 'CLEARED / ACQUITTED',
    charges: [
      'Genocide (Acquitted)',
      'Complicity in Genocide (Acquitted)',
      'Crimes Against Humanity (Acquitted)'
    ],
    courtOrAuthority: 'International Criminal Tribunal for Rwanda (ICTR)',
    country: 'Rwanda / International Residence',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['April - July 1994', 'Acquitted 2004'],
    locations: ['Cyangugu Prefecture', 'Kamembe Stadium', 'Gashirabwoba'],
    organizationsInvolved: ['Cyangugu Prefecture Administration'],
    witnessReferences: ['Witness LAC', 'Prefecture Police Officers', 'Red Cross Cyangugu Observers'],
    evidenceReferences: ['EVD-CYA-PREF-MINS', 'EVD-JUDG-BAG-04'],
    courtDecisions: [
      {
        chamber: 'Trial Chamber III',
        date: '25 February 2004',
        decision: 'Acquitted on all counts due to insufficient proof beyond a reasonable doubt.',
        sentence: 'Acquitted'
      },
      {
        chamber: 'Appeals Chamber',
        date: '7 July 2006',
        decision: 'Appeals Chamber affirmed Trial Chamber acquittal.',
        sentence: 'Acquittal Affirmed'
      }
    ],
    currentCaseStatus: 'Legally cleared and acquitted. Record maintained in justice database to reflect standard of proof under the rule of law.',
    summary: 'Former prefect of Cyangugu prosecuted alongside Ntagerura. Demonstrates that the judicial process requires proof beyond reasonable doubt, and individuals against whom charges are unproven are formally exonerated.',
    lastUpdated: '2023-09-01',
    verifiedSource: 'ICTR Cyangugu Judgment Record (ICTR-99-46)'
  },
  {
    id: 'case-dossier-gik94',
    caseNumber: 'INQ-NPPA-GIK-1994-09',
    suspectName: 'Inquiry Dossier: Cyanika Logistics Network',
    knownAliases: ['Cyanika Parish Supply Inquiry'],
    legalStatus: 'ALLEGATION / UNVERIFIED',
    charges: [
      'Preliminary Examination: Logistical Fuel Distribution to Roadblocks',
      'Unverified Allegations of Transport Facilitation'
    ],
    courtOrAuthority: 'National Public Prosecution Authority (NPPA Rwanda) - Preliminary Review',
    country: 'Rwanda (Southern Province)',
    photoUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80',
    relevantDates: ['17-21 April 1994'],
    locations: ['Cyanika Parish', 'Gikongoro Prefecture', 'Nyamagabe'],
    organizationsInvolved: ['Local Transport Cooperative (Under Review)'],
    witnessReferences: ['Informant INF-41', 'Witness Statement CYA-08 (Unsworn)'],
    evidenceReferences: ['EVD-CYA-FUEL-LEDG', 'EVD-COMM-NOTE-94'],
    courtDecisions: [
      {
        chamber: 'Investigative Review Bureau',
        date: 'Active Review',
        decision: 'No formal indictment filed. Case strictly marked as UNVERIFIED ALLEGATION requiring human corroboration, fuel depot log reconciliation, and survivor interviews.',
        sentence: 'Pending Human Investigation'
      }
    ],
    currentCaseStatus: 'Open preliminary inquiry. Presumption of innocence remains absolute. No public attribution of individual criminal guilt.',
    summary: 'Investigative dossier compiling uncorroborated reports regarding civilian fuel distribution that allegedly supplied transport to roadblocks near Cyanika. Requires independent documentary verification.',
    lastUpdated: '2024-03-10',
    verifiedSource: 'NPPA Department of Preliminary Inquiries Dossier #GIK-1994-09'
  }
];
