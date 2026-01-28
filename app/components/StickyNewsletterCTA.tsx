'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import Button from './Button';

/**
 * Sticky Newsletter CTA Component
 * 
 * Appears after scrolling past the hero section
 * Fixed position in top-right corner (desktop only)
 */
export default function StickyNewsletterCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find hero section - try multiple selectors
    const findHeroSection = () => {
      const sections = document.querySelectorAll('section');
      const hero = Array.from(sections).find(
        (s) =>
          s.textContent?.includes('Veicinot Latvijas') ||
          s.textContent?.includes('AI + Latvijas')
      );
      return (
        hero ||
        document.querySelector('section') ||
        document.querySelector('[class*="hero"]') ||
        document.querySelector('div > div:first-child')
      );
    };

    const heroSection = findHeroSection();
    
    if (!heroSection) {
      // Fallback: use scroll position
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight * 0.7; // Approximate hero height
        setIsVisible(scrollY > heroHeight);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check initial position

      return () => window.removeEventListener('scroll', handleScroll);
    }

    heroRef.current = heroSection as HTMLElement;

    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show button when hero is not intersecting (scrolled past)
          setIsVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px', // Trigger slightly before hero leaves viewport
      }
    );

    observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50 hidden lg:block"
        >
          <Button
            variant="primary"
            size="medium"
            href="/newsletter"
            icon={<Mail className="w-4 h-4" />}
            iconPosition="left"
            className="shadow-xl"
          >
            Abonēt
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
