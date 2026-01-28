'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, Shield, BarChart3, ArrowRight } from 'lucide-react';
import TechnologyBadge from './TechnologyBadge';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  technologies: string[];
  thumbnail: 'tiktok' | 'api' | 'dashboard';
  comingSoon?: boolean;
}

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'tiktok-analyzer',
    title: 'TikTok komentāru analizators',
    description:
      'TikTok komentāru analīze reāllaikā ar AI sentimenta analīzi un tendenču noteikšanu',
    href: '/lessons/tiktok-comments',
    buttonLabel: 'Skatīt projektu',
    technologies: ['Next.js', 'TikTok API', 'Google Gemini', 'Tailwind'],
    thumbnail: 'tiktok',
  },
  {
    id: 'api-security',
    title: 'API drošības nodarbība',
    description:
      'Iemācies aizsargāt API atslēgas un īstenot drošas autentifikācijas prakses',
    href: '/lessons/api-security',
    buttonLabel: 'Sākt mācīties',
    technologies: ['Next.js', 'Node.js', 'Drošības prakses'],
    thumbnail: 'api',
  },
  {
    id: 'tiktok-dashboard',
    title: 'TikTok analītikas panelis',
    description:
      'Drīzumā — paplašināts analītikas panelis satura veidotājiem',
    href: '#',
    buttonLabel: 'Drīzumā',
    technologies: ['React', 'D3.js', 'Reāllaika dati'],
    thumbnail: 'dashboard',
    comingSoon: true,
  },
];

const thumbnailConfig = {
  tiktok: {
    gradient: 'from-rose-500/30 via-fuchsia-500/20 to-cyan-500/30',
    icon: MessageSquare,
    label: 'TikTok',
    buttonClasses: {
      base: 'border-rose-400/60 text-rose-300',
      hover: 'hover:bg-rose-400 hover:text-rose-950 hover:border-rose-400',
      focus: 'focus:ring-rose-400',
    },
  },
  api: {
    gradient: 'from-amber-500/30 via-orange-500/20 to-red-500/30',
    icon: Shield,
    label: 'API',
    buttonClasses: {
      base: 'border-amber-400/60 text-amber-300',
      hover: 'hover:bg-amber-400 hover:text-amber-950 hover:border-amber-400',
      focus: 'focus:ring-amber-400',
    },
  },
  dashboard: {
    gradient: 'from-emerald-500/30 via-teal-500/20 to-blue-500/30',
    icon: BarChart3,
    label: 'Drīzumā',
    buttonClasses: {
      base: 'border-emerald-400/60 text-emerald-300',
      hover: 'hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400',
      focus: 'focus:ring-emerald-400',
    },
  },
};

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const config = thumbnailConfig[project.thumbnail];
  const Icon = config.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      className="group flex flex-col bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden
                 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-cyan-500/5"
    >
      {/* Thumbnail - 16:9 */}
      <motion.div
        className={`relative aspect-video bg-gradient-to-br ${config.gradient} flex items-center justify-center overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gray-950/40 group-hover:bg-gray-950/20 transition-colors duration-300" />
        <Icon className="relative w-16 h-16 md:w-20 md:h-20 text-white/60 group-hover:text-white/80 group-hover:scale-110 transition-all duration-300" />
        {project.comingSoon && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30">
            Izstrādē
          </span>
        )}
      </motion.div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-200/90 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <TechnologyBadge key={tech} technology={tech} />
          ))}
        </div>

        {/* Learn More / CTA */}
        <div className="mt-auto flex justify-end">
          {project.comingSoon ? (
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-gray-700/50 text-gray-400 border border-gray-600/50 cursor-not-allowed text-sm font-bold"
            >
              {project.buttonLabel}
            </span>
          ) : (
            <Link
              href={project.href}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold
                         border-2 bg-transparent
                         transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
                         group/button
                         ${config.buttonClasses.base}
                         ${config.buttonClasses.hover}
                         ${config.buttonClasses.focus}`}
            >
              {project.buttonLabel}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

interface FeaturedProjectsProps {
  /** When true, used on /projects page: no top border, reduced top margin */
  embedded?: boolean;
}

export default function FeaturedProjects({ embedded = false }: FeaturedProjectsProps) {
  return (
    <section
      id="featured-projects"
      className={`pb-8 ${embedded ? 'mt-8 pt-0' : 'mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/5'}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          Iezīmētie projekti
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl">
          Eksperimenti un nodarbības, ar kurām es dalījos — no TikTok analīzes līdz API drošībai.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project, index) => (
            <div key={project.id} className="w-full">
              <div className="w-full lg:max-w-[320px]">
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          ))}
        </div>

        {!embedded && (
          <div className="mt-10 md:mt-14 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-base md:text-lg
                         transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg px-2 py-1"
            >
              Skatīt visus projektus
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
