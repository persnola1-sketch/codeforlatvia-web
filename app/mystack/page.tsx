'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';
import MobileHeader from '../components/MobileHeader';

const aiTools = [
  {
    name: 'Mia',
    emoji: '🧠',
    description: 'Mans AI asistents. Mia ir kā otra smadzenes — viņa saprot kontekstu, atceras mūsu projektus un strādā 24/7.',
    tags: ['Plānošana', 'Koda izskaidrošana', 'Sass raksts', 'Problēmu risināšana'],
    link: null,
    color: 'purple'
  },
  {
    name: 'Cursor AI',
    emoji: '💻',
    description: 'Mana galvenā darba vide. Tas ir kā VS Code, bet ar iebūvētu "smadzeni" — AI modeli, kas specializējas programmēšanā.',
    tags: ['Kōdošana', 'Autocompletion', 'Kļūdu labošana'],
    link: 'https://cursor.sh',
    color: 'cyan'
  },
  {
    name: 'Google Gemini',
    emoji: '✨',
    description: 'Es izmantoju Gemini, lai savas jēlās idejas "izpucētu" un pārvērstu precīzos, tehniskos uzdevumos.',
    tags: ['Ideju ģenerēšana', 'Prompt ideālēšana', 'Zīna satura'],
    link: 'https://gemini.google.com',
    color: 'blue'
  },
  {
    name: 'Qwen 2.5 Coder',
    emoji: '🔮',
    description: 'Mans lokālais palīgs tehniski sarežģitākām situācijām. Lēts pamatrīkums, kad neinteresē AWS bill.',
    tags: ['Lokāls', 'Bez interneta', 'Privāts', 'Ātrs'],
    link: null,
    color: 'orange',
    note: 'Ar LM Studio es varu palaist Qwen pilnīgi lokāli. Tas nozīmē — bez mākoņiem, bez interneta, pilnīga privātums. Ideāli eksperimentiem un situācijām, kad nevēlos dalīties ar kodu Aŗpus savu datoru.'
  }
];

const techStacks = {
  frontend: [
    { name: 'Next.js', level: 75, experience: 'Pieredzējis' },
    { name: 'React', level: 70, experience: 'Pieredzējis' },
    { name: 'TypeScript', level: 50, experience: 'Vidējs' },
    { name: 'Tailwind CSS', level: 85, experience: 'Pieredzējis' },
    { name: 'Framer Motion', level: 40, experience: 'Vidējs' },
  ],
  languages: [
    { name: 'JavaScript', level: 75, experience: 'Pieredzējis' },
    { name: 'TypeScript', level: 50, experience: 'Vidējs' },
    { name: 'Python', level: 30, experience: 'Vidējs' },
    { name: 'HTML/CSS', level: 90, experience: 'Pieredzējis' },
  ],
  backend: [
    { name: 'Node.js', level: 45, experience: 'Vidējs' },
    { name: 'Supabase', level: 60, experience: 'Vidējs' },
    { name: 'PostgreSQL', level: 35, experience: 'Mācās' },
  ],
  tools: [
    { name: 'VS Code', level: 85, experience: 'Pieredzējis' },
    { name: 'Cursor AI', level: 90, experience: 'Pieredzējis' },
    { name: 'Git', level: 50, experience: 'Vidējs' },
    { name: 'LM Studio', level: 60, experience: 'Vidējs' },
  ]
};

const colorClasses: Record<string, string> = {
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/50',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/50',
  blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/30 hover:border-orange-500/50',
};

function ProgressBar({ level, color = 'cyan' }: { level: number; color?: string }) {
  const barColor = level >= 70 ? 'bg-green-500' : level >= 40 ? 'bg-cyan-500' : 'bg-yellow-500';
  return (
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full ${barColor} rounded-full`}
      />
    </div>
  );
}

export default function MyStackPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <MobileHeader 
        isOpen={isMobileMenuOpen} 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      <NavigationSidebar 
        isMobileOpen={isMobileMenuOpen} 
        onMobileClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="lg:pl-64 pt-16 lg:pt-6 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Sākums</Link></li>
              <li className="text-gray-600">&gt;</li>
              <li><span className="text-white">Mana Rīku Kaste</span></li>
            </ol>
          </nav>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🧰 Mana Rīku Kaste
            </h1>
            <p className="text-xl text-gray-400">
              Visi rīki un tehnoloģijas, ko izmantoju AI nevis lai aizstātu domāšanu, bet lai paātrinātu procesu no idejas līdz gatavam produktam.
            </p>
          </motion.div>

          {/* AI Tools Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🤖</span> AI Rīki
            </h2>
            <div className="space-y-4">
              {aiTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${colorClasses[tool.color]} backdrop-blur-xl rounded-2xl border p-6 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{tool.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                        {tool.link && (
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <p className="text-gray-300 mb-3">{tool.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {tool.note && (
                        <p className="mt-3 text-sm text-gray-400 italic">{tool.note}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why English */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 p-6 bg-gray-900/40 rounded-2xl border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-2">🌍 Kāpēc es kodēju angliski?</h3>
            <p className="text-gray-400">
              Lai gan AI saprot latviešu valodu arvien labāk, pasaule programmē angliski. AI modeļi ir trenēti uz miljoniem angļu valodas koda paraugu, tāpēc rezultāts ir precīzāks. Man par labu nāca tas, ka 9. klases angļu valodas eksāmenā dabūju 9 — tāpēc valoda man nav šķērslis, bet gan rīks!
            </p>
          </motion.div>

          {/* Tech Stacks Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚡</span> Tehnoloģiju Steks
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>{'</>'}</span> Frontend
                </h3>
                <div className="space-y-4">
                  {techStacks.frontend.map(tech => (
                    <div key={tech.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{tech.name}</span>
                        <span className="text-gray-500">{tech.experience}</span>
                      </div>
                      <ProgressBar level={tech.level} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>🗄️</span> Backend
                </h3>
                <div className="space-y-4">
                  {techStacks.backend.map(tech => (
                    <div key={tech.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{tech.name}</span>
                        <span className="text-gray-500">{tech.experience}</span>
                      </div>
                      <ProgressBar level={tech.level} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>📝</span> Valodas
                </h3>
                <div className="space-y-4">
                  {techStacks.languages.map(tech => (
                    <div key={tech.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{tech.name}</span>
                        <span className="text-gray-500">{tech.experience}</span>
                      </div>
                      <ProgressBar level={tech.level} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>🛠️</span> Rīki
                </h3>
                <div className="space-y-4">
                  {techStacks.tools.map(tech => (
                    <div key={tech.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{tech.name}</span>
                        <span className="text-gray-500">{tech.experience}</span>
                      </div>
                      <ProgressBar level={tech.level} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-6 bg-gray-900/40 rounded-2xl border border-white/10 text-center"
          >
            <p className="text-gray-400">
              💡 Es neesmu eksperts nevienā no šīm tehnoloģijām — vēl.
              <br />
              Bet katru dienu mācos kaut ko jaunu, un tas ir viss, kas vajadzīgs.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
