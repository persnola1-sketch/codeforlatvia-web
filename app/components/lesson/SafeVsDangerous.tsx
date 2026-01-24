export default function SafeVsDangerous() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Next.js specifika: Lamatas ar NEXT_PUBLIC_
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Safe Side */}
        <div className="bg-green-950/30 border-2 border-green-500/50 rounded-xl p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 opacity-10">
            <svg className="w-24 h-24 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-green-400">Drošs</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4 border border-green-500/30">
                <code className="text-green-300 font-mono text-sm break-all">
                  process.env.OPENROUTER_API_KEY
                </code>
              </div>

              <div className="space-y-2 text-gray-300">
                <p className="font-semibold text-green-300">Kāpēc tas ir drošs?</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Tas paliek servera pusē</li>
                  <li>Nekad netiek nosūtīts uz lietotāja pārlūkprogrammu</li>
                  <li>Nav pieejams klienta JavaScript kodā</li>
                  <li>Nav redzams pārlūkprogrammas DevTools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dangerous Side */}
        <div className="bg-red-950/30 border-2 border-red-500/50 rounded-xl p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 opacity-10">
            <svg className="w-24 h-24 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-red-400">Bīstams</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4 border border-red-500/30">
                <code className="text-red-300 font-mono text-sm break-all">
                  process.env.NEXT_PUBLIC_API_KEY
                </code>
              </div>

              <div className="space-y-2 text-gray-300">
                <p className="font-semibold text-red-300">Kāpēc tas ir bīstams?</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Tiek automātiski "iecepts" JavaScript kodā</li>
                  <li>Redzams lietotāja pārlūkprogrammā</li>
                  <li>Pieejams DevTools → Sources</li>
                  <li>Var tikt izvilkti ar vienu "View Source"</li>
                  <li>GitHub boti to atrod sekundēs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Golden Rule */}
      <div className="mt-6 bg-yellow-950/30 border-2 border-yellow-500/50 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-yellow-300 font-bold text-lg mb-2">Zelta likums:</p>
            <p className="text-white text-lg">
              Nekad neliec API atslēgas mainīgajos ar <code className="px-2 py-1 rounded bg-black/30 text-yellow-300 font-mono">NEXT_PUBLIC_</code> prefiksu!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
