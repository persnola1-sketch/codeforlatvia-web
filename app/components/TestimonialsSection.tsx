'use client';

import { motion } from 'framer-motion';
import { Quote, Star, Building2, User } from 'lucide-react';

// Placeholder testimonials - will be replaced with real ones as clients come in
const testimonials = [
  {
    id: 1,
    name: 'Jūsu uzņēmums šeit',
    role: 'Pirmais klients',
    company: null,
    text: 'Mēs tikko sākām — bet esam gatavi parādīt rezultātus. Būsiet pirmais, kurš saņem mūsu pilnu uzmanību un labāko servisu.',
    rating: 5,
    isPlaceholder: true,
  },
];

// This will be used when we have real testimonials
const futureTestimonials = [
  {
    id: 2,
    name: 'Jānis B.',
    role: 'Īpašnieks',
    company: 'SIA "Piemērs"',
    text: 'CodeForLatvia palīdzēja automatizēt mūsu rēķinu izrakstīšanu. Tagad taupām 10+ stundas mēnesī. Caurspīdīgas cenas, ātra izstrāde, latvieši kas saprot mūsu vajadzības.',
    rating: 5,
    isPlaceholder: false,
  },
];

export default function TestimonialsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <Quote className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Ko saka klienti</h2>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`p-5 rounded-xl border ${
              testimonial.isPlaceholder
                ? 'bg-gradient-to-br from-cyan-500/5 to-green-500/5 border-cyan-500/20 border-dashed'
                : 'bg-gray-900/50 border-white/10'
            }`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    testimonial.isPlaceholder ? 'text-cyan-400/50' : 'text-yellow-400'
                  } fill-current`}
                />
              ))}
            </div>

            {/* Quote */}
            <p className={`mb-4 ${testimonial.isPlaceholder ? 'text-gray-400 italic' : 'text-gray-300'}`}>
              "{testimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                testimonial.isPlaceholder
                  ? 'bg-cyan-500/10 border border-cyan-500/30 border-dashed'
                  : 'bg-gradient-to-br from-cyan-500 to-green-500'
              }`}>
                {testimonial.isPlaceholder ? (
                  <User className="w-5 h-5 text-cyan-400" />
                ) : (
                  <span className="text-gray-900 font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className={`font-medium ${testimonial.isPlaceholder ? 'text-cyan-400' : 'text-white'}`}>
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.role}
                  {testimonial.company && ` • ${testimonial.company}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA for first testimonial */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm mb-3">
          🐼 Būsi pirmais! Pirmie klienti saņem īpašu uzmanību.
        </p>
        <a
          href="mailto:mia@codeforlatvia.lv?subject=Vēlos%20būt%20pirmais%20klients"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg transition-all"
        >
          <Building2 className="w-4 h-4" />
          Kļūsti par pirmo klientu
        </a>
      </div>
    </motion.div>
  );
}
