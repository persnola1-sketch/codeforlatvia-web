'use client';

import { useState } from 'react';
import StatsBar from './components/StatsBar';
import AboutProjectCard from './components/AboutProjectCard';
import NavigationSidebar from './components/NavigationSidebar';
import NavigationGuideCard from './components/NavigationGuideCard';
import MobileHeader from './components/MobileHeader';
import LandingHero from './components/LandingHero';
import FeaturedProjects from './components/FeaturedProjects';
import StickyNewsletterCTA from './components/StickyNewsletterCTA';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Sticky Newsletter CTA */}
      <StickyNewsletterCTA />

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

      {/* Hero Section */}
      <div className="pt-16 lg:pt-0">
        <LandingHero />
      </div>

      {/* Main Content - single centered column */}
      <div className="lg:pl-64 pt-8 p-4 md:p-8 h-fit">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            <AboutProjectCard />
            <NavigationGuideCard />
            <StatsBar />
          </div>

          {/* Featured Projects - full-width section */}
          <FeaturedProjects />
        </div>
      </div>
    </div>
  );
}
