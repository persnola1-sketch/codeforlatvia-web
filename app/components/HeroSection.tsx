'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  
  const codeLines = [
    'const latvija = await import("nākotne");',
    'const ai = new MākslīgaisIntelekts();',
    'const projekts = ai.būvē(idejas);',
    '',
    'while (true) {',
    '  await mācīties();',
    '  await veidot();',
    '  await dalīties();',
    '}',
  ];

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      // Reset after a pause
      const timeout = setTimeout(() => {
        setDisplayedCode('');
        setCurrentLine(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const line = codeLines[currentLine];
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex <= line.length) {
        setDisplayedCode(prev => {
          const lines = prev.split('\n');
          lines[currentLine] = line.slice(0, charIndex);
          return lines.join('\n');
        });
        charIndex++;
        setTimeout(typeChar, 30 + Math.random() * 30);
      } else {
        setDisplayedCode(prev => prev + '\n');
        setTimeout(() => setCurrentLine(prev => prev + 1), 200);
      }
    };

    typeChar();
  }, [currentLine]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
      
      <div className="relative z-10 text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-white">Code </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">For</span>
          <span className="text-white"> Latvia</span>
        </h1>

        {/* Terminal Window */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gray-950 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-400 ml-2 font-mono">~/codeforlatvia.lv</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 font-mono text-sm text-left h-48 overflow-hidden">
              <pre className="text-green-400 whitespace-pre-wrap">
                {displayedCode.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-gray-600 w-6 select-none">{i + 1}</span>
                    <span>{line}</span>
                    {i === currentLine && <span className="animate-pulse">▋</span>}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Mācies programmēšanu un mākslīgo intelektu ar praktisku pieeju. Kopā veidosim Latvijas digitālo nākotni — projekts par projektu, kļūda par kļūdai.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/lessons/tiktok-comments"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-gray-900 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            Sākt Mācīties
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="https://tiktok.com/@panduksis"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-purple-500/50 hover:bg-purple-500/10 text-purple-400 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            Skatīt TikTok
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
