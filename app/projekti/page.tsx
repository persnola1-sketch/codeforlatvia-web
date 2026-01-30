'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';
import MobileHeader from '../components/MobileHeader';

const projects = [
  {
    title: 'TikTok Comment Dashboard',
    description: 'Reāllaika dashboard, kas parāda TikTok komentārus un VIP līderbordu. Mans pirmais "īstais" projekts.',
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
    title: 'API Security Lesson',
    description: 'Interaktīva mācība par API drošību — ar reālu stāstu par manu kļūdu.',
    tech: ['Next.js', 'Documentation'],
    status: 'live',
    link: '/lessons/api-security',
    image: '🔐'
  }
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
                className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Emoji Icon */}
                  <div className="text-6xl">{project.image}</div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusStyles[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
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
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20 text-center"
          >
            <p className="text-gray-300">
              🔮 Vairāk projektu drīzumā... 
              <br />
              <span className="text-gray-500 text-sm">Seko man TikTok lai redzētu progresu reāllaikā!</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
