'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavigationSidebar from '../../../components/NavigationSidebar';
import MobileHeader from '../../../components/MobileHeader';
import CodeBlock from '../../../components/CodeBlock';
import NewsletterSubscribe from '../../../components/NewsletterSubscribe';

export default function TikTokGuide() {
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
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Sākums</Link></li>
              <li className="text-gray-600">&gt;</li>
              <li><Link href="/lessons/tiktok-comments" className="hover:text-cyan-400 transition-colors">TikTok Mācība</Link></li>
              <li className="text-gray-600">&gt;</li>
              <li><span className="text-white">Pilna Pamācība</span></li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8">
            <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              Episode 1 — Pilna tehniskā pamācība
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Es neprotu kodēt.<br />
              <span className="text-cyan-400">Es to uzbūvēju tik un tā.</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Soli pa solim — kā savienot TikTok API ar savu mājaslapu, izmantojot Next.js un Supabase.
            </p>
          </div>

          {/* What We're Building */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Ko mēs būvējam</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Dashboard, kas reāllaikā parāda TikTok komentārus no taviem video. Ar VIP līderbordu aktīvākajiem komentētājiem.
            </p>
            <div className="p-4 bg-gray-800/50 rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-3">Arhitektūra:</div>
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2"><span className="text-pink-400">TikTok API</span><span className="text-gray-500">→</span><span className="text-gray-400">Fetch komentārus</span></div>
                <div className="ml-4 text-gray-500">↓</div>
                <div className="flex items-center gap-2"><span className="text-green-400">Supabase</span><span className="text-gray-500">→</span><span className="text-gray-400">Glabā datubāzē</span></div>
                <div className="ml-4 text-gray-500">↓</div>
                <div className="flex items-center gap-2"><span className="text-blue-400">Next.js</span><span className="text-gray-500">→</span><span className="text-gray-400">Parāda mājaslapā</span></div>
                <div className="ml-4 text-gray-500">↓</div>
                <div className="flex items-center gap-2"><span className="text-purple-400">Real-time</span><span className="text-gray-500">→</span><span className="text-gray-400">Automātiski atjaunina</span></div>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">🛠️ Nepieciešamie rīki</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="font-bold text-white mb-1">Cursor AI</div>
                <div className="text-sm text-gray-400">AI koda redaktors</div>
                <a href="https://cursor.sh" target="_blank" className="text-xs text-cyan-400 hover:underline">cursor.sh</a>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="font-bold text-white mb-1">Supabase</div>
                <div className="text-sm text-gray-400">Bezmaksas datubāze</div>
                <a href="https://supabase.com" target="_blank" className="text-xs text-cyan-400 hover:underline">supabase.com</a>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="font-bold text-white mb-1">Node.js</div>
                <div className="text-sm text-gray-400">JavaScript runtime</div>
                <a href="https://nodejs.org" target="_blank" className="text-xs text-cyan-400 hover:underline">nodejs.org</a>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="font-bold text-white mb-1">TikTok API</div>
                <div className="text-sm text-gray-400">Vai 3rd party serviss</div>
              </div>
            </div>
          </div>

          {/* Step 1 */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <div className="text-cyan-400 text-sm font-medium mb-2">1. SOLIS</div>
            <h2 className="text-2xl font-bold text-white mb-4">Projekta izveide</h2>
            <p className="text-gray-300 text-lg mb-6">Sāc ar jaunu Next.js projektu:</p>
            <CodeBlock language="bash" filename="Terminal" showLineNumbers={false} code="npx create-next-app@latest my-tiktok-dashboard" />
            <p className="text-gray-300 my-4">Izvēlies: TypeScript ✓, Tailwind ✓, App Router ✓</p>
            <CodeBlock language="bash" filename="Terminal" showLineNumbers={false} code="cd my-tiktok-dashboard && npm run dev" />
          </div>

          {/* Step 2 */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <div className="text-cyan-400 text-sm font-medium mb-2">2. SOLIS</div>
            <h2 className="text-2xl font-bold text-white mb-4">Supabase datubāze</h2>
            <p className="text-gray-300 text-lg mb-6">Izveido projektu supabase.com, tad SQL Editor:</p>
            <CodeBlock language="sql" filename="SQL Editor" code={`CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tiktok_comment_id TEXT UNIQUE,
  video_id TEXT,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Real-time ieslēgšana
ALTER TABLE comments REPLICA IDENTITY FULL;`} />
          </div>

          {/* Step 3 */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <div className="text-cyan-400 text-sm font-medium mb-2">3. SOLIS</div>
            <h2 className="text-2xl font-bold text-white mb-4">Savienojam ar Supabase</h2>
            <CodeBlock language="bash" filename="Terminal" showLineNumbers={false} code="npm install @supabase/supabase-js" />
            <p className="text-gray-300 my-4">Izveido <code className="text-cyan-400">lib/supabase.ts</code>:</p>
            <CodeBlock language="typescript" filename="lib/supabase.ts" code={`import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)`} />
          </div>

          {/* Step 4 - Real-time */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <div className="text-cyan-400 text-sm font-medium mb-2">4. SOLIS</div>
            <h2 className="text-2xl font-bold text-white mb-4">Real-time displejs</h2>
            <CodeBlock language="tsx" filename="components/CommentFeed.tsx" code={`'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CommentFeed() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    // Ielādē esošos komentārus
    supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setComments(data || []))

    // Klausies uz jauniem (REAL-TIME!)
    const channel = supabase
      .channel('comments')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => setComments(prev => [payload.new, ...prev])
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="p-4 bg-gray-800 rounded-xl">
          <div className="font-bold text-white">{c.author}</div>
          <div className="text-gray-300">{c.text}</div>
        </div>
      ))}
    </div>
  )
}`} />
          </div>

          {/* Mistake */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <div className="text-red-400 text-sm font-medium mb-2">MANA KĻŪDA 💸</div>
            <h2 className="text-2xl font-bold text-white mb-4">Kā es gandrīz sadedzināju API kredītus</h2>
            <p className="text-gray-300 mb-4">API tika izsaukts katru reizi, kad lapa ielādējās. 100 apmeklētāji = 100 API calls = $$$</p>
            <CodeBlock language="text" filename="Cursor Prompt" showLineNumbers={false} code="Pievieno manuālu refresh pogu ar 10 minūšu cooldown taimeri." />
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mt-4">
              <span className="text-red-400">⚠️</span> <span className="text-red-200/80">AI nedomā par tavu maku. Tu domā.</span>
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">📚 Ko es iemācījos</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><span className="text-cyan-400">→</span><span className="text-gray-300">API ir tilts starp sistēmām</span></div>
              <div className="flex items-start gap-3"><span className="text-cyan-400">→</span><span className="text-gray-300">Real-time nav grūts ar pareiziem rīkiem</span></div>
              <div className="flex items-start gap-3"><span className="text-cyan-400">→</span><span className="text-gray-300">Debugging ir 60% no darba</span></div>
              <div className="flex items-start gap-3"><span className="text-cyan-400">→</span><span className="text-gray-300">AI + tava ideja = neierobežots potenciāls</span></div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-6"><NewsletterSubscribe /></div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Tava kārta 🚀</h2>
            <p className="text-gray-300 mb-6">Ja es to varēju uzbūvēt bez programmēšanas pieredzes — tu arī vari.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/persnola1-sketch/codeforlatvia-web" target="_blank" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-all">GitHub</a>
              <a href="https://tiktok.com/@panduksis" target="_blank" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-medium rounded-xl transition-all">Seko TikTok</a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/lessons/tiktok-comments" className="text-gray-400 hover:text-cyan-400 transition-colors">← Atpakaļ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
