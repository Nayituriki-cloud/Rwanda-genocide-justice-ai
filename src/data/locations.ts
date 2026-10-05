import { HistoricalLocation } from '../types';

export const HISTORICAL_LOCATIONS: HistoricalLocation[] = [
  {
    id: 'LOC-KGL',
    name: 'Kigali (Capital City)',
    prefecture: 'Kigali-Ville',
    coordinates: [-1.9536, 30.0605],
    type: 'Judicial Headquarters',
    historicalSignificance: 'Site of the initial military crisis meetings at the Ministry of Defence, assassination of Prime Minister Agathe Uwilingiyimana and 10 Belgian peacekeepers at Camp Kigali, Sainte-Famille Church siege, and RTLM broadcasting studios.',
    documentedIncidentsCount: 38,
    memorialInfo: 'Kigali Genocide Memorial (Gisozi) - Final resting place for more than 250,000 victims of the genocide.',
    relatedCaseIds: ['case-bagosora', 'case-nahimana', 'case-kabuga']
  },
  {
    id: 'LOC-BUT',
    name: 'Butare (Huye)',
    prefecture: 'Butare',
    coordinates: [-2.5967, 29.7394],
    type: 'Massacre Site & Memorial',
    historicalSignificance: 'Intellectual capital of Rwanda; resisted genocide until 19 April 1994, when Interim President Sindikubwabo and Prime Minister Kambanda ousted moderate prefect Habyalimana and Minister Pauline Nyiramasuhuko directed systematic massacres.',
    documentedIncidentsCount: 29,
    memorialInfo: 'National University Memorial & Huye Genocide Memorial.',
    relatedCaseIds: ['case-nyiramasuhuko', 'case-kambanda', 'case-ndereyimana']
  },
  {
    id: 'LOC-NYA',
    name: 'Nyange (Kivumu Commune)',
    prefecture: 'Kibuye',
    coordinates: [-2.0294, 29.5842],
    type: 'Massacre Site & Memorial',
    historicalSignificance: 'Site of the demolition of Nyange Catholic Church on 16 April 1994, where over 2,000 Tutsi men, women, and children seeking sanctuary were crushed when bulldozers were ordered to bring down the building.',
    documentedIncidentsCount: 14,
    memorialInfo: 'Nyange Genocide Memorial Centre commemorating the victims of the parish massacre.',
    relatedCaseIds: ['case-kayishema']
  },
  {
    id: 'LOC-BIS',
    name: 'Bisesero Hills (Mount Muyira)',
    prefecture: 'Kibuye (Karongi)',
    coordinates: [-2.1833, 29.3500],
    type: 'Resistance Site',
    historicalSignificance: 'The historic hill where tens of thousands of Tutsis mounted an heroic organized resistance under Aminadabu Birara for months against overwhelming military, gendarme, and militia attacks.',
    documentedIncidentsCount: 22,
    memorialInfo: 'Bisesero Genocide Memorial (The Hill of Resistance) with 9 open buildings representing the 9 communes of Kibuye.',
    relatedCaseIds: ['case-sikubwabo', 'case-ryandikayo', 'case-ndimbati']
  },
  {
    id: 'LOC-MUR',
    name: 'Murambi Technical School',
    prefecture: 'Gikongoro (Nyamagabe)',
    coordinates: [-2.4561, 29.5694],
    type: 'Massacre Site & Memorial',
    historicalSignificance: 'Site of the coordinated slaughter of an estimated 45,000 Tutsis lured to the unfinished technical school on 16-17 April 1994, followed by lime preservation of mass graves examined by international forensics.',
    documentedIncidentsCount: 18,
    memorialInfo: 'Murambi Genocide Memorial, preserving preserved remains and mass graves as an undeniable physical record.',
    relatedCaseIds: ['case-dossier-gik94']
  },
  {
    id: 'LOC-GIS',
    name: 'Gisenyi (Rubavu)',
    prefecture: 'Gisenyi',
    coordinates: [-1.6975, 29.2564],
    type: 'Key Infrastructure & Transmission',
    historicalSignificance: 'Northern stronghold of the Akazu and interim government retreat in late June/July 1994. Site of the infamous "Commune Rouge" mass burial grounds and border transit points into Zaire (DRC).',
    documentedIncidentsCount: 17,
    memorialInfo: 'Commune Rouge Memorial / Gisenyi Memorial Cemetery.',
    relatedCaseIds: ['case-bagosora', 'case-nahimana', 'case-kambanda']
  },
  {
    id: 'LOC-CYA',
    name: 'Cyangugu (Rusizi)',
    prefecture: 'Cyangugu',
    coordinates: [-2.4844, 28.9075],
    type: 'Commune Office',
    historicalSignificance: 'Site of the Kamembe Stadium and cathedral concentration camps. Focus of the ICTR Cyangugu Group trial resulting in the acquittals of André Ntagerura and Emmanuel Bagambiki.',
    documentedIncidentsCount: 15,
    memorialInfo: 'Kamembe Genocide Memorial & Lake Kivu Memorial Sites.',
    relatedCaseIds: ['case-ntagerura', 'case-bagambiki']
  },
  {
    id: 'LOC-ARU',
    name: 'Arusha (Tanzania)',
    prefecture: 'International Node',
    coordinates: [-3.3869, 36.6830],
    type: 'Judicial Headquarters',
    historicalSignificance: 'Seat of the United Nations International Criminal Tribunal for Rwanda (ICTR) from 1995 to 2015, which indicted 93 individuals, held 5,800 trial days, and produced foundational jurisprudence on genocide.',
    documentedIncidentsCount: 93,
    memorialInfo: 'ICTR / IRMCT Judicial Archive and Exhibition Center.',
    relatedCaseIds: ['case-bagosora', 'case-kambanda', 'case-akayesu', 'case-nyiramasuhuko', 'case-nahimana']
  },
  {
    id: 'LOC-HAG',
    name: 'The Hague (Netherlands)',
    prefecture: 'International Node',
    coordinates: [52.0705, 4.3007],
    type: 'Judicial Headquarters',
    historicalSignificance: 'Headquarters of the UN International Residual Mechanism for Criminal Tribunals (IRMCT) managing residual functions, fugitive tracking, and health supervision of detained accused like Félicien Kabuga.',
    documentedIncidentsCount: 12,
    memorialInfo: 'IRMCT International Archives and Court Records Repository.',
    relatedCaseIds: ['case-kabuga', 'case-kayishema', 'case-sikubwabo']
  }
];
