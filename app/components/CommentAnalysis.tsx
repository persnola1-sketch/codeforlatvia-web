'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  text: string;
  author: string;
  likes: number;
  timestamp: number;
}

interface AnalysisResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  category: 'Question' | 'Hate' | 'Praise' | 'Bot/Spam' | 'Other';
  goldenComment: {
    id: string;
    text: string;
    author: string;
    reason: string;
  } | null;
  summary: string;
  totalComments: number;
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
  categoryBreakdown: {
    question: number;
    hate: number;
    praise: number;
    botSpam: number;
    other: number;
  };
}

export default function CommentAnalysis() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [videosScanned, setVideosScanned] = useState<number | null>(null);

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      setError('Please enter a TikTok video URL or profile URL');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);
    setComments([]);
    setVideosScanned(null);

    try {
      // Step 1: Fetch comments
      const fetchResponse = await fetch('/api/fetch-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      const fetchData = await fetchResponse.json();

      if (!fetchResponse.ok) {
        throw new Error(fetchData.error || 'Failed to fetch comments');
      }

      if (!fetchData.comments || fetchData.comments.length === 0) {
        throw new Error('No comments found');
      }

      setComments(fetchData.comments);
      setVideosScanned(fetchData.videosScanned || 1);

      // Step 2: Analyze comments
      const analyzeResponse = await fetch('/api/analyze-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: fetchData.comments }),
      });

      const analyzeData = await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        throw new Error(analyzeData.error || 'Failed to analyze comments');
      }

      setAnalysis(analyzeData.analysis);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Negative':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Neutral':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Praise':
        return 'bg-blue-100 text-blue-800';
      case 'Question':
        return 'bg-purple-100 text-purple-800';
      case 'Hate':
        return 'bg-red-100 text-red-800';
      case 'Bot/Spam':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            TikTok Comment Brain
          </h1>
          <p className="text-gray-600 text-lg">
            AI-Powered Comment Analysis Dashboard
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter TikTok Video URL or Profile URL (e.g., https://www.tiktok.com/@username/video/1234567890 or https://www.tiktok.com/@username)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              disabled={loading}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Analyzing...' : 'Analyze Comments'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-8">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
                {videosScanned && videosScanned > 1 && (
                  <div className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded-full">
                    {videosScanned} videos scanned
                  </div>
                )}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Sentiment */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Overall Sentiment</h3>
                <div className={`inline-block px-4 py-2 rounded-lg border-2 font-bold text-lg ${getSentimentColor(analysis.sentiment)}`}>
                  {analysis.sentiment}
                </div>
              </div>

              {/* Overall Category */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Overall Category</h3>
                <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${getCategoryColor(analysis.category)}`}>
                  {analysis.category}
                </div>
              </div>
            </div>

            {/* Sentiment Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sentiment Breakdown</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{analysis.sentimentBreakdown.positive}</div>
                  <div className="text-sm text-gray-600 mt-1">Positive</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{analysis.sentimentBreakdown.negative}</div>
                  <div className="text-sm text-gray-600 mt-1">Negative</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">{analysis.sentimentBreakdown.neutral}</div>
                  <div className="text-sm text-gray-600 mt-1">Neutral</div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analysis.categoryBreakdown.question}</div>
                  <div className="text-xs text-gray-600 mt-1">Questions</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysis.categoryBreakdown.praise}</div>
                  <div className="text-xs text-gray-600 mt-1">Praise</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{analysis.categoryBreakdown.hate}</div>
                  <div className="text-xs text-gray-600 mt-1">Hate</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{analysis.categoryBreakdown.botSpam}</div>
                  <div className="text-xs text-gray-600 mt-1">Bot/Spam</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{analysis.categoryBreakdown.other}</div>
                  <div className="text-xs text-gray-600 mt-1">Other</div>
                </div>
              </div>
            </div>

            {/* Golden Comment */}
            {analysis.goldenComment && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">⭐</span>
                  <h2 className="text-2xl font-bold text-gray-900">Golden Comment</h2>
                </div>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <p className="text-gray-800 text-lg mb-2">"{analysis.goldenComment.text}"</p>
                  <p className="text-sm text-gray-600">— {analysis.goldenComment.author}</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Why this comment?</p>
                  <p className="text-gray-700">{analysis.goldenComment.reason}</p>
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                All Comments ({analysis.totalComments}
                {videosScanned && videosScanned > 1 && ` from ${videosScanned} videos`})
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-800 font-medium">{comment.author}</p>
                      <span className="text-sm text-gray-500">❤️ {comment.likes}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
