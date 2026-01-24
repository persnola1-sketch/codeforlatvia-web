'use client';

import Link from 'next/link';

export default function AboutProjectCard() {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Kāpēc Code For Latvia?
        </h2>
      </div>
      <div className="mt-auto space-y-4">
        <div className="space-y-4">
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Es izveidoju Code For Latvia galvenokārt sevis dēļ – lai pārbaudītu savas robežas un redzētu, ko spēju radīt. Šī ir mana personīgā laboratorija, kurā es īstenoju savas idejas un veicu dažādus tehnoloģiskus testus.
          </p>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Mans stāsts ir pavisam vienkāršs un atklāts: man ir 19 gadi, man nav augstākās izglītības un es neesmu sertificēts eksperts. Taču esmu bezgala aizrauts ar mākslīgo intelektu un tā milzīgo potenciālu. Mans lielais mērķis ir palīdzēt Latvijai digitalizēties un radīt kopienu, kurā satiktos līdzīgi domājošie – gan jaunieši, gan vecāka gadagājuma cilvēki, kuriem AI šķiet tikpat aizraujošs kā man.
          </p>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Es ticu, ka zināšanas kļūst vērtīgākas, kad ar tām dalās. Tāpēc šajā lapā es dokumentēju visu – gan savus panākumus, gan reālas kļūdas, kā, piemēram, manu "facepalm" momentu ar <Link href="/lessons/api-security" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">API atslēgas</Link> nopludināšanu. Es mācos darot, un aicinu tevi pievienoties šim procesam.
          </p>
        </div>
      </div>
    </div>
  );
}
