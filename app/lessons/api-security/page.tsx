'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavigationSidebar from '../../components/NavigationSidebar';
import MobileHeader from '../../components/MobileHeader';
import CommentFeed from '../../components/CommentFeed';
import DeveloperProfileCard from '../../components/DeveloperProfileCard';
import HeroSection from '../../components/lesson/HeroSection';
import WarningBox from '../../components/lesson/WarningBox';
import SafeVsDangerous from '../../components/lesson/SafeVsDangerous';
import RecoveryChecklist from '../../components/lesson/RecoveryChecklist';

interface Comment {
  id: string;
  text: string;
  author: string;
  likes: number;
  timestamp: number;
  replies?: Comment[];
  replyCount?: number;
  hasReplies?: boolean;
  videoId?: string;
  tiktokCommentId?: string;
}

export default function APISecurityLesson() {
  const [comments, setComments] = useState<Comment[]>([]);
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

      {/* Main Content - 3 Column Layout */}
      <div className="lg:pl-64 pt-16 lg:pt-6 p-4 md:p-8 h-fit">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
            {/* Column 2 (Center Content): lg:col-span-7 */}
            <div className="lg:col-span-7 lg:col-start-3 h-fit space-y-4 md:space-y-6">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-cyan-400 transition-colors">
                      Sākums
                    </Link>
                  </li>
                  <li className="text-gray-600">&gt;</li>
                  <li>
                    <span className="text-gray-500">Mācības</span>
                  </li>
                  <li className="text-gray-600">&gt;</li>
                  <li>
                    <span className="text-white">API Drošība</span>
                  </li>
                </ol>
              </nav>

              {/* Hero Section */}
              <HeroSection />

              {/* Warning Box */}
              <WarningBox />

              {/* Main Content Section */}
              <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6 md:p-8 backdrop-blur-sm">
                <div className="prose prose-invert max-w-none space-y-6">
                  {/* What is API Key Section */}
                  <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Kas ir API atslēga un kāpēc tā ir "noslēpums"?
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      Domā par API atslēgu kā par unikālu paroli, kas pasaka serverim: <span className="text-cyan-400 font-semibold">"Es esmu Jānis, un es samaksāšu par šo pieprasījumu."</span>
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300 font-semibold mb-2">Ja kāds cits to iegūst:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Viņš var tērēt tavu naudu.</li>
                        <li>Viņš var piekļūt taviem privātajiem datiem.</li>
                        <li>Viņš var sabojāt tavas lietotnes reputāciju.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Safe vs Dangerous Comparison */}
                  <SafeVsDangerous />

                  {/* GitHub Bot Section */}
                  <section className="mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      GitHub: "Botu" medību lauks
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      GitHub nav tikai izstrādātāju platforma. Tas ir arī <span className="text-orange-300 font-semibold">"botu" medību lauks</span>. 
                      Šie boti <span className="text-red-300">24/7</span> skenē katru publisko kodu, meklējot noteiktus simbolu virknes: API atslēgas, paroles un datubāžu pieklūves. 
                      Ja tu tās tur atstāj, tavs kredīts var tikt iztērēts dažu minūšu laikā.
                    </p>
                    <div className="mt-4 bg-orange-950/30 border border-orange-500/50 rounded-lg p-4">
                      <p className="text-orange-200 text-sm">
                        <strong>⚠️ Svarīgi:</strong> Ja atslēga nonāk publiskā repozitorijā — tā vairs nav tava. 
                        Vienkārša izdzēšana no koda nepietiek — Git atceras visu vēsturi!
                      </p>
                    </div>
                  </section>
                </div>
              </div>

              {/* Cursor AI Section */}
              <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6 md:p-8 backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Kā Cursor AI var palīdzēt?
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Mēs "Code for Latvia" mīlam efektivitāti. Ja tu lieto Cursor AI, vari izmantot čatu, lai izvairītos no šādām situācijām:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold mb-1">Lūdz izveidot .gitignore</p>
                      <p className="text-gray-400 text-sm">
                        "Hey Cursor, generate a standard .gitignore for Next.js that protects my .env files."
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold mb-1">Koda refaktorēšana</p>
                      <p className="text-gray-400 text-sm">
                        "Refactor this component to use a server-side API route so my API key isn't exposed to the client."
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4 italic">
                  Cursor pamanīs, ja mēģināsi ielīmēt garu simbolu virkni tieši kodā, un bieži vien ieteiks to pārvietot uz vides mainīgajiem.
                </p>
              </div>

              {/* Recovery Checklist */}
              <RecoveryChecklist />

              {/* Conclusion */}
              <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-500/50 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Noslēgumā
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Kļūdīties ir cilvēcīgi, bet mācīties no citu kļūdām ir viedi. API drošība nav tikai "drošības frīku" divainība – tā ir tava profesionālā higiēna.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
                    <p className="font-semibold text-cyan-300 mb-2">Ja tu no šī raksta atceries tikai vienu lietu, lai tā ir šī:</p>
                    <p className="text-white text-lg">
                      <strong>Ja atslēga nonāk publiskā repozitorijā — tā vairs nav tava.</strong>
                    </p>
                  </div>
                  <p className="text-gray-400">
                    Mēs visi kļūdāmies. Svarīgi ir: kļūdas pamanīt ātri, saprast, kāpēc tās notika, un izveidot sistēmu, lai tās neatkārtotos.
                  </p>
                  <p className="text-cyan-400 font-semibold">
                    Ja šis raksts tevi pasargāja no viena slikta commit — mana kļūda bija tā vērta.
                  </p>
                  <p className="text-gray-400 text-sm mt-6">
                    — Code for Latvia
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3 (Right Sidebar): lg:col-span-3 */}
            <div className="lg:col-span-3 lg:col-start-10 h-fit space-y-6">
              {/* Developer Profile Card */}
              <DeveloperProfileCard />

              {/* Live Pulse Feed */}
              <CommentFeed compact={true} onCommentsChange={setComments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
