'use client';

import { useState } from 'react';
import CommentFeed from './components/CommentFeed';
import StatsBar from './components/StatsBar';
import AboutProjectCard from './components/AboutProjectCard';
import DeveloperProfileCard from './components/DeveloperProfileCard';
import NavigationSidebar from './components/NavigationSidebar';
// NavigationGuideCard removed - content moved to /mystack page
import MobileHeader from './components/MobileHeader';
import NewsletterSubscribe from './components/NewsletterSubscribe';
import HeroSection from './components/HeroSection';

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

export default function Home() {
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
            {/* Column 1 (Sidebar): lg:col-span-2 - Already handled by fixed sidebar */}
            
            {/* Column 2 (Center Content): lg:col-span-7 */}
            <div className="lg:col-span-7 lg:col-start-3 h-fit space-y-4 md:space-y-6">
              {/* Hero Section */}
              <HeroSection />

              {/* Hero/Mission Card */}
              <AboutProjectCard />

              {/* Stats Card */}
              <StatsBar />

              {/* Newsletter Subscribe */}
              <NewsletterSubscribe />
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
