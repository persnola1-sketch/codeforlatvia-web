'use client';

import { motion } from 'framer-motion';
import { Mail, Clock } from 'lucide-react';
import Button from '../components/Button';

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00ff41]/20 mb-4">
              <Mail className="w-8 h-8 text-[#00ff41]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Pievienoties Jaunumiem
            </h1>
            <p className="text-gray-400 text-lg">
              Saņem jaunākos projekta atjauninājumus un nodarbības tieši savā e-pastā
            </p>
          </div>

          {/* Coming soon */}
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-amber-200 text-sm">
              Abonēšana drīzumā. Pagaidām apskatieties projekta jaunumus sākumlapā un nodarbībās.
            </p>
          </div>

          {/* Disabled form */}
          <div className="space-y-6 opacity-60">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-pasta adrese
              </label>
              <input
                type="email"
                id="email"
                disabled
                placeholder="jūsu@epasts.lv"
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-gray-500 placeholder-gray-600
                         cursor-not-allowed"
              />
            </div>

            <Button
              type="button"
              variant="primary"
              size="large"
              disabled
              className="w-full cursor-not-allowed"
              icon={<Mail className="w-4 h-4" />}
              iconPosition="left"
            >
              Drīzumā
            </Button>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-xs text-gray-500">
            Mēs respektējam jūsu privātumu. Jūs varat atsaukt abonementu jebkurā laikā.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Button
            variant="tertiary"
            href="/"
            className="text-cyan-400 hover:text-cyan-300"
          >
            ← Atgriezties uz sākumlapu
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
