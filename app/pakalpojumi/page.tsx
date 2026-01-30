'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Bot, 
  Zap, 
  FileText, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Clock, 
  Euro,
  MessageSquare,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import NavigationSidebar from '../components/NavigationSidebar';
import MobileHeader from '../components/MobileHeader';
import { useState } from 'react';

const services = [
  {
    icon: Bot,
    title: 'AI Čatboti',
    description: 'Automatizēti klientu apkalpošanas risinājumi, kas strādā 24/7. Atbild uz jautājumiem, pieņem pasūtījumus, rezervē laikus.',
    features: ['Latviesu valodas atbalsts', 'Integrācija ar jūsu sistēmām', 'Mācās no katra saruna'],
    price: 'no €200',
  },
  {
    icon: FileText,
    title: 'Dokumentu Automatizācija',
    description: 'Automātiska rēķinu izrakstīšana, līgumu ģenerēšana, atskaites. Aizmirstiet par manuālo darbu.',
    features: ['E-rēķini (EDS saderīgi)', 'Automātiskas atgādinājumi', 'Excel/PDF eksports'],
    price: 'no €300',
  },
  {
    icon: Zap,
    title: 'Biznesa Procesu Automatizācija',
    description: 'Savienojam jūsu rīkus un automatizējam ikdienas uzdevumus. Vairāk laika tam, kas svarīgs.',
    features: ['CRM integrācijas', 'E-pasta automatizācija', 'Datu sinhronizācija'],
    price: 'no €500',
  },
  {
    icon: TrendingUp,
    title: 'AI Datu Analīze',
    description: 'Pārvērtiet datus lēmumos. AI palīdz atrast tendences un iespējas jūsu biznesā.',
    features: ['Pārdošanas prognozes', 'Klientu analīze', 'Automātiski pārskati'],
    price: 'no €800',
  },
];

const packages = [
  {
    name: 'Starts',
    price: '€200 - €500',
    description: 'Viens automatizācijas projekts',
    features: [
      'Bezmaksas konsultācija',
      'Projekta izstrāde līdz 2 nedēļām',
      '1 mēneša atbalsts iekļauts',
      'Apmācība lietošanā',
    ],
    highlight: false,
    cta: 'Sākt Sarunu',
  },
  {
    name: 'Bizness',
    price: '€500 - €2,000',
    description: 'Pilna sistēmu integrācija',
    features: [
      'Viss no "Starts" paketes',
      'Vairāku sistēmu savienošana',
      '3 mēnešu atbalsts iekļauts',
      'Prioritāra palīdzība',
      'LIAA granta konsultācija',
    ],
    highlight: true,
    cta: 'Populārākā Izvēle',
  },
  {
    name: 'Enterprise',
    price: '€2,000+',
    description: 'Kompleksi AI risinājumi',
    features: [
      'Individuāla pieeja',
      'Dedikēts projektu vadītājs',
      'Neierobežots atbalsts',
      'SLA garantijas',
      'Pilna LIAA granta pieteikuma palīdzība',
    ],
    highlight: false,
    cta: 'Sazināties',
  },
];

const trustSignals = [
  { icon: Shield, text: '100% Latvijā bāzēts uzņēmums' },
  { icon: Euro, text: 'Caurspīdīgas cenas — bez slēptām izmaksām' },
  { icon: Clock, text: 'Ātra izstrāde — ne mēnešiem, bet nedēļām' },
  { icon: Users, text: 'Atbalsts arī pēc projekta nodošanas' },
];

export default function ServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-green-500/10" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-medium">AI & Automatizācija</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Digitalizējiet Savu Biznesu
              </h1>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-6">
                Automatizējiet ikdienas uzdevumus, ietaupiet laiku un naudu. 
                Mūsdienīgi AI risinājumi Latvijas uzņēmumiem — bez sarežģītības, ar caurspīdīgām cenām.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#paketes"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  Skatīt Cenas
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:aleksis@codeforlatvia.lv?subject=AI%20Automatizācija%20-%20Konsultācija"
                  className="px-6 py-3 border border-white/20 hover:bg-white/5 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Bezmaksas Konsultācija
                </a>
              </div>
            </div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {trustSignals.map((signal, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/50 border border-white/10"
              >
                <signal.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">{signal.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Ko Mēs Piedāvājam</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gray-900/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <service.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                        <span className="text-green-400 font-semibold">{service.price}</span>
                      </div>
                      <p className="text-gray-400 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
            id="paketes"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Cenas & Paketes</h2>
            <p className="text-gray-400 mb-6">Caurspīdīgas cenas — zini, ko maksā, pirms sāc.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                    pkg.highlight
                      ? 'bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-cyan-500/50'
                      : 'bg-gray-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-green-500 text-gray-900 text-xs font-bold rounded-full">
                      POPULĀRĀKĀ
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="text-3xl font-bold text-white mb-6">
                    {pkg.price}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="mailto:aleksis@codeforlatvia.lv?subject=Pakete%20-%20${pkg.name}"
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      pkg.highlight
                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900'
                        : 'border border-white/20 hover:bg-white/5 text-white'
                    }`}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* LIAA Grant Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 mb-12"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/20">
                <Euro className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">💰 LIAA Digitalizācijas Grants</h3>
                <p className="text-gray-300 mb-3">
                  Vai zinājāt? Latvijas mazajiem uzņēmumiem pieejams <strong className="text-orange-400">līdz 100% finansējums</strong> digitalizācijas projektiem līdz €5,000. 
                  Mēs palīdzēsim sagatavot pieteikumu!
                </p>
                <p className="text-sm text-gray-400 mb-3">
                  Kopā pieejams €37.5M+ no LIAA. Jūsu izmaksas var būt €0.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.liaa.gov.lv/lv/programmas/atbalsts-digitalo-inovaciju-centru-un-eiropas-digitalo-inovaciju-centru-darbibai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-orange-400 hover:text-orange-300 underline"
                  >
                    → LIAA Digitalizācijas programma
                  </a>
                  <a 
                    href="https://digitallatvia.lv/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-orange-400 hover:text-orange-300 underline"
                  >
                    → Digital Latvia
                  </a>
                  <a 
                    href="https://www.liaa.gov.lv/lv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-orange-400 hover:text-orange-300 underline"
                  >
                    → LIAA.gov.lv
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Kāpēc Izvēlēties Mūs?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">🇱🇻 100% Latvijas Uzņēmums</h3>
                <p className="text-gray-400">
                  Neesam ārvalstu aģentūra. Runājam latviski, saprotam vietējo tirgu, 
                  zinām EDS prasības un Latvijas biznesa specifiku.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">💡 Bez Korporatīvās Birokrātijas</h3>
                <p className="text-gray-400">
                  Ātra komunikācija, elastīga pieeja. Nav jāgaida nedēļām uz atbildi — 
                  strādājam kā partneri, ne kā bezpersonisks pakalpojumu sniedzējs.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">📊 Caurspīdīgas Cenas</h3>
                <p className="text-gray-400">
                  Citi slēpj cenas un pārsteidz ar rēķiniem. Mēs sakām skaidri — 
                  cik maksā, cik ilgi būvēsim, ko dabūsi.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">🤝 Atbalsts Pēc Projekta</h3>
                <p className="text-gray-400">
                  Mēs nepazūdam pēc projekta nodošanas. Atbalsts, apmācības un uzlabojumi — 
                  esam šeit ilgtermiņā.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Gatavs Sākt?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Bezmaksas 30 minūšu konsultācija — apspriedīsim jūsu biznesa vajadzības 
              un kā automatizācija var palīdzēt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:aleksis@codeforlatvia.lv?subject=Bezmaksas%20Konsultācija"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Pieteikties Konsultācijai
              </a>
              <a
                href="https://tiktok.com/@panduksis"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Sekot TikTok
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
