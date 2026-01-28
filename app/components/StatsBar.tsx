'use client';

import { useState, useEffect } from 'react';

export default function StatsBar() {
  const [linesOfCode, setLinesOfCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinesOfCode = async () => {
      try {
        const response = await fetch('/api/count-loc');
        if (!response.ok) {
          setLinesOfCode(null);
          return;
        }
        const data = await response.json();
        if (typeof data?.linesOfCode === 'number') {
          setLinesOfCode(data.linesOfCode);
        }
      } catch {
        setLinesOfCode(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLinesOfCode();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-200 hover:scale-[1.02] hover:border-white/20">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
          <span className="text-gray-400 text-sm font-mono">Ielādē...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-200 hover:scale-[1.02] hover:border-white/20">
      <div className="flex items-center justify-center gap-3 h-full">
        <span className="text-gray-400 text-sm font-mono">AI ģenerētas koda rindas:</span>
        <span className="text-cyan-400 font-bold text-xl font-mono">
          {linesOfCode !== null ? linesOfCode.toLocaleString('lv-LV') : 'N/A'}
        </span>
      </div>
    </div>
  );
}
