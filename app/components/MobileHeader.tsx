'use client';

import { Menu, X } from 'lucide-react';

interface MobileHeaderProps {
  isOpen: boolean;
  onMenuToggle: () => void;
}

export default function MobileHeader({ isOpen, onMenuToggle }: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-white">Code For Latvia</h1>
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors z-50 relative"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
