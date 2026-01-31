'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Share2, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import NavigationSidebar from '../../components/NavigationSidebar';
import MobileHeader from '../../components/MobileHeader';

// For now, we have one blog post. In the future, this could fetch from a CMS or markdown files.
const blogContent = {
  'ka-izvairities-no-ai-krapaniekiem-latvija': {
    title: 'Kā izvairīties no AI krāpniekiem Latvijā: 7 brīdinājuma signāli',
    date: '2026-01-31',
    readTime: '8 min',
    author: 'CodeForLatvia komanda',
  },
};

const warningSignals = [
  {
    number: 1,
    title: 'Nav publiski pieejamu cenu',
    problem: 'Uzņēmums sola "individuālu piedāvājumu" un atsakās nosaukt pat aptuvenu cenu diapazonu.',
    why: 'Godīgi pakalpojumu sniedzēji var nosaukt sākuma cenas. Slēptas cenas = cenas "pielāgotas" klientam, nezināšana par izmaksām, vai mēģinājums "ieķert" pirms salīdzināšanas.',
    action: 'Prasiet vismaz cenu diapazonu pirmajā sarunā. Ja atsakās — meklējiet citur.',
  },
  {
    number: 2,
    title: 'Nav atrodamu atsauksmju vai portfolio',
    problem: 'Mājaslapā nav neviena klienta atsauksme vai iepriekš paveikta projekta piemēra.',
    why: 'Ja uzņēmums darbojas 6+ mēnešus un nav ko parādīt — tas nav labs signāls. Latvijā esam atraduši uzņēmumus ar nulles publiskām atsauksmēm.',
    action: 'Meklējiet "[uzņēmums] + reviews" vai prasiet tiešas kontaktpersonas no iepriekšējiem klientiem.',
  },
  {
    number: 3,
    title: 'Pārāk skaisti solījumi',
    problem: '"Mēs automatizēsim 90% jūsu biznesa!" vai "ROI garantēts 30 dienās!"',
    why: 'AI prasa laiku (2-8 nedēļas), kvalitātīvus datus un iterāciju. Neviens godīgs speciālists nesola 90% automatizāciju nezinot procesus.',
    action: 'Prasiet konkrētus piemērus: "Klientam X samazinājām Y procesu par Z%."',
  },
  {
    number: 4,
    title: 'Negatīvas atsauksmes un apsūdzības krāpšanā',
    problem: 'Meklējot uzņēmumu, parādās Reddit ieraksti par "scam" vai Glassdoor brīdinājumi.',
    why: 'Latvijā esam atraduši uzņēmumus ar publiskām apsūdzībām krāpšanā un bijušo darbinieku brīdinājumiem.',
    action: 'Vienmēr meklējiet "[uzņēmums] scam" un pārbaudiet Glassdoor.',
  },
  {
    number: 5,
    title: 'Ārvalstu uzņēmumi bez lokālas atbildības',
    problem: 'Reģistrēts citā valstī, nav juridiskas pārstāvniecības Latvijā.',
    why: 'Grūtāk piedzīt garantijas, komunikācija sarežģīta, ja kaut kas noiet greizi — nav kur iet.',
    action: 'Dodiet priekšroku lokāliem uzņēmumiem ar skaidru atbildības personu Latvijā.',
  },
  {
    number: 6,
    title: '"Mēs darām visu" bez specializācijas',
    problem: 'Uzņēmums apgalvo, ka var visu — čatbotus, prognozes, datubāzes, aplikācijas.',
    why: 'Kvalitatīva AI implementācija prasa specializāciju. "Dara visu" = neprot neko īsti labi.',
    action: 'Prasiet specifiskus piemērus tieši jūsu jomā.',
  },
  {
    number: 7,
    title: 'Nav skaidra procesa vai dokumentācijas',
    problem: 'Pēc projekta nesaņemat dokumentāciju, avota kodu vai skaidru nodošanu.',
    why: 'Vendor lock-in — ja viņi pazūd, jūs paliekat bez iespējas turpināt. Bieži apzināta stratēģija.',
    action: 'Līgumā nosakiet: pilns avota kods, tehniskā dokumentācija, apmācības sesijas.',
  },
];

const comparison = [
  { problem: 'Slēptas cenas', solution: '✅ Publiskas cenas mūsu lapā' },
  { problem: 'Nav atsauksmju', solution: '✅ Reālu klientu pieredze (veidojam!)' },
  { problem: 'Ārvalstu uzņēmumi', solution: '✅ 100% Latvijas komanda' },
  { problem: 'Nav dokumentācijas', solution: '✅ Pilna nodošana, jūs saņemat visu' },
  { problem: 'Nav atbalsta pēc projekta', solution: '✅ Iekļauts atbalsts visās paketēs' },
];

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const post = blogContent[params.slug as keyof typeof blogContent];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Raksts nav atrasts</h1>
          <Link href="/blog" className="text-cyan-400 hover:underline">
            ← Atpakaļ uz blogu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Mobile Header */}
      <MobileHeader 
        isOpen={isMobileMenuOpen} 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {/* Navigation Sidebar */}
      <NavigationSidebar 
        isMobileOpen={isMobileMenuOpen} 
        onMobileClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-6 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Atpakaļ uz blogu
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('lv-LV', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Intro */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 mb-8">
              <p className="text-gray-300 m-0">
                Mākslīgā intelekta (AI) risinājumi var ievērojami uzlabot jūsu biznesa efektivitāti — 
                automatizēt klientu apkalpošanu, paātrināt dokumentu apstrādi, samazināt manuālo darbu. 
                Tomēr kopā ar likumīgiem pakalpojumu sniedzējiem tirgū darbojas arī negodīgi uzņēmumi, 
                kas izmanto AI hype, lai pārdotu tukšus solījumus.
              </p>
            </div>

            <p className="text-gray-300">
              Šajā rakstā dalāmies ar <strong className="text-white">7 brīdinājuma signāliem</strong>, 
              kas palīdzēs atpazīt apšaubāmus pakalpojumu sniedzējus.
            </p>

            {/* Warning Signals */}
            <div className="space-y-6 my-8">
              {warningSignals.map((signal) => (
                <div
                  key={signal.number}
                  className="p-6 rounded-2xl bg-gray-900/50 border border-red-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {signal.number}. {signal.title} 🚩
                      </h3>
                      <p className="text-gray-400 mb-3">
                        <strong className="text-gray-300">Problēma:</strong> {signal.problem}
                      </p>
                      <p className="text-gray-400 mb-3">
                        <strong className="text-gray-300">Kāpēc tas ir aizdomīgi:</strong> {signal.why}
                      </p>
                      <p className="text-green-400">
                        <strong>Ko darīt:</strong> {signal.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CodeForLatvia Section */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-cyan-500/30 my-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white m-0">Kā CodeForLatvia strādā citādi</h2>
              </div>
              
              <p className="text-gray-300 mb-6">
                Mēs dibinājām CodeForLatvia, jo paši redzējām šīs problēmas tirgū. Lūk, kas mūs atšķir:
              </p>
              
              <div className="space-y-3">
                {comparison.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-400 line-through">{item.problem}</span>
                    <span className="text-gray-300">→</span>
                    <span className="text-white">{item.solution}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-cyan-400 mt-6 mb-0">
                <strong>Papildus:</strong> Mēs palīdzam pieteikties LIAA digitalizācijas grantiem — 
                līdz 50% līdzfinansējums!
              </p>
            </div>

            {/* Conclusion */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Nobeigumā</h2>
            
            <p className="text-gray-300">
              AI risinājumi var būt fantastisks ieguvums jūsu biznesam. Bet izvēlieties gudri:
            </p>
            
            <ol className="text-gray-300 space-y-2">
              <li>✅ Prasiet skaidras cenas</li>
              <li>✅ Pārbaudiet atsauksmes</li>
              <li>✅ Izvairieties no pārāk skaistiem solījumiem</li>
              <li>✅ Meklējiet lokālu, atbildīgu partneri</li>
              <li>✅ Prasiet dokumentāciju un avota kodu</li>
            </ol>

            {/* CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-gray-900/50 border border-white/10 text-center">
              <p className="text-gray-300 mb-4">
                Vēlaties apspriest jūsu biznesa automatizācijas iespējas? Bez saistībām, bez agresīvas pārdošanas.
              </p>
              <a
                href="mailto:mia@codeforlatvia.lv?subject=Konsultācija%20par%20AI%20automatizāciju"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900 font-semibold rounded-xl transition-all duration-200"
              >
                Sazināties ar mums
              </a>
            </div>

            {/* Related Resources */}
            <div className="mt-8 p-4 rounded-xl bg-gray-900/30 border border-white/5">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Saistītie resursi:</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <a 
                  href="https://www.liaa.gov.lv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  LIAA Digitalizācijas granti →
                </a>
                <Link href="/pakalpojumi" className="text-cyan-400 hover:underline">
                  Mūsu pakalpojumi →
                </Link>
              </div>
            </div>

            {/* Footer */}
            <p className="text-gray-500 text-sm mt-8 text-center">
              © 2026 CodeForLatvia. Šo rakstu var brīvi dalīties, norādot avotu.
            </p>
          </motion.article>

        </div>
      </div>
    </div>
  );
}
