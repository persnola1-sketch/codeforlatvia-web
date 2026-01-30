'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  code, 
  language = 'typescript', 
  filename,
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render syntax highlighter on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {filename && (
            <span className="text-xs text-gray-400 ml-2 font-mono">{filename}</span>
          )}
        </div>
        
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-all duration-200"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Nokopēts!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Kopēt</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        {mounted ? (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
            }}
            lineNumberStyle={{
              color: '#4a5568',
              paddingRight: '1rem',
              minWidth: '2.5rem',
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        ) : (
          <pre className="p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
            {code.trim()}
          </pre>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
