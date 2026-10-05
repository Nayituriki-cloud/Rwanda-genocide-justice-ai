import React from 'react';
import { BookOpen, Heart, Flame, Shield, MapPin, Scale, ExternalLink, ArrowRight } from 'lucide-react';

interface PublicEducationModuleProps {
  onNavigateToTimeline: () => void;
  onNavigateToCourt: () => void;
}

export const PublicEducationModule: React.FC<PublicEducationModuleProps> = ({
  onNavigateToTimeline,
  onNavigateToCourt
}) => {
  const memorials = [
    {
      name: 'Kigali Genocide Memorial (Gisozi)',
      desc: 'The final resting place for more than 250,000 victims of the genocide. A place of remembrance, learning, and peace-building education visited by heads of state and survivors worldwide.',
      location: 'Kigali',
      inaugurated: '2004 (10th Commemoration)'
    },
    {
      name: 'Murambi Genocide Memorial',
      desc: 'Former technical school in Nyamagabe where an estimated 45,000 Tutsis were systematically slaughtered on 16-17 April 1994. The preserved rooms stand as an undeniable testament against genocide denial.',
      location: 'Southern Province (Gikongoro)',
      inaugurated: 'Preserved Remains & National Monument'
    },
    {
      name: 'Bisesero Genocide Memorial (The Hill of Resistance)',
      desc: 'Commemorates the heroic organized resistance mounted by tens of thousands of Tutsis who defended Mount Muyira using spears and stones for months against regular military and militia assaults.',
      location: 'Western Province (Karongi / Kibuye)',
      inaugurated: '9 Monument Buildings representing 9 Communes'
    },
    {
      name: 'Nyamata & Ntarama Memorials (Bugesera)',
      desc: 'Historic Catholic churches where thousands of families sought sanctuary believing holy ground would protect them, only to be killed when grenades and machetes were deployed through church walls.',
      location: 'Eastern Province (Bugesera)',
      inaugurated: 'Preserved Sanctuary Monuments'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner: Kwibuka & Truth */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/60 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>KWIBUKA • REMEMBER • UNITE • RENEW</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-cinzel font-bold text-slate-100 tracking-wide">
            Memory for Generations: The 1994 Genocide against the Tutsi
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Between 7 April and mid-July 1994, more than 800,000 Tutsi children, women, and men, as well as moderate Hutus who opposed the killings, were slaughtered in approximately 100 days of planned state-sponsored violence. Preserving historical memory, honoring victims, and studying judicial records is vital to prevent genocide everywhere.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
            <button
              onClick={onNavigateToTimeline}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Interactive 1994 Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToCourt}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Read Landmark Jurisprudence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Educational Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: The 100 Days */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="h-9 w-9 rounded-lg bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
            <Flame className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-base font-bold text-slate-100">
            The 100 Days (April - July 1994)
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Following decades of discriminatory state ideology, hate broadcasts by RTLM, and political polarization, the shoot-down of President Habyarimana's aircraft was seized upon by military extremists led by Col. Théoneste Bagosora to initiate pre-planned extermination lists and nationwide roadblock massacres.
          </p>
        </div>

        {/* Module 2: The Justice Response (ICTR & Gacaca) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="h-9 w-9 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-base font-bold text-slate-100">
            Justice & Accountability
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The United Nations established the International Criminal Tribunal for Rwanda (ICTR) in Arusha, Tanzania, indicting 93 high-level architects. In parallel, Rwanda mobilized over 12,000 community <strong className="text-slate-100">Gacaca courts</strong> to try nearly 2 million cases, fostering truth-telling and survivor reconciliation.
          </p>
        </div>

        {/* Module 3: Renewal & Unity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="font-cinzel text-base font-bold text-slate-100">
            Renewal & Reconciliation
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rwanda has emerged as a beacon of social cohesion, constitutional equality (Ndi Umunyarwanda - "We are Rwandan"), and rapid economic development, demonstrating that societies devastated by the ultimate crime can rebuild through justice and collective remembrance.
          </p>
        </div>
      </div>

      {/* Genocide Memorial Sites Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
            Sacred Ground & Memorial Heritage
          </span>
          <h2 className="font-cinzel text-lg font-bold text-slate-100 mt-1">
            Major Genocide Memorial Sites Across Rwanda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memorials.map((m, idx) => (
            <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <h3 className="font-cinzel font-bold text-xs text-slate-100">{m.name}</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-400 rounded">
                  {m.location}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {m.desc}
              </p>
              <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                Designation: {m.inaugurated}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
