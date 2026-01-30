'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';
import MobileHeader from '../components/MobileHeader';

const projects = [
  {
    title: 'MMAMM — Loģistikas Automatizācija',
    description: 'Automatizēta sistēma manam Nīderlandes priekšniekam, kas aprēķina attālumu un laiku no biroja līdz fermām. Šis projekts parāda, kā AI var automatizēt biznesa procesus Latvijā.',
    tech: ['Python', 'Google Maps API', 'Automatizācija'],
    status: 'live',
    github: 'https://github.com/persnola1-sketch/mmamm',
    image: '🚚',
    highlight: true,
    useCase: 'Latvijas biznesa automatizācija'
  },
  {
    title: 'TikTok Comment Dashboard',
    description: 'Reāllaika dashboard, kas parāda TikTok komentārus un VIP līderbordu. Mans pirmais "īstais" full-stack projekts.',
    tech: ['Next.js', 'Supabase', 'TikTok API', 'Framer Motion'],
    status: 'live',
    link: '/lessons/tiktok-comments',
    github: 'https://github.com/persnola1-sketch/codeforlatvia-web',
    image: '🎯'
  },
  {
    title: 'CodeForLatvia Portfolio',
    description: 'Šī mājaslapa! Personīgā portfolio un mācību platforma latviešu valodā.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
    status: 'live',
    link: '/',
    github: 'https://github.com/persnola1-sketch/codeforlatvia-web',
    image: '🇱🇻'
  },
  {
    title: 'KeyDrop Case Simulator',
    description: 'Mans pirmais projekts! Case opening simulator. Šeit viss sākās — pirmie soļi kodēšanā.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    status: 'live',
    github: 'https://github.com/persnola1-sketch/KeyDrop',
    image: '🎮',
    isFirst: true
  },
  {
    title: 'Skropstas-Laura',
    description: 'Projekts kopā ar draugu Laura. Viens no agrīnajiem eksperimentiem.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    status: 'live',
    github: 'https://github.com/persnola1-sketch/Skropstas-Laura',
    image: '👥'
  },
  {
    title: 'Mia-OS',
    description: 'Eksperimentāls projekts — mēģinājums izveidot AI asistenta "operētājsistēmu".',
    tech: ['AI', 'Experimental'],
    status: 'in-progress',
    github: 'https://github.com/persnola1-sketch/Mia-OS',
    image: '🤖'
  },
  {
    title: 'AI Journey Companion',
    description: 'Dokumentēju savu AI mācīšanās ceļojumu. Piezīmes, eksperimenti, atklājumi.',
    tech: ['Documentation', 'AI Learning'],
    status: 'in-progress',
    github: 'https://github.com/persnola1-sketch/ai-journey-companion',
    image: '📚'
  },
];

const statusStyles: Record<string, string> = {
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  'in-progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  planned: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const statusLabels: Record<string, string> = {
  live: 'Live',
  'in-progress': 'Izstrādē',
  planned: 'Plānots',
};

export default function ProjektiPage() {
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
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Sākums</Link></li>
              <li className="text-gray-600">&gt;</li>
              <li><span className="text-white">Projekti</span></li>
            </ol>
          </nav>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🚀 Mani Projekti
            </h1>
            <p className="text-xl text-gray-400">
              Viss, ko esmu uzbūvējis savā kodēšanas ceļojumā.
              <span className="text-cyan-400"> No idejas līdz deploymentam.</span>
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`bg-gray-900/40 backdrop-blur-xl rounded-2xl border p-6 md:p-8 transition-all ${
                  project.highlight 
                    ? 'border-cyan-500/30 hover:border-cyan-500/50 ring-1 ring-cyan-500/20' 
                    : project.isFirst 
                      ? 'border-purple-500/30 hover:border-purple-500/50'
                      : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Emoji Icon */}
                  <div className="text-5xl md:text-6xl">{project.image}</div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusStyles[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                      {project.isFirst && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          🌟 Pirmais projekts!
                        </span>
                      )}
                      {project.highlight && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          🇱🇻 Latvijas biznesam
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    {project.useCase && (
                      <p className="text-sm text-cyan-400/80 mb-4 italic">
                        💡 {project.useCase}
                      </p>
                    )}
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-4">
                      {project.link && (
                        <Link 
                          href={project.link}
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                        >
                          Skatīt →
                        </Link>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20 text-center"
          >
            <p className="text-gray-300">
              🔮 Vairāk projektu drīzumā...
              <br />
              <span className="text-gray-500 text-sm">Seko man TikTok lai redzētu progresu reāllaikā!</span>
            </p>
            <a 
              href="https://tiktok.com/@panduksis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl transition-colors"
            >
              @panduksis
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
