'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSupabaseClient } from '../../lib/supabase';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch subscriber count on mount
  useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      const supabase = getSupabaseClient();
      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        setSubscriberCount(count);
      }
    } catch (err) {
      // Supabase not configured, that's ok
      console.log('Supabase not configured for newsletter');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Lūdzu ievadi derīgu e-pastu');
      return;
    }

    setStatus('loading');

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          setStatus('error');
          setErrorMessage('Šis e-pasts jau ir reģistrēts!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
        // Update count
        fetchSubscriberCount();
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Kaut kas nogāja greizi. Mēģini vēlreiz.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            📬 Piesakies jaunumiem
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            Saņem paziņojumus par jaunām pamācībām un projektiem.
          </p>
          
          {/* Subscriber count */}
          {subscriberCount !== null && subscriberCount > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(Math.min(subscriberCount, 3))].map((_, i) => (
                  <div 
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-2 border-gray-900 flex items-center justify-center"
                  >
                    <span className="text-[10px] text-white font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                <span className="text-cyan-400 font-semibold">{subscriberCount}</span> cilvēki jau pierakstījušies
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 max-w-md">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center"
            >
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-green-400 font-medium">Paldies par pierakstīšanos!</div>
              <div className="text-green-400/70 text-sm">Tu saņemsi jaunumus savā e-pastā.</div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="tavs@epasts.lv"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-gray-900 font-medium rounded-xl transition-all duration-200 whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sūta...
                    </span>
                  ) : (
                    'Pierakstīties'
                  )}
                </button>
              </div>
              
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {errorMessage}
                </motion.p>
              )}
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
