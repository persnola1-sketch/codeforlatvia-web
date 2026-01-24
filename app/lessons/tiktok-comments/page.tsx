'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavigationSidebar from '../../components/NavigationSidebar';
import MobileHeader from '../../components/MobileHeader';
import CommentFeed from '../../components/CommentFeed';
import DeveloperProfileCard from '../../components/DeveloperProfileCard';

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

export default function TikTokCommentsLesson() {
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
                    <span className="text-white">TikTok</span>
                  </li>
                </ol>
              </nav>

              {/* Page Content */}
              <div className="space-y-4 md:space-y-6">
                {/* Single Content Block */}
                <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-200 hover:scale-[1.02] hover:border-white/20">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Kāpēc es pārcēlu TikTok komentārus uz šo lapu?
                  </h1>
                  
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                    Viss sākās ar vienkāršu jautājumu: Vai es varu savienot savu TikTok auditoriju ar savu kodu?
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Praktiska mācīšanās
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Teorija ir garlaicīga. Lai patiešām saprastu, kā darbojas API un datu plūsmas, man vajadzēja reālu izaicinājumu. Šis eksperiments parāda, kā datus no vienas platformas var pārvērst funkcionējošā mājaslapas komponentē.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        AI kā tilts starp ideju un izpildi
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Es izmantoju Gemini, lai izplānotu datu ieguves loģiku, un Cursor AI, lai uzrakstītu kodu. Šis ir pierādījums tam, ka ar AI rīkiem barjeras starp 'es gribu' un 'es izdarīju' vairs neeksistē – pat bez augstākās izglītības IT jomā.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Kopienas iesaiste
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Es gribēju, lai tie, kas skatās manus video, kļūst par daļu no mana projekta. Katrs komentārs, ko tu redzi labajā pusē, ir reāls cilvēks, kurš ir palīdzējis šai lapai 'atdzīvoties'.
                      </p>
                    </div>
                  </div>

                  {/* Hacker Log Entry */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="font-mono text-sm text-green-400">
                      <span className="text-gray-500">$</span> STATUS: Bridge active. Data flowing from TikTok to CodeForLatvia.
                    </div>
                  </div>
                </div>

                {/* Yellow Block */}
                <div className="bg-yellow-500/20 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-6">
                  <p className="text-yellow-200 text-lg md:text-xl leading-relaxed">
                    vēlāk paskaidrošu kā es to izdariju
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
