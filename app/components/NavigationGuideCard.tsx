'use client';

export default function NavigationGuideCard() {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 h-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">🛠️ Mana Rīku Kaste (My Stack)</h3>
          <div className="space-y-4">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Šie ir divi galvenie vaļi, uz kuriem turas viss CodeForLatvia projekts. Es izmantoju AI nevis lai aizstātu domāšanu, bet lai paātrinātu procesu no idejas līdz gatavam produktam.
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              <strong className="text-white">Google Gemini 🤖</strong> — Šis ir mans "ideju arhitekts". Es izmantoju Gemini (Google jaunāko un jaudīgāko modeļu saimi), lai savas jēlās idejas "izpucētu" un pārvērstu precīzos, tehniskos uzdevumos jeb promptos.
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              <strong className="text-white">Cursor AI 💻</strong> — Mana galvenā darba vide. Tas ir kā VS Code (populārākais kodu redaktors), bet ar iebūvētu "smadzeni" — AI modeli, kas specializējas tieši programmēšanā. Tas saprot manu kodu, palīdz atrast kļūdas un rakstīt jaunas funkcijas zibensātrumā.
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Kāpēc es kodēju angliski? 🇬🇧 Lai gan AI saprot latviešu valodu arvien labāk, pasaule programmē angliski. AI modeļi ir trenēti uz miljoniem angļu valodas koda paraugu, tāpēc rezultāts ir precīzāks. Man par labu nāca tas, ka 9. klases angļu valodas eksāmenā dabūju 9 — tāpēc valoda man nav šķērslis, bet gan rīks! 🚀
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">🏛️ Digitalizācijas Vīzija: Latvija 2.0</h3>
          <div className="space-y-4">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Es redzu reālu problēmu — Latvijā akūti trūkst darba roku. Mums trūkst cilvēku, kuri sēdēs pie datoriem un manuāli vadīs pavadzīmes vai apstrādās datus. Tas ir laikietilpīgi un nogurdinoši. 📉
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Mans mērķis: Pierādīt, ka AI var pārņemt šos monotonos darbus. Esmu pārbaudījis un zinu — AI spēj apstrādāt pavadzīmes un dokumentus ātrāk un precīzāk par cilvēku.
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Cilvēkiem jānodarbojas ar radošām idejām un lēmumu pieņemšanu. 🧠
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              AI jāuztic rutīna un papīru kalni. 📄➡️🤖
            </p>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Mēs varam palīdzēt Latvijai digitalizēties nevis pēc 10 gadiem, bet jau šodien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
