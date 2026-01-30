'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavigationSidebar from '../components/NavigationSidebar';
import MobileHeader from '../components/MobileHeader';

const techStack = [
  {
    category: 'Frontend',
    color: 'cyan',
    items: [
      { name: 'Next.js 14', level: 'learning', description: 'React framework ar App Router' },
      { name: 'TypeScript', level: 'learning', description: 'JavaScript ar tipiem' },
      { name: 'Tailwind CSS', level: 'comfortable', description: 'Utility-first CSS' },
      { name: 'Framer Motion', level: 'learning', description: 'Animāciju bibliotēka' },
    ]
  },
  {
    category: 'Backend & Database',
    color: 'green',
    items: [
      { name: 'Supabase', level: 'learning', description: 'PostgreSQL + Auth + Realtime' },
      { name: 'REST APIs', level: 'comfortable', description: 'Datu apmaiņa starp sistēmām' },
    ]
  },
  {
    category: 'AI Tools',
    color: 'purple',
    items: [
      { name: 'Cursor AI', level: 'comfortable', description: 'AI-powered koda redaktors' },
      { name: 'Claude', level: 'comfortable', description: 'Anthropic AI asistents' },
      { name: 'Google Gemini', level: 'comfortable', description: 'Ideju ģenerēšana un plānošana' },
    ]
  },
  {
    category: 'DevOps',
    color: 'orange',
    items: [
      { name: 'Git & GitHub', level: 'learning', description: 'Versiju kontrole' },
      { name: 'Render', level: 'comfortable', description: 'Deployment platforma' },
      { name: 'Vercel', level: 'learning', description: 'Next.js hosting' },
    ]
  }
];

const levelColors: Record<string, string> = {
  learning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  comfortable: 'bg-green-500/20 text-green-400 border-green-500/30',
  advanced: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const categoryColors: Record<string, string> = {
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20',
  green: 'from-green-500/20 to-green-500/5 border-green-500/20',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20',
};

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
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Sākums</Link></li>
              <li className="text-gray-600">&gt;</li>
              <li><span className="text-white">My Stack</span></li>
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
              🛠️ My Tech Stack
            </h1>
            <p className="text-xl text-gray-400">
              Rīki un tehnoloģijas, ko izmantoju CodeForLatvia projektā. 
              <span className="text-cyan-400"> Visu mācos darot.</span>
            </p>
          </motion.div>

          {/* Stack Grid */}
          <div className="space-y-8">
            {techStack.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className={`bg-gradient-to-br ${categoryColors[category.color]} backdrop-blur-xl rounded-2xl border p-6 md:p-8`}
              >
                <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-900/50 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${levelColors[item.level]}`}>
                          {item.level === 'learning' ? 'mācos' : item.level === 'comfortable' ? 'ērti' : 'advanced'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 p-6 bg-gray-900/40 rounded-2xl border border-white/10 text-center"
          >
            <p className="text-gray-400">
              💡 Es neesmu eksperts nevienā no šīm tehnoloģijām — vēl. 
              <br className="hidden md:block" />
              Bet katru dienu mācos kaut ko jaunu, un tas ir viss, kas vajadzīgs.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
