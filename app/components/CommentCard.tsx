'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

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

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const [replies, setReplies] = useState<Comment[]>(comment.replies || []);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allRepliesLoaded, setAllRepliesLoaded] = useState(false);
  const [initialRepliesLoaded, setInitialRepliesLoaded] = useState(false);
  
  // Track if a request is in progress to prevent duplicate calls
  const requestInProgressRef = useRef(false);
  // Track if initial replies have been loaded to prevent re-fetching
  const initialLoadAttemptedRef = useRef(false);

  // Memoize loadInitialReplies to prevent recreation on every render
  const loadInitialReplies = useCallback(async () => {
    // Prevent duplicate requests
    if (!comment.videoId || !comment.tiktokCommentId || loadingReplies || requestInProgressRef.current || initialRepliesLoaded) {
      return;
    }
    
    // Mark that we've attempted to load
    if (initialLoadAttemptedRef.current) {
      return;
    }
    initialLoadAttemptedRef.current = true;
    requestInProgressRef.current = true;
    
    setLoadingReplies(true);
    try {
      // Ensure tiktokCommentId is converted to string
      const requestBody = {
        videoId: String(comment.videoId),
        commentId: String(comment.tiktokCommentId),
        skipApi: true, // Only fetch from Supabase (no API call on page load)
      };

      const response = await fetch('/api/fetch-replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error loading replies:', data.error);
        alert(`Kļūda: ${data.error || 'Neizdevās ielādēt atbildes'}`);
        setInitialRepliesLoaded(true);
        return;
      }

      if (data.replies && Array.isArray(data.replies)) {
        // Take first 3-6 replies for initial load
        const initialReplies = data.replies.slice(0, 6);
        setReplies(initialReplies);
        setInitialRepliesLoaded(true);
        setShowReplies(true); // Always show even if empty to display "no replies" message
        
        // Check if all replies are loaded
        const totalReplies = comment.replyCount || data.total || 0;
        if (data.replies.length >= totalReplies || initialReplies.length >= totalReplies) {
          setAllRepliesLoaded(true);
        }
      } else if (response.ok) {
        // No replies found - mark as loaded but still show the section
        setReplies([]);
        setInitialRepliesLoaded(true);
        setAllRepliesLoaded(true);
        setShowReplies(true); // Show to display "no replies" message
      }
    } catch (error) {
      console.error('Error loading replies:', error);
      alert(`Kļūda: Neizdevās ielādēt atbildes. Skatīt konsoli detalizētu informāciju.`);
      // Reset the attempt flag on error so user can retry
      initialLoadAttemptedRef.current = false;
    } finally {
      setLoadingReplies(false);
      requestInProgressRef.current = false;
    }
  }, [comment.id, comment.videoId, comment.tiktokCommentId, comment.author, comment.hasReplies, comment.replyCount, comment.text, loadingReplies, initialRepliesLoaded]);

  // Auto-load first few replies when component mounts if comment has replies
  // Note: We attempt to load even without replyCount to handle cases where API doesn't return it
  useEffect(() => {
    // Only auto-load if we know there are replies, otherwise let user click button
    if (comment.hasReplies && (comment.replyCount || 0) > 0 && !initialRepliesLoaded && comment.videoId && comment.tiktokCommentId) {
      loadInitialReplies();
    }
  }, [comment.hasReplies, comment.replyCount, comment.videoId, comment.tiktokCommentId, initialRepliesLoaded, loadInitialReplies]);

  const fetchMoreReplies = async () => {
    if (!comment.videoId || !comment.tiktokCommentId || loadingMore || allRepliesLoaded) return;
    
    setLoadingMore(true);
    try {
      const response = await fetch('/api/fetch-replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: comment.videoId,
          commentId: comment.tiktokCommentId,
          skipApi: false, // Allow API calls when user explicitly requests more replies
        }),
      });

      const data = await response.json();

      if (response.ok && data.replies) {
        // Append new replies to existing ones
        setReplies(prevReplies => {
          const newReplies = data.replies.filter(
            (newReply: Comment) => !prevReplies.some(prev => prev.id === newReply.id)
          );
          return [...prevReplies, ...newReplies];
        });
        
        // Check if all replies are loaded
        if (replies.length + data.replies.length >= (comment.replyCount || 0)) {
          setAllRepliesLoaded(true);
        }
      }
    } catch (error) {
      console.error('Error fetching more replies:', error);
    } finally {
      setLoadingMore(false);
    }
  };
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

  const replyCount = comment.replyCount || replies.length;
  const hasReplies = comment.hasReplies || replyCount > 0 || replies.length > 0;

  return (
    <div className="space-y-2">
      {/* Main Comment */}
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

        {/* Show/Hide Replies Button - Only show if comment has replies */}
        {hasReplies && (
          <div className="mt-3 pt-3 border-t border-gray-800">
            <button
              onClick={() => {
                if (!initialRepliesLoaded && !showReplies) {
                  loadInitialReplies();
                } else {
                  setShowReplies(!showReplies);
                }
              }}
              disabled={loadingReplies}
              className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {loadingReplies ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Ielādē...</span>
                </>
              ) : showReplies ? (
                <>
                  <span>▼</span>
                  <span>Paslēpt atbildes{replyCount > 0 ? ` (${replyCount})` : ''}</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Rādīt atbildes{replyCount > 0 ? ` (${replyCount})` : ''}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {showReplies && (
        <div className="ml-4 md:ml-8 space-y-2 border-l-2 border-cyan-500/20 pl-4">
          {replies.length > 0 ? (
            <>
              {replies.map((reply) => (
                <CommentCard key={reply.id} comment={reply} />
              ))}
              
              {/* Load More Replies Button */}
              {!allRepliesLoaded && replyCount > replies.length && (
                <div className="pt-2">
                  <button
                    onClick={fetchMoreReplies}
                    disabled={loadingMore}
                    className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Ielādē vairāk...</span>
                      </>
                    ) : (
                      <>
                        <span>+</span>
                        <span>Ielādēt vairāk atbildes ({replyCount - replies.length} atlikušas)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-500 text-sm py-2">
              Nav atbilžu
            </div>
          )}
        </div>
      )}
    </div>
  );
}
