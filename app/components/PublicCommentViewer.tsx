'use client';

import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import VIPLeaderboard from './VIPLeaderboard';

interface Comment {
  id: string;
  text: string;
  author: string;
  likes: number;
  timestamp: number;
}

export default function PublicCommentViewer() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || '';

  // Auto-fetch comments on component mount
  useEffect(() => {
    if (!videoUrl) {
      setError('Video URL nav konfigurēts. Lūdzu, pievienojiet NEXT_PUBLIC_VIDEO_URL .env.local failā.');
      setLoading(false);
      return;
    }

    fetchComments();
  }, [videoUrl]);

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
        body: JSON.stringify({ videoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Neizdevās ielādēt komentārus');
      }

      if (data.comments && Array.isArray(data.comments)) {
        // Sort comments by timestamp (newest first)
        const sortedComments = [...data.comments].sort((a, b) => b.timestamp - a.timestamp);
        setComments(sortedComments);
        setLastUpdated(new Date());
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
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" style={{ boxShadow: '0 0 15px rgba(0, 217, 255, 0.5)' }}></div>
            <p className="text-gray-300 text-lg">Ielādē komentārus...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ textShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}>
            <span style={{ color: '#c8102e' }}>Code</span>
            <span className="text-white">For</span>
            <span style={{ color: '#c8102e' }}>Latvia</span>
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-6 py-4 rounded-lg mb-6" style={{ boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)' }}>
            <p className="font-semibold">Kļūda:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Comments Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6 backdrop-blur-sm" style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.1)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  💬 Tiešraides komentāri
                </h2>
                <button
                  onClick={fetchComments}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)',
                  }}
                >
                  {loading ? 'Atjauno...' : '🔄'}
                </button>
              </div>
              {comments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    Nav komentāru
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[800px] overflow-y-auto">
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - VIP Leaderboard */}
          <div className="lg:col-span-1">
            <VIPLeaderboard comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
