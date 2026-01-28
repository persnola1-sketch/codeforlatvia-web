'use client';

import Link from 'next/link';
import FeaturedProjects from '../components/FeaturedProjects';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Atpakaļ uz sākumlapu
        </Link>
        <FeaturedProjects embedded />
      </div>
    </div>
  );
}
