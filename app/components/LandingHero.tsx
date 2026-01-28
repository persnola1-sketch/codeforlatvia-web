'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import AnimatedCodeSnippet from './AnimatedCodeSnippet';

export default function LandingHero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden z-0">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Animated Gradient Background - Blue to Purple */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(88, 28, 135, 0.2) 100%)',
            'linear-gradient(225deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 58, 138, 0.2) 100%)',
            'linear-gradient(315deg, rgba(30, 58, 138, 0.2) 0%, rgba(88, 28, 135, 0.2) 100%)',
            'linear-gradient(45deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 58, 138, 0.2) 100%)',
            'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(88, 28, 135, 0.2) 100%)',
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated Tech Shapes - Circles (Reduced on mobile for performance) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Circle 1 - Hidden on mobile */}
        <div 
          className="hidden md:block absolute w-96 h-96 rounded-full border border-blue-500/20 opacity-20"
          style={{ 
            top: '10%', 
            left: '5%',
            willChange: 'transform',
            animation: 'floatCircle1 20s ease-in-out infinite'
          }}
        />
        
        {/* Large Circle 2 - Hidden on mobile */}
        <div 
          className="hidden md:block absolute w-80 h-80 rounded-full border border-purple-500/20 opacity-15"
          style={{ 
            top: '60%', 
            right: '10%',
            willChange: 'transform',
            animation: 'floatCircle2 18s ease-in-out infinite'
          }}
        />
        
        {/* Medium Circle 1 - Smaller on mobile */}
        <div 
          className="absolute w-32 h-32 md:w-64 md:h-64 rounded-full border border-blue-400/25 opacity-20"
          style={{ 
            bottom: '15%', 
            left: '20%',
            willChange: 'transform',
            animation: 'floatCircle3 22s ease-in-out infinite'
          }}
        />
        
        {/* Medium Circle 2 - Hidden on mobile */}
        <div 
          className="hidden md:block absolute w-48 h-48 rounded-full border border-purple-400/25 opacity-15"
          style={{ 
            top: '30%', 
            right: '25%',
            willChange: 'transform',
            animation: 'floatCircle4 16s ease-in-out infinite'
          }}
        />
        
        {/* Small Circle 1 - Smaller on mobile */}
        <div 
          className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border border-blue-300/30 opacity-25"
          style={{ 
            top: '50%', 
            left: '50%',
            willChange: 'transform',
            animation: 'floatCircle5 15s ease-in-out infinite'
          }}
        />

        {/* Animated Tech Lines - Reduced on mobile */}
        {/* Diagonal Line 1 - Hidden on mobile */}
        <div 
          className="hidden md:block absolute w-1 h-64 bg-gradient-to-b from-blue-500/20 to-transparent opacity-20"
          style={{ 
            top: '20%', 
            left: '15%',
            transform: 'rotate(45deg)',
            willChange: 'transform, opacity',
            animation: 'pulseLine1 17s ease-in-out infinite'
          }}
        />
        
        {/* Diagonal Line 2 - Hidden on mobile */}
        <div 
          className="hidden md:block absolute w-1 h-80 bg-gradient-to-b from-purple-500/20 to-transparent opacity-15"
          style={{ 
            bottom: '25%', 
            right: '20%',
            transform: 'rotate(-45deg)',
            willChange: 'transform, opacity',
            animation: 'pulseLine2 19s ease-in-out infinite'
          }}
        />
        
        {/* Horizontal Line 1 - Smaller on mobile */}
        <div 
          className="absolute w-48 h-1 md:w-96 md:h-1 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-transparent opacity-20"
          style={{ 
            top: '40%', 
            left: '10%',
            willChange: 'transform, opacity',
            animation: 'slideLine1 21s ease-in-out infinite'
          }}
        />
        
        {/* Vertical Line 1 - Hidden on mobile */}
        <div 
          className="hidden md:block absolute w-1 h-72 bg-gradient-to-b from-purple-500/15 via-blue-500/15 to-transparent opacity-15"
          style={{ 
            top: '10%', 
            right: '30%',
            willChange: 'transform, opacity',
            animation: 'slideLine2 16s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Content Container - split: text left, code right on desktop; stacked on mobile */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-8 sm:px-6 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-24">
        {/* Left: Tagline, headline, description, CTAs */}
        <div className="flex flex-1 flex-col text-center lg:max-w-xl lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-[#ff4757] uppercase sm:text-sm md:text-base mb-3 md:mb-4"
          >
            AI + Latvijas Jaunatne = Digitālā Nākotne
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[28px] font-bold leading-tight text-white mb-4 px-2 sm:text-4xl md:mb-6 md:text-5xl lg:px-0 lg:text-6xl xl:text-7xl"
          >
            Veicinot Latvijas Nākamās Paaudzes
            <br className="hidden sm:block" />
            <span className="sm:inline block"> </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-[#ff4757]">
              Attīstību Ar AI un Kodu
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 px-2 md:mb-10 lg:mx-0 lg:max-w-lg lg:px-0"
          >
            <p className="text-base leading-relaxed text-gray-300 md:text-lg lg:text-xl">
              Pievienojies jaunu inovatoru kopienai, kas mācās veidot, radīt un veidot digitālo nākotni.
              No AI darbinātiem projektiem līdz reāliem risinājumiem, atklāj, kas ir iespējams, kad aizraušanās satiekas ar tehnoloģijām.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:flex-wrap sm:justify-center md:gap-4 lg:justify-start lg:px-0"
          >
            <Button
              variant="primary"
              size="large"
              href="/lessons/api-security"
              showArrow={true}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              Sākt Mācīties
            </Button>
            <Button
              variant="secondary"
              size="large"
              href="/lessons/tiktok-comments"
              showArrow={true}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              Izpētīt Projektus
            </Button>
          </motion.div>
        </div>

        {/* Right (desktop) / Below (mobile): Animated code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full min-w-0 shrink-0 lg:max-w-[420px]"
        >
          <AnimatedCodeSnippet />
        </motion.div>
      </div>
    </section>
  );
}
