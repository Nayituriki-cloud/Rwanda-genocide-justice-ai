import { CourtRecord } from '../types';

export const COURT_RECORDS: CourtRecord[] = [
  {
    id: 'REC-ICTR-AKA-98',
    caseNumber: 'ICTR-96-4-T',
    title: 'The Prosecutor v. Jean-Paul Akayesu (Judgment)',
    jurisdiction: 'ICTR',
    documentType: 'Trial Judgment',
    dateIssued: '2 September 1998',
    presidingJudges: ['Judge Laïty Kama', 'Judge Navanethem Pillay', 'Judge Lennart Aspegren'],
    keyFindings: [
      'First conviction for genocide by an international court interpreting the 1948 Convention on the Prevention and Punishment of the Crime of Genocide.',
      'Definitive judicial determination that sexual violence and rape constituted an integral act of genocide when committed with intent to destroy in whole or in part the Tutsi ethnic group.',
      'Established that a local civilian official (Bourgmestre) possessed authority and command responsibility.'
    ],
    legalPrecedentsEstablished: [
      'Sexual violence recognized as an act of genocide under international criminal law.',
      'Standard of genocidal intent (dolus specialis) defined.'
    ],
    archiveUrl: 'https://unictr.irmct.org/en/cases/ictr-96-4'
  },
  {
    id: 'REC-ICTR-BAG-08',
    caseNumber: 'ICTR-98-41-T',
    title: 'The Prosecutor v. Théoneste Bagosora et al. (Military I Judgment)',
    jurisdiction: 'ICTR',
    documentType: 'Trial Judgment',
    dateIssued: '18 December 2008',
    presidingJudges: ['Judge Erik Møse', 'Judge Jai Ram Reddy', 'Judge Sergei Alekseevich Egorov'],
    keyFindings: [
      'Convicted Col. Théoneste Bagosora for genocide, crimes against humanity, and war crimes.',
      'Established effective military command and control over the killing of Prime Minister Agathe Uwilingiyimana and 10 Belgian peacekeepers.',
      'Appeals Chamber in 2011 affirmed core liability while calibrating scope of prior conspiracy.'
    ],
    legalPrecedentsEstablished: [
      'Command responsibility standards under Article 6(3) of the ICTR Statute applied to de facto military rulers.'
    ],
    archiveUrl: 'https://unictr.irmct.org/en/cases/ictr-98-41'
  },
  {
    id: 'REC-ICTR-MED-03',
    caseNumber: 'ICTR-99-52-T',
    title: 'The Prosecutor v. Ferdinand Nahimana, Jean-Bosco Barayagwiza and Hassan Ngeze (Media Trial)',
    jurisdiction: 'ICTR',
    documentType: 'Trial Judgment',
    dateIssued: '3 December 2003',
    presidingJudges: ['Judge Navanethem Pillay', 'Judge Erik Møse', 'Judge Asoka de Zoysa Gunawardana'],
    keyFindings: [
      'Executives and editors of RTLM radio and Kangura newspaper convicted of direct and public incitement to commit genocide.',
      'Distinguished lawful free speech from speech that incites violence and destruction of an ethnic group.',
      'Broadcast of names, locations, and vehicle plates constituted actionable criminal participation in genocide.'
    ],
    legalPrecedentsEstablished: [
      'International standard for hate speech liability and media incitement in armed conflict.'
    ],
    archiveUrl: 'https://unictr.irmct.org/en/cases/ictr-99-52'
  },
  {
    id: 'REC-ICTR-NYI-11',
    caseNumber: 'ICTR-98-42-T',
    title: 'The Prosecutor v. Pauline Nyiramasuhuko et al. (Butare Group Judgment)',
    jurisdiction: 'ICTR',
    documentType: 'Trial Judgment',
    dateIssued: '24 June 2011',
    presidingJudges: ['Judge William H. Sekule', 'Judge Arlette Ramaroson', 'Judge Solomy Balungi Bossa'],
    keyFindings: [
      'First woman convicted of genocide and incitement to rape by an international court.',
      'Coordinated the deployment of Interahamwe militias across Butare following the removal of prefect Habyalimana.',
      'Appeals Chamber affirmed 47-year prison term.'
    ],
    legalPrecedentsEstablished: [
      'Ministerial liability and female command participation in genocide and crimes against humanity.'
    ],
    archiveUrl: 'https://unictr.irmct.org/en/cases/ictr-98-42'
  },
  {
    id: 'REC-IRMCT-KAY-23',
    caseNumber: 'IRMCT-01-67-I',
    title: 'The Prosecutor v. Fulgence Kayishema (Transfer & Extradition Record)',
    jurisdiction: 'IRMCT',
    documentType: 'Rule 11bis Transfer',
    dateIssued: '22 February 2012 / Updated 2023',
    presidingJudges: ['Referral Chamber under Rule 11bis'],
    keyFindings: [
      'Approved referral of the Kayishema case to the specialized jurisdiction of the High Court of Rwanda upon apprehension.',
      'Recognized reforms in the Rwandan judicial system, including abolition of capital punishment and guarantees of fair trial standards.',
      'South African High Court processing extradition procedures following May 2023 arrest.'
    ],
    legalPrecedentsEstablished: [
      'Criteria for transferring international tribunal indictments to national sovereign courts under monitored safeguards.'
    ],
    archiveUrl: 'https://www.irmct.org/en/cases/mict-01-67'
  },
  {
    id: 'REC-GAC-LEG-02',
    caseNumber: 'ORGANIC-LAW-40-2000',
    title: 'Establishment of the Gacaca Jurisdictions for the Prosecution of Genocide Crimes',
    jurisdiction: 'Gacaca Jurisdictions',
    documentType: 'Trial Judgment',
    dateIssued: '2001 - 2012 (Comprehensive National Archive)',
    presidingJudges: ['Elected Inyangamugayo (Judges of Integrity) across 12,103 local courts'],
    keyFindings: [
      'Over 1.95 million individuals processed across three categories: planners/notable killers (Cat 1), perpetrators of bodily harm/manslaughter (Cat 2), and property destruction (Cat 3).',
      'Encouraged public confessions, revelation of victim grave locations, and community service (TIG) for reintegration.',
      'Concluded operations in June 2012; archives preserved at CNLG / National Repository.'
    ],
    legalPrecedentsEstablished: [
      'Restorative community justice integrated into post-conflict mass atrocity accountability.'
    ],
    archiveUrl: 'https://gacaca.archive.gov.rw'
  }
];
