'use client';

import Link from 'next/link';

export type TechnologyColor = 'green' | 'blue' | 'red' | 'gold';

export interface TechnologyBadgeProps {
  /** Technology name to display */
  technology: string;
  /** Color variant for the badge */
  color?: TechnologyColor;
  /** Optional explicit link (no default filter-by-tech link) */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Maps technology names to color variants
 * This ensures consistent colors for the same technologies across the app
 */
const technologyColorMap: Record<string, TechnologyColor> = {
  // Frontend frameworks
  'Next.js': 'blue',
  'React': 'blue',
  'Tailwind': 'blue',
  'TypeScript': 'blue',
  // Backend/APIs
  'Node.js': 'green',
  'TikTok API': 'red',
  'API': 'red',
  // AI/ML
  'Google Gemini': 'gold',
  'AI': 'gold',
  'Gemini': 'gold',
  // Security
  'Security': 'red',
  'Security Best Practices': 'red',
  'Drošības prakses': 'red',
  'Drošība': 'red',
  // Data/Visualization
  'D3.js': 'green',
  'Reāllaika dati': 'green',
  'Real-time': 'green',
  'Real-time Data': 'green',
};

/**
 * Color configuration for badge styling
 */
const colorConfig: Record<TechnologyColor, { text: string; border: string; bg: string; hover: string }> = {
  green: {
    text: 'text-green-300',
    border: 'border-green-400/40',
    bg: 'bg-green-500/10',
    hover: 'hover:bg-green-500/20 hover:border-green-400/60',
  },
  blue: {
    text: 'text-blue-300',
    border: 'border-blue-400/40',
    bg: 'bg-blue-500/10',
    hover: 'hover:bg-blue-500/20 hover:border-blue-400/60',
  },
  red: {
    text: 'text-red-300',
    border: 'border-red-400/40',
    bg: 'bg-red-500/10',
    hover: 'hover:bg-red-500/20 hover:border-red-400/60',
  },
  gold: {
    text: 'text-amber-300',
    border: 'border-amber-400/40',
    bg: 'bg-amber-500/10',
    hover: 'hover:bg-amber-500/20 hover:border-amber-400/60',
  },
};

/**
 * Reusable technology badge component
 *
 * Pill-shaped design with accent colors. Optional href/onClick for explicit links
 * only; no default filter-by-tech behavior.
 */
export default function TechnologyBadge({
  technology,
  color,
  href,
  onClick,
  className = '',
}: TechnologyBadgeProps) {
  const colorVariant: TechnologyColor = color || technologyColorMap[technology] || 'blue';
  const colors = colorConfig[colorVariant];

  const baseClasses = `
    inline-flex items-center
    text-xs font-medium
    py-1 px-3
    rounded-full
    border
    transition-all duration-200
    ${colors.text}
    ${colors.border}
    ${colors.bg}
    ${onClick || href ? `${colors.hover} cursor-pointer` : 'cursor-default'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseClasses}
        aria-label={technology}
      >
        {technology}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={technology}>
        {technology}
      </Link>
    );
  }

  return (
    <span className={baseClasses} aria-label={technology}>
      {technology}
    </span>
  );
}
