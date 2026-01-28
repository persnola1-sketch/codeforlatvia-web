'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  {
    id: 1,
    content: (
      <>
        <span className="text-purple-400">const</span>
        <span className="text-gray-300"> response = </span>
        <span className="text-purple-400">await</span>
        <span className="text-gray-300"> </span>
        <span className="text-cyan-400">fetch</span>
        <span className="text-gray-300">(</span>
        <span className="text-amber-300">&apos;/api/ai&apos;</span>
        <span className="text-gray-300">);</span>
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <span className="text-purple-400">const</span>
        <span className="text-gray-300"> </span>
        <span className="text-pink-300">{'{ insights }'}</span>
        <span className="text-gray-300"> = </span>
        <span className="text-purple-400">await</span>
        <span className="text-gray-300"> response.</span>
        <span className="text-cyan-400">json</span>
        <span className="text-gray-300">();</span>
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        <span className="text-purple-400">return</span>
        <span className="text-gray-300"> insights.</span>
        <span className="text-cyan-400">map</span>
        <span className="text-gray-300">(i {'=>'} i.</span>
        <span className="text-amber-200">label</span>
        <span className="text-gray-300">);</span>
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        <span className="text-gray-500">// AI + API = Latvija 2.0</span>
      </>
    ),
  },
];

const STAGGER = 0.42;
const HOLD_MS = 1100;
const CYCLE_MS = Math.ceil(LINES.length * STAGGER * 1000) + HOLD_MS;

function StaticCodePlaceholder() {
  return (
    <div className="relative w-full min-w-0 rounded-xl border border-cyan-500/20 bg-gray-950/90 p-4 font-mono text-xs leading-relaxed shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_24px_rgba(0,255,65,0.12),0_0_48px_rgba(34,211,238,0.06)] backdrop-blur-sm sm:p-5 sm:text-sm md:text-base">
      <div className="absolute right-3 top-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-500/60" />
        <span className="h-2 w-2 rounded-full bg-amber-500/60" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
      </div>
      <pre className="w-full min-w-0 overflow-visible pt-6">
        <code className="block w-full min-w-0 break-words whitespace-pre-wrap">
          <div className="space-y-1">
            {LINES.map((line, i) => (
              <div key={line.id} className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
                <span className="shrink-0 select-none text-gray-600">{String(i + 1).padStart(2)}</span>
                <span className="shrink-0 text-gray-500">|</span>
                <span className="min-w-0 break-words">{line.content}</span>
              </div>
            ))}
            <div className="flex min-w-0 flex-wrap items-center gap-x-1">
              <span className="shrink-0 select-none text-gray-600">{String(LINES.length + 1).padStart(2)}</span>
              <span className="shrink-0 text-gray-500">|</span>
              <span className="inline-block h-4 w-0.5 bg-cyan-400 opacity-70" />
            </div>
          </div>
        </code>
      </pre>
    </div>
  );
}

export default function AnimatedCodeSnippet() {
  const [key, setKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setKey((k) => k + 1), CYCLE_MS);
    return () => clearInterval(t);
  }, [mounted]);

  if (!mounted) return <StaticCodePlaceholder />;

  return (
    <div
      className="relative w-full min-w-0 rounded-xl border border-cyan-500/20 bg-gray-950/90 p-4 font-mono text-xs leading-relaxed shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_24px_rgba(0,255,65,0.12),0_0_48px_rgba(34,211,238,0.06)] backdrop-blur-sm sm:p-5 sm:text-sm md:text-base"
    >
      <div className="absolute right-3 top-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-500/60" />
        <span className="h-2 w-2 rounded-full bg-amber-500/60" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
      </div>
      <pre className="w-full min-w-0 overflow-visible pt-6">
        <code className="block w-full min-w-0 break-words whitespace-pre-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="space-y-1"
              initial={false}
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.01 } },
              }}
            >
              {LINES.map((line, i) => (
                <motion.div
                  key={`${key}-${line.id}`}
                  variants={{
                    hidden: { opacity: 0, y: -4 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.35,
                    delay: i * STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5"
                >
                  <span className="shrink-0 select-none text-gray-600">{String(i + 1).padStart(2)}</span>
                  <span className="shrink-0 text-gray-500">|</span>
                  <span className="min-w-0 break-words">{line.content}</span>
                </motion.div>
              ))}
              <motion.div
                key={`${key}-cursor`}
                className="flex min-w-0 flex-wrap items-center gap-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: LINES.length * STAGGER + 0.1, duration: 0.2 }}
              >
                <span className="shrink-0 select-none text-gray-600">{String(LINES.length + 1).padStart(2)}</span>
                <span className="shrink-0 text-gray-500">|</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block h-4 w-0.5 bg-cyan-400"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </code>
      </pre>
    </div>
  );
}
