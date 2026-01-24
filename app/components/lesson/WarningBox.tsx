export default function WarningBox() {
  return (
    <div className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border-2 border-red-500/50 rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden">
      {/* Warning Icon Background */}
      <div className="absolute top-4 right-4 opacity-20">
        <svg className="w-32 h-32 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold text-red-400">
            Panikas moments: Kas tikko notika?
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-4 text-gray-200 leading-relaxed">
          <p className="text-lg">
            Tajā brīdī miegs pazūd kā nebijis. Tavs <span className="text-red-300 font-semibold">API key</span> (kas būtībā ir tava digitālā kreditkarte) tagad ir publiski pieejams visai pasaulei.
          </p>

          <div className="bg-black/30 rounded-lg p-4 border border-red-500/30">
            <p className="font-semibold text-red-300 mb-2">Kāpēc tas ir tik bīstami?</p>
            <p>
              Tāpēc, ka GitHub nav tikai izstrādātāju platforma. Tas ir arī <span className="text-orange-300 font-semibold">"botu" medību lauks</span>. 
              Šie boti <span className="text-red-300">24/7</span> skenē katru publisko kodu, meklējot noteiktus simbolu virknes: API atslēgas, paroles un datubāžu pieklūves. 
              Ja tu tās tur atstāj, tavs kredīts var tikt iztērēts dažu minūšu laikā.
            </p>
          </div>

          <div className="bg-red-900/20 border-l-4 border-red-500 pl-4 py-2 rounded">
            <p className="text-sm text-red-200">
              <strong>OpenRouter Security Alert:</strong> Viena no manām API atslēgām ir atrasta publiskā GitHub repozitorijā. 
              Atslēga jau ir automātiski atslēgta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
