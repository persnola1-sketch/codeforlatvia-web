'use client';

interface Comment {
  id: string;
  text: string;
  author: string;
  likes: number;
  timestamp: number;
}

interface LeaderboardEntry {
  username: string;
  commentCount: number;
  totalLikes: number;
  engagementScore: number;
}

interface VIPLeaderboardProps {
  comments: Comment[];
}

export default function VIPLeaderboard({ comments }: VIPLeaderboardProps) {
  // Calculate leaderboard from comments
  const calculateLeaderboard = (): LeaderboardEntry[] => {
    const userMap = new Map<string, { comments: number; likes: number }>();

    // Group comments by author
    comments.forEach((comment) => {
      const existing = userMap.get(comment.author) || { comments: 0, likes: 0 };
      userMap.set(comment.author, {
        comments: existing.comments + 1,
        likes: existing.likes + comment.likes,
      });
    });

    // Convert to array and calculate engagement scores
    const entries: LeaderboardEntry[] = Array.from(userMap.entries()).map(
      ([username, stats]) => ({
        username,
        commentCount: stats.comments,
        totalLikes: stats.likes,
        engagementScore: stats.comments * 2 + stats.likes, // Weight: 2 points per comment, 1 per like
      })
    );

    // Sort by engagement score (descending)
    return entries.sort((a, b) => b.engagementScore - a.engagementScore).slice(0, 20);
  };

  const leaderboard = calculateLeaderboard();

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) {
      return {
        background: 'linear-gradient(to right, #f59e0b, #d97706)',
        color: '#fff',
        boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
      };
    }
    if (rank === 2) {
      return {
        background: 'linear-gradient(to right, #9ca3af, #6b7280)',
        color: '#fff',
        boxShadow: '0 0 20px rgba(156, 163, 175, 0.5)',
      };
    }
    if (rank === 3) {
      return {
        background: 'linear-gradient(to right, #fb923c, #f97316)',
        color: '#fff',
        boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)',
      };
    }
    return {
      background: '#1a1a1a',
      color: '#f8f9fa',
      border: '1px solid #2a2a2a',
    };
  };

  if (leaderboard.length === 0) {
    return (
      <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6 backdrop-blur-sm" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.1)' }}>
        <h2 className="text-2xl font-bold text-white mb-4">⭐ VIP</h2>
        <p className="text-gray-400">Nav komentāru, lai rādītu līderbordi.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6 backdrop-blur-sm" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.1)' }}>
      <h2 className="text-2xl font-bold text-white mb-4">⭐ VIP</h2>
      <p className="text-sm text-gray-400 mb-4">
        Top komentētāji pēc iesaistes (komentāri + laiki)
      </p>
      <div className="space-y-3">
        {leaderboard.map((entry, index) => {
          const rank = index + 1;
          const rankStyle = getRankStyle(rank);
          return (
            <div
              key={entry.username}
              className="flex items-center justify-between p-3 rounded-lg transition-all duration-300"
              style={rankStyle}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">{getRankBadge(rank)}</span>
                <div>
                  <p className="font-semibold text-lg">{entry.username}</p>
                  <p className="text-xs opacity-90">
                    {entry.commentCount} {entry.commentCount === 1 ? 'komentārs' : 'komentāri'} • {entry.totalLikes} laiki
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{entry.engagementScore}</p>
                <p className="text-xs opacity-90">punkti</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
