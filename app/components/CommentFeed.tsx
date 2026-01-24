'use client';

import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';

interface Comment {
  id: string;
  text: string;
  author: string;
  likes: number;
  timestamp: number;
  replies?: Comment[];
  replyCount?: number;
  hasReplies?: boolean;
  videoId?: string;
  tiktokCommentId?: string;
}

interface CommentFeedProps {
  compact?: boolean;
  onCommentsChange?: (comments: Comment[]) => void;
}

export default function CommentFeed({ compact = false, onCommentsChange }: CommentFeedProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextSyncAt, setNextSyncAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isFromCache, setIsFromCache] = useState<boolean>(false);
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || '';

  // Auto-fetch comments from Supabase only on component mount (no API call)
  useEffect(() => {
    if (!videoUrl) {
      setError('Video URL nav konfigurēts. Lūdzu, pievienojiet NEXT_PUBLIC_VIDEO_URL .env.local failā.');
      setLoading(false);
      return;
    }

    loadCommentsFromSupabase();
  }, [videoUrl]);

  // Countdown timer effect
  useEffect(() => {
    if (!nextSyncAt) {
      setTimeRemaining('');
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const syncTime = nextSyncAt.getTime();
      const diff = syncTime - now;

      if (diff <= 0) {
        setTimeRemaining('Gatavs atjaunot');
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeRemaining(`${minutes}m ${seconds.toString().padStart(2, '0')}s`);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextSyncAt]);

  // Load comments from Supabase only (no API call) - used on page load
  const loadCommentsFromSupabase = async () => {
    if (!videoUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fetch-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, skipApi: true }), // Only fetch from Supabase
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Neizdevās ielādēt komentārus');
      }

      if (data.comments && Array.isArray(data.comments)) {
        // Sort comments by timestamp (newest first)
        const sortedComments = [...data.comments].sort((a, b) => b.timestamp - a.timestamp);
        setComments(sortedComments);
        onCommentsChange?.(sortedComments);
        
        // Set sync information
        if (data.nextSyncAt) {
          setNextSyncAt(new Date(data.nextSyncAt));
        } else {
          setNextSyncAt(null);
        }
        setIsFromCache(data.isFromCache || true); // Always from cache on page load
      } else {
        throw new Error('Nav komentāru');
      }
    } catch (err: any) {
      setError(err.message || 'Radās kļūda');
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments with API sync check (used when button is pressed)
  const fetchComments = async () => {
    if (!videoUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fetch-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, skipApi: false }), // Allow API sync check
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Neizdevās ielādēt komentārus');
      }

      if (data.comments && Array.isArray(data.comments)) {
        // Sort comments by timestamp (newest first)
        const sortedComments = [...data.comments].sort((a, b) => b.timestamp - a.timestamp);
        setComments(sortedComments);
        onCommentsChange?.(sortedComments);
        
        // Set sync information
        if (data.nextSyncAt) {
          setNextSyncAt(new Date(data.nextSyncAt));
        } else {
          setNextSyncAt(null);
        }
        setIsFromCache(data.isFromCache || false);
      } else {
        throw new Error('Nav komentāru');
      }
    } catch (err: any) {
      setError(err.message || 'Radās kļūda');
    } finally {
      setLoading(false);
    }
  };

  if (loading && comments.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-green-500/20 p-4 font-mono" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(34, 197, 94, 0.1) inset' }}>
        <div className="text-center py-12">
          <div className="text-green-400 mb-4">$ loading...</div>
          <p className="text-green-300 text-sm">Ielādē komentārus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-green-500/20 p-4 font-mono h-full flex flex-col" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(34, 197, 94, 0.1) inset' }}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-500/20">
        <h2 className="text-sm font-bold text-green-400">
          $ LIVE_PULSE
        </h2>
        <div className="flex items-center gap-2">
          {timeRemaining && (
            <div className="text-xs text-green-300/70">
              {isFromCache && (
                <span className="text-green-400">[CACHE] </span>
              )}
              <span className="text-green-300/50">next: </span>
              <span className="text-green-400">{timeRemaining}</span>
            </div>
          )}
          <button
            onClick={fetchComments}
            disabled={loading || !!(timeRemaining && timeRemaining !== 'Gatavs atjaunot')}
            className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded hover:bg-red-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Atjaunot komentārus no TikTok API"
          >
            {loading ? '...' : '↻'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-3 py-2 rounded mb-4 text-xs">
          <p className="font-semibold">ERROR:</p>
          <p>{error}</p>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-green-300/50 text-sm">
            $ no comments found
          </p>
        </div>
      ) : (
        <div className={`space-y-2 flex-1 ${compact ? 'overflow-y-auto' : 'max-h-[800px] overflow-y-auto'}`}>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
