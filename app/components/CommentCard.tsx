'use client';

interface CommentCardProps {
  comment: {
    id: string;
    text: string;
    author: string;
    likes: number;
    timestamp: number;
  };
}

export default function CommentCard({ comment }: CommentCardProps) {
  // Calculate relative time (e.g., "2 hours ago")
  const getRelativeTime = (timestamp: number): string => {
    // Validate timestamp
    if (!timestamp || timestamp <= 0) return 'Tikko';
    
    const now = Date.now();
    const diff = now - timestamp;
    
    // Don't show if diff is negative or too large (data error)
    if (diff < 0 || diff > 30 * 24 * 60 * 60 * 1000) return 'Tikko';
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    // Remove days calculation - only show up to 24+ hours
    if (hours > 0) {
      if (hours >= 24) return 'Senāk'; // "Older" if more than 24 hours
      return `${hours} ${hours === 1 ? 'stunda' : 'stundas'} atpakaļ`;
    }
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minūte' : 'minūtes'} atpakaļ`;
    }
    return 'Tikko';
  };

  return (
    <div 
      className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-cyan-500/50" 
      style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-white font-semibold text-lg">{comment.author}</p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {getRelativeTime(comment.timestamp)}
          </span>
          <span className="text-sm text-gray-300 flex items-center gap-1">
            <span>❤️</span>
            <span className="font-medium">{comment.likes}</span>
          </span>
        </div>
      </div>
      <p className="text-gray-300 text-base leading-relaxed">
        {comment.text}
      </p>
    </div>
  );
}
