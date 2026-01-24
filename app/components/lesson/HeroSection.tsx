export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-orange-950/20 to-yellow-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl">
          {/* Time Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-orange-400 font-semibold">02:00 Nakts</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Mana dārgā kļūda:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Kā es gandrīz pazaudēju naudu
            </span>
            {' '}ar vienu GitHub "commit"
          </h1>

          {/* Opening Story */}
          <div className="space-y-4 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              Ir pulksten <span className="text-orange-400 font-semibold">divi nakti</span>. Tu tikko esi pabeidzis integrēt Next.js lietotnē jaunāko OpenRouter LLM modeli. 
              <span className="text-green-400"> Viss strādā!</span> Tu ar gandarījumu ieraksti{' '}
              <code className="px-2 py-1 rounded bg-gray-800/50 text-cyan-400 text-sm font-mono">git push origin main</code>{' '}
              un dodies gulēt.
            </p>
            <p className="text-red-400 font-semibold">
              Taču pēc 30 sekundēm tavā telefonā pienāk e-pasts:
            </p>
            <div className="bg-red-950/30 border-l-4 border-red-500 pl-4 py-3 rounded-r">
              <p className="text-white font-bold text-xl">
                "URGENT: Your OpenRouter API Key has been leaked on GitHub."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
