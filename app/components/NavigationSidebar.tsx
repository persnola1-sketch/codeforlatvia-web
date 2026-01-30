'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, Lock, Video, Layers, FolderKanban, Bot } from 'lucide-react';

interface NavigationSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function NavigationSidebar({ isMobileOpen = false, onMobileClose }: NavigationSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Sākums', icon: Home },
    { href: '/pakalpojumi', label: 'AI & Automatizācija', icon: Bot, isNew: true },
    { href: '/mystack', label: 'My Stack', icon: Layers },
    { href: '/projekti', label: 'Projekti', icon: FolderKanban },
    { href: '/lessons/api-security', label: 'API Drošība', icon: Lock },
    { href: '/lessons/tiktok-comments', label: 'TikTok Eksperiments', icon: Video },
    { href: '#', label: 'Idejas', icon: Lightbulb, comingSoon: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-xl border-r border-white/10 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full p-6">
          <h2 className="text-2xl font-bold text-white mb-8">Mācības</h2>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isComingSoon = item.comingSoon;
              
              const linkContent = (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isComingSoon && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                      Drīzumā
                    </span>
                  )}
                  {item.isNew && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      JAUNS
                    </span>
                  )}
                </>
              );

              if (isComingSoon) {
                return (
                  <div
                    key={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg border cursor-not-allowed opacity-60
                      text-gray-400 border-transparent
                    `}
                  >
                    {linkContent}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (onMobileClose) {
                      onMobileClose();
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] border
                    ${
                      active
                        ? 'bg-white/10 text-white border-white/20'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10'
                    }
                  `}
                >
                  {linkContent}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
