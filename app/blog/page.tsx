'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Calendar, Clock, User, BookOpen } from 'lucide-react';
import NavigationSidebar from '../components/NavigationSidebar';
import MobileHeader from '../components/MobileHeader';

const blogPosts = [
  {
    slug: 'ka-izvairities-no-ai-krapaniekiem-latvija',
    title: 'Kā izvairīties no AI krāpniekiem Latvijā: 7 brīdinājuma signāli',
    description: 'Iemācies atpazīt apšaubāmus AI pakalpojumu sniedzējus Latvijā. 7 brīdinājuma signāli, kas palīdzēs izvairīties no sliktiem darījumiem.',
    date: '2026-01-31',
    readTime: '8 min',
    author: 'CodeForLatvia komanda',
    tags: ['AI', 'Drošība', 'Latvija'],
    featured: true,
  },
];

export default function BlogPage() {
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
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Blogs</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI & Digitalizācijas Blogs
            </h1>
            
            <p className="text-gray-300 text-lg max-w-2xl">
              Praktiski padomi, tirgus analīze un ieskati par AI risinājumiem Latvijā.
              Bez marketinga muļķībām — tikai lietderīga informācija.
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article
                  className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                    post.featured
                      ? 'bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-cyan-500/30 hover:border-cyan-500/60'
                      : 'bg-gray-900/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  {post.featured && (
                    <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full mb-4">
                      JAUNĀKAIS
                    </span>
                  )}
                  
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  
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
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 text-cyan-400 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Lasīt vairāk</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </motion.div>

          {/* Empty State / Coming Soon */}
          {blogPosts.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 p-6 rounded-2xl bg-gray-900/30 border border-white/5 text-center"
            >
              <p className="text-gray-500">
                🐼 Vairāk rakstu drīzumā! Seko mums{' '}
                <a 
                  href="https://tiktok.com/@panduksis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  TikTok
                </a>
                {' '}lai uzzini pirmais.
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
