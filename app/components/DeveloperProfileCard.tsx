'use client';

export default function DeveloperProfileCard() {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 h-full">
      <div className="flex items-center gap-6 h-full">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
            CF
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-bold text-white">Alex :D</h3>
            <span className="px-2 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
              Mentor
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/persnola1-sketch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <span className="text-lg">🔗</span>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.tiktok.com/@panduksis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <span className="text-lg">🎵</span>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
