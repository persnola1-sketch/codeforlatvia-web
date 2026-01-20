import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

// Helper function to delay execution (for rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to extract username from profile URL
function extractUsername(profileUrl: string): string | null {
  const match = profileUrl.match(/@([\w\.-]+)/);
  return match ? match[1] : null;
}

// Helper function to extract video_id from video URL
function extractVideoId(videoUrl: string): string | null {
  // Match patterns like /video/1234567890 or /photo/1234567890
  const match = videoUrl.match(/\/(video|photo)\/(\d+)/);
  return match ? match[2] : null;
}

// Helper function to get monthly request count
async function getMonthlyRequestCount(): Promise<number> {
  try {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM format
    
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('api_usage')
      .select('request_count')
      .eq('month', month)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error getting monthly request count:', error);
      return 0;
    }

    return data?.request_count || 0;
  } catch (error) {
    console.error('Error in getMonthlyRequestCount:', error);
    return 0;
  }
}

// Helper function to track API request
async function trackApiRequest(): Promise<void> {
  try {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM format
    
    // Get current count
    const currentCount = await getMonthlyRequestCount();
    const newCount = currentCount + 1;

    // Upsert the record
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('api_usage')
      .upsert({
        month: month,
        request_count: newCount,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'month',
      });

    if (error) {
      console.error('Error tracking API request:', error);
      return;
    }

    // Log usage
    console.log(`[RapidAPI Usage] ${newCount}/200000 requests used this month`);
    
    // Warn if approaching limit
    if (newCount >= 190000) {
      console.warn(`[WARNING] Approaching API limit: ${newCount}/200000`);
    }
  } catch (error) {
    console.error('Error in trackApiRequest:', error);
  }
}

// Helper function to check if comment exists
async function checkCommentExists(
  username: string,
  videoId: string,
  commentText: string
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('comments')
      .select('id')
      .eq('username', username)
      .eq('video_id', videoId)
      .eq('comment_text', commentText)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking comment existence:', error);
      return false; // Assume doesn't exist on error
    }

    return !!data;
  } catch (error) {
    console.error('Error in checkCommentExists:', error);
    return false; // Assume doesn't exist on error
  }
}

// Helper function to insert comment
async function insertComment(
  username: string,
  videoId: string,
  commentText: string,
  likes: number,
  timestamp: number,
  parentCommentId?: string,
  tiktokCommentId?: string
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const insertData: any = {
      username,
      video_id: videoId,
      comment_text: commentText,
      likes,
      timestamp,
    };
    
    if (parentCommentId) {
      insertData.parent_comment_id = parentCommentId;
    }
    
    if (tiktokCommentId) {
      insertData.tiktok_comment_id = tiktokCommentId;
    }
    
    const { error } = await supabase
      .from('comments')
      .insert(insertData);

    if (error) {
      // If it's a unique constraint violation, that's okay - comment already exists
      if (error.code === '23505') {
        return false; // Comment already exists
      }
      console.error('Error inserting comment:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in insertComment:', error);
    return false;
  }
}

// Helper function to upsert user
async function upsertUser(username: string): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    // First, try to get existing user
    const { data: existingUser } = await supabase
      .from('users')
      .select('total_comments')
      .eq('username', username)
      .single();

    if (existingUser) {
      // User exists - increment total_comments and update last_active
      const { error } = await supabase
        .from('users')
        .update({
          total_comments: (existingUser.total_comments || 0) + 1,
          last_active: new Date().toISOString(),
        })
        .eq('username', username);

      if (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // User doesn't exist - create new user
      const { error } = await supabase
        .from('users')
        .insert({
          username,
          total_comments: 1,
          last_active: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating user:', error);
      }
    }
  } catch (error) {
    console.error('Error in upsertUser:', error);
  }
}

// Helper function to recursively fetch replies from Supabase for a parent comment
async function fetchRepliesFromSupabase(parentCommentId: string, videoId: string): Promise<any[]> {
  try {
    const supabase = getSupabaseClient();
    
    // Fetch all direct replies to this parent comment
    const { data: replies, error } = await supabase
      .from('comments')
      .select('id, username, comment_text, likes, timestamp, tiktok_comment_id, video_id')
      .eq('parent_comment_id', parentCommentId)
      .eq('video_id', videoId)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching replies from Supabase:', error);
      return [];
    }

    if (!replies || replies.length === 0) {
      return [];
    }

    // Format replies to match the expected structure and recursively fetch nested replies
    const formattedReplies = await Promise.all(
      replies.map(async (reply) => {
        // Recursively fetch nested replies (replies to replies)
        const nestedReplies = await fetchRepliesFromSupabase(reply.id, videoId);
        
        return {
          id: reply.tiktok_comment_id || reply.id,
          text: reply.comment_text,
          author: reply.username,
          likes: reply.likes || 0,
          timestamp: reply.timestamp,
          tiktokCommentId: reply.tiktok_comment_id || null,
          videoId: reply.video_id,
          replyCount: nestedReplies.length,
          hasReplies: nestedReplies.length > 0,
          replies: nestedReplies.length > 0 ? nestedReplies : undefined,
        };
      })
    );

    return formattedReplies;
  } catch (error) {
    console.error('Error in fetchRepliesFromSupabase:', error);
    return [];
  }
}

// Helper function to find parent comment UUID with fallback mechanisms
async function findParentCommentUuid(
  videoId: string,
  tiktokCommentId: string,
  username?: string,
  commentText?: string
): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    
    // First, try to find by tiktok_comment_id (primary method)
    const { data: parentCommentById, error: errorById } = await supabase
      .from('comments')
      .select('id')
      .eq('video_id', videoId)
      .eq('tiktok_comment_id', tiktokCommentId)
      .is('parent_comment_id', null) // Only top-level comments can have replies
      .single();

    if (!errorById && parentCommentById?.id) {
      return parentCommentById.id;
    }

    // Fallback: Try to find by username + video_id + comment_text if provided
    if (username && commentText) {
      const { data: parentCommentByText, error: errorByText } = await supabase
        .from('comments')
        .select('id')
        .eq('video_id', videoId)
        .eq('username', username)
        .eq('comment_text', commentText)
        .is('parent_comment_id', null)
        .single();

      if (!errorByText && parentCommentByText?.id) {
        console.warn(`Parent comment found by fallback method (text) for TikTok comment ID ${tiktokCommentId}`);
        return parentCommentByText.id;
      }
    }

    // If still not found, log warning
    console.warn(`Parent comment not found for TikTok comment ID ${tiktokCommentId}, video ${videoId}`);
    if (errorById && errorById.code !== 'PGRST116') {
      console.error('Error finding parent comment:', errorById);
    }

    return null;
  } catch (error) {
    console.error('Error in findParentCommentUuid:', error);
    return null;
  }
}

// Helper function to check when a video was last synced with TikTok API
async function checkLastSyncTime(videoId: string): Promise<Date | null> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('video_sync')
      .select('last_synced_at')
      .eq('video_id', videoId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking last sync time:', error);
      return null;
    }

    return data?.last_synced_at ? new Date(data.last_synced_at) : null;
  } catch (error) {
    console.error('Error in checkLastSyncTime:', error);
    return null;
  }
}

// Helper function to update sync timestamp for a video
async function updateSyncTime(videoId: string): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    const now = new Date().toISOString();
    
    const { error } = await supabase
      .from('video_sync')
      .upsert({
        video_id: videoId,
        last_synced_at: now,
        updated_at: now,
      }, {
        onConflict: 'video_id',
      });

    if (error) {
      console.error('Error updating sync time:', error);
    }
  } catch (error) {
    console.error('Error in updateSyncTime:', error);
  }
}

// Helper function to check if API sync is needed (10 minutes have passed)
async function shouldSyncWithAPI(videoId: string): Promise<boolean> {
  const lastSync = await checkLastSyncTime(videoId);
  
  // If never synced, we need to sync
  if (!lastSync) {
    return true;
  }

  // Check if 10 minutes (600,000 milliseconds) have passed
  const now = Date.now();
  const lastSyncTime = lastSync.getTime();
  const tenMinutesInMs = 10 * 60 * 1000; // 10 minutes
  
  const timeSinceLastSync = now - lastSyncTime;
  const shouldSync = timeSinceLastSync >= tenMinutesInMs;

    // Silent check - only log if sync is needed (for debugging)
    if (shouldSync) {
      console.log(`API sync needed for video ${videoId}`);
    }

  return shouldSync;
}

// Helper function to fetch comments from Supabase only (no API call)
async function fetchCommentsFromSupabase(videoId: string): Promise<any[]> {
  try {
    const supabase = getSupabaseClient();
    
    // Fetch all top-level comments (where parent_comment_id is NULL) for this video
    const { data: topLevelComments, error } = await supabase
      .from('comments')
      .select('id, username, comment_text, likes, timestamp, tiktok_comment_id, video_id')
      .eq('video_id', videoId)
      .is('parent_comment_id', null)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching comments from Supabase:', error);
      return [];
    }

    if (!topLevelComments || topLevelComments.length === 0) {
      return [];
    }

    // Build nested comment structure with replies from Supabase
    const commentsWithReplies = await Promise.all(
      topLevelComments.map(async (dbComment) => {
        // Fetch replies for this comment from Supabase
        const replies = await fetchRepliesFromSupabase(dbComment.id, videoId);
        
        return {
          id: dbComment.tiktok_comment_id || dbComment.id,
          text: dbComment.comment_text,
          author: dbComment.username,
          likes: dbComment.likes || 0,
          timestamp: dbComment.timestamp,
          tiktokCommentId: dbComment.tiktok_comment_id || null,
          videoId: dbComment.video_id,
          replyCount: replies.length,
          hasReplies: replies.length > 0,
          replies: replies.length > 0 ? replies : undefined,
        };
      })
    );

    return commentsWithReplies;
  } catch (error) {
    console.error('Error in fetchCommentsFromSupabase:', error);
    return [];
  }
}

// Helper function to fetch comments for a single video
async function fetchCommentsForVideo(
  videoUrl: string,
  rapidApiKey: string
): Promise<any[]> {
  // Extract video_id for API calls and database operations
  const videoId = extractVideoId(videoUrl);
  
  if (!videoId) {
    console.error(`Could not extract video ID from URL: ${videoUrl}`);
    return [];
  }

  let allComments: any[] = [];
  let cursor = 0;
  let hasMore = true;

  // Paginate through all comments for this video
  while (hasMore) {
    const apiUrl = `https://tiktok-api23.p.rapidapi.com/api/post/comments?videoId=${videoId}&count=50&cursor=${cursor}`;
    
    // Track API request before making the call
    await trackApiRequest();
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching comments for video ${videoId}:`, errorText);
      break; // Continue with next video if this one fails
    }

    const data = await response.json();
    
    // Extract comments from the Apibox TikTok API response
    // The response format may vary, so we check multiple possible structures
    let comments: any[] = [];
    if (data.data?.comments && Array.isArray(data.data.comments)) {
      comments = data.data.comments;
      console.log(`Found comments in data.data.comments: ${comments.length} comments`);
    } else if (data.data && Array.isArray(data.data)) {
      comments = data.data;
      console.log(`Found comments in data.data: ${comments.length} comments`);
    } else if (data.comments && Array.isArray(data.comments)) {
      comments = data.comments;
      console.log(`Found comments in data.comments: ${comments.length} comments`);
    } else if (Array.isArray(data)) {
      comments = data;
      console.log(`Found comments as root array: ${comments.length} comments`);
    } else {
      console.warn('No comments found in API response. Response structure:', Object.keys(data));
    }

    // Format comments to a consistent structure
    const formattedComments = comments.map((comment: any) => {
      // Try multiple possible field names for reply count
      // Check reply_comment_total first (the actual TikTok API field name)
      const replyCount = comment.reply_comment_total ||
                        (Array.isArray(comment.reply_comment) ? comment.reply_comment.length : null) ||
                        comment.reply_count || 
                        comment.replyCount || 
                        comment.reply_total || 
                        comment.replies_count ||
                        comment.reply_info?.reply_count ||
                        comment.reply_info?.replyCount ||
                        comment.reply_info?.reply_total ||
                        comment.reply_info?.reply_count_total ||
                        (comment.reply_info && typeof comment.reply_info === 'number' ? comment.reply_info : null) ||
                        (Array.isArray(comment.replies) ? comment.replies.length : null) ||
                        0;
      const hasReplies = replyCount > 0;
      
      return {
        id: comment.comment_id || comment.id || comment.cid || Math.random().toString(),
        text: comment.text || comment.comment_text || comment.content || comment.text_raw || '',
        author: comment.user?.nickname || comment.user?.unique_id || comment.author || comment.username || comment.user_name || 'Unknown',
        likes: comment.digg_count || comment.likes || comment.like_count || comment.digg_count || 0,
        timestamp: comment.create_time || comment.timestamp || comment.created_at || Date.now(),
        tiktokCommentId: comment.comment_id || comment.id || comment.cid || null,
        replyCount: replyCount,
        videoId: videoId, // Include videoId for fetching replies
        hasReplies: hasReplies,
      };
    }).filter((comment: any) => comment.text && comment.text.trim().length > 0);

    // Process each comment through database
    for (const comment of formattedComments) {
      const username = comment.author;
      const commentText = comment.text;
      const tiktokCommentId = comment.tiktokCommentId;
      
      // Check if comment already exists
      const exists = await checkCommentExists(username, videoId, commentText);
      
      if (!exists) {
        // Insert new comment (without parent_comment_id for top-level comments)
        const inserted = await insertComment(
          username,
          videoId,
          commentText,
          comment.likes,
          comment.timestamp,
          undefined, // parentCommentId - not set for top-level comments
          tiktokCommentId // Store TikTok comment ID for reply linking
        );
        
        // If successfully inserted, upsert user
        if (inserted) {
          await upsertUser(username);
        }
      } else if (tiktokCommentId) {
        // Update existing comment if it doesn't have tiktok_comment_id
        const supabase = getSupabaseClient();
        const { data: existingComment } = await supabase
          .from('comments')
          .select('id, tiktok_comment_id')
          .eq('username', username)
          .eq('video_id', videoId)
          .eq('comment_text', commentText)
          .is('parent_comment_id', null)
          .single();
        
        if (existingComment && !existingComment.tiktok_comment_id) {
          // Update the comment with tiktok_comment_id if missing
          const { error: updateError } = await supabase
            .from('comments')
            .update({ tiktok_comment_id: tiktokCommentId })
            .eq('id', existingComment.id);
          
          if (updateError) {
            console.error('Error updating comment with tiktok_comment_id:', updateError);
          }
        }
      }
    }

    allComments = allComments.concat(formattedComments);

    // Check if there are more comments (pagination)
    // Apibox API uses numeric cursor, check if has_more or next cursor exists
    const nextCursor = data.cursor !== undefined ? data.cursor : (data.data?.cursor !== undefined ? data.data.cursor : cursor + 50);
    const hasMoreFlag = data.has_more !== undefined ? data.has_more : (data.data?.has_more !== undefined ? data.data.has_more : formattedComments.length === 50);
    
    hasMore = hasMoreFlag && (nextCursor !== cursor || formattedComments.length === 50);
    cursor = typeof nextCursor === 'number' ? nextCursor : (cursor + 50);

    // Rate limiting: delay between pagination requests
    if (hasMore) {
      await delay(500); // 500ms delay between comment pagination requests
    }
  }

  return allComments;
}

// Helper function to fetch replies for a specific comment
async function fetchCommentReplies(
  videoId: string,
  commentId: string,
  rapidApiKey: string
): Promise<any[]> {
  let allReplies: any[] = [];
  let cursor = 0;
  let hasMore = true;

  // Paginate through all replies for this comment
  while (hasMore) {
    const apiUrl = `https://tiktok-api23.p.rapidapi.com/api/post/comment/replies?videoId=${videoId}&commentId=${commentId}&count=6&cursor=${cursor}`;
    
    // Track API request before making the call
    await trackApiRequest();
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching replies for comment ${commentId}:`, errorText);
      break;
    }

    const data = await response.json();
    
    // Extract replies from the Apibox TikTok API response
    // TikTok API returns replies in different structures, check them in order
    let replies: any[] = [];
    if (data.comments && Array.isArray(data.comments)) {
      // Most common structure: replies are in 'comments' array at root level
      replies = data.comments;
      console.log(`Found replies in data.comments: ${replies.length} replies`);
    } else if (data.data?.replies && Array.isArray(data.data.replies)) {
      replies = data.data.replies;
      console.log(`Found replies in data.data.replies: ${replies.length} replies`);
    } else if (data.data && Array.isArray(data.data)) {
      replies = data.data;
      console.log(`Found replies in data.data: ${replies.length} replies`);
    } else if (data.replies && Array.isArray(data.replies)) {
      replies = data.replies;
      console.log(`Found replies in data.replies: ${replies.length} replies`);
    } else if (Array.isArray(data)) {
      replies = data;
      console.log(`Found replies as root array: ${replies.length} replies`);
    } else {
      console.warn('No replies found in API response. Response structure:', Object.keys(data));
    }

    // Format replies to a consistent structure
    const formattedReplies = replies.map((reply: any) => ({
      id: reply.comment_id || reply.id || reply.cid || Math.random().toString(),
      text: reply.text || reply.comment_text || reply.content || reply.text_raw || '',
      author: reply.user?.nickname || reply.user?.unique_id || reply.author || reply.username || reply.user_name || 'Unknown',
      likes: reply.digg_count || reply.likes || reply.like_count || reply.digg_count || 0,
      timestamp: reply.create_time || reply.timestamp || reply.created_at || Date.now(),
      tiktokCommentId: reply.comment_id || reply.id || reply.cid || null,
      videoId: videoId,
      parent_comment_id: commentId,
    })).filter((reply: any) => reply.text && reply.text.trim().length > 0);

    // Look up parent comment UUID before processing replies
    const supabase = getSupabaseClient();
    const { data: parentComment, error: parentError } = await supabase
      .from('comments')
      .select('id')
      .eq('video_id', videoId)
      .eq('tiktok_comment_id', commentId)
      .is('parent_comment_id', null)
      .single();
    
    const parentCommentUuid = parentComment?.id;
    
    if (!parentCommentUuid) {
      console.warn(`Parent comment UUID not found for TikTok comment ID ${commentId} when fetching replies - will store replies without parent link`);
      if (parentError && parentError.code !== 'PGRST116') {
        console.error('Error looking up parent comment:', parentError);
      }
    }

    // Process each reply through database
    for (const reply of formattedReplies) {
      const username = reply.author;
      const replyText = reply.text;
      const replyTiktokCommentId = reply.tiktokCommentId;
      
      // Check if reply already exists
      const exists = await checkCommentExists(username, videoId, replyText);
      
      if (exists) {
        continue; // Skip if already exists
      }
      
      if (parentCommentUuid) {
        // Insert new reply with parent_comment_id and tiktok_comment_id
        const inserted = await insertComment(
          username,
          videoId,
          replyText,
          reply.likes,
          reply.timestamp,
          parentCommentUuid, // Link to parent comment UUID
          replyTiktokCommentId // Store TikTok comment ID for this reply
        );
        
        // If successfully inserted, upsert user
        if (inserted) {
          await upsertUser(username);
        }
      } else {
        // Still insert the reply even if parent UUID is not found (for future linking)
        const inserted = await insertComment(
          username,
          videoId,
          replyText,
          reply.likes,
          reply.timestamp,
          undefined, // No parent link available
          replyTiktokCommentId // Store TikTok comment ID
        );
        
        if (inserted) {
          await upsertUser(username);
        }
      }
    }

    allReplies = allReplies.concat(formattedReplies);

    // Check if there are more replies (pagination)
    const nextCursor = data.cursor !== undefined ? data.cursor : (data.data?.cursor !== undefined ? data.data.cursor : cursor + 6);
    const hasMoreFlag = data.has_more !== undefined ? data.has_more : (data.data?.has_more !== undefined ? data.data.has_more : formattedReplies.length === 6);
    
    hasMore = hasMoreFlag && (nextCursor !== cursor || formattedReplies.length === 6);
    cursor = typeof nextCursor === 'number' ? nextCursor : (cursor + 6);

    // Rate limiting: delay between pagination requests
    if (hasMore) {
      await delay(500); // 500ms delay between reply pagination requests
    }
  }

  return allReplies;
}

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, skipApi } = await request.json();

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL or profile URL is required' },
        { status: 400 }
      );
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;

    if (!rapidApiKey) {
      return NextResponse.json(
        { error: 'RapidAPI key is not configured' },
        { status: 500 }
      );
    }

    // Check monthly API request limit before proceeding
    const currentRequestCount = await getMonthlyRequestCount();
    if (currentRequestCount >= 200000) {
      return NextResponse.json(
        { error: 'Monthly RapidAPI request limit (200000) has been reached. Please try again next month.' },
        { status: 429 }
      );
    }

    // Detect URL type: profile, video, or photo post
    const isProfileUrl = /^https?:\/\/(www\.)?(vm\.|vt\.)?tiktok\.com\/@[\w\.-]+\/?(\?.*)?$/.test(videoUrl);
    const isVideoUrl = /\/(video|photo)\/\d+/.test(videoUrl); // Support both video and photo posts

    // Handle profile URL
    if (isProfileUrl && !isVideoUrl) {
      const username = extractUsername(videoUrl);
      
      if (!username) {
        return NextResponse.json(
          { error: 'Invalid profile URL format. Expected format: https://www.tiktok.com/@username' },
          { status: 400 }
        );
      }

      // Fetch all videos from profile using TikTok Scraper API
      // NOTE: Profile fetching still uses the old API (tiktok-scraper7) because
      // Apibox TikTok API may use a different endpoint structure for profile fetching.
      // This section may need to be updated when the new profile endpoint is confirmed.
      // Try different possible endpoint patterns
      let allVideoUrls: string[] = [];
      let cursor = '';
      let hasMore = true;
      const maxVideos = 1000; // Safety limit
      let videoCount = 0;

      while (hasMore && videoCount < maxVideos) {
        // Check API limit before each request
        const requestCount = await getMonthlyRequestCount();
        if (requestCount >= 200000) {
          console.warn('[WARNING] API limit reached during profile fetch');
          break;
        }

        // Try profile endpoint - common patterns for TikTok Scraper API
        // Pattern 1: Using full profile URL (similar to comment/list)
        const encodedProfileUrl = encodeURIComponent(`https://www.tiktok.com/@${username}`);
        let profileApiUrl = `https://tiktok-scraper7.p.rapidapi.com/user/posts?url=${encodedProfileUrl}&count=30&cursor=${cursor}`;

        // Track API request
        await trackApiRequest();

        let response = await fetch(profileApiUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
          },
        });

        // If first pattern fails, try alternative pattern
        if (!response.ok) {
          // Pattern 2: Using username parameter
          profileApiUrl = `https://tiktok-scraper7.p.rapidapi.com/user/posts?username=${username}&count=30&cursor=${cursor}`;
          
          // Track API request for retry
          await trackApiRequest();
          
          response = await fetch(profileApiUrl, {
            method: 'GET',
            headers: {
              'x-rapidapi-key': rapidApiKey,
              'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('RapidAPI Profile Error:', errorText);
            
            // If both patterns fail, return helpful error
            return NextResponse.json(
              { error: `Failed to fetch profile videos. The TikTok Scraper API endpoint may need adjustment. Status: ${response.statusText}` },
              { status: response.status }
            );
          }
        }

        const data = await response.json();
        const videoData = data.data || data;

        // Extract video URLs from response
        const videos = Array.isArray(videoData) ? videoData : (videoData?.items || videoData?.videos || videoData?.list || []);
        const batchCount = videos.length;
        
        videos.forEach((video: any) => {
          const videoId = video.video_id || video.aweme_id || video.id;
          if (videoId) {
            allVideoUrls.push(`https://www.tiktok.com/@${username}/video/${videoId}`);
          } else if (video.url) {
            allVideoUrls.push(video.url);
          } else if (video.share_url) {
            allVideoUrls.push(video.share_url);
          }
        });

        videoCount += batchCount;

        // Check pagination
        const nextCursor = data.cursor || data.data?.cursor || data.hasMore;
        hasMore = !!nextCursor && nextCursor !== cursor && batchCount > 0;
        cursor = nextCursor || '';

        // Rate limiting: delay between profile pagination requests
        if (hasMore) {
          await delay(1000); // 1 second delay between profile pagination requests
        }
      }

      if (allVideoUrls.length === 0) {
        return NextResponse.json(
          { error: 'No videos found for this profile' },
          { status: 404 }
        );
      }

      // Fetch comments from all videos
      const allComments: any[] = [];
      
      for (let i = 0; i < allVideoUrls.length; i++) {
        // Check API limit before each video
        const requestCount = await getMonthlyRequestCount();
        if (requestCount >= 200000) {
          console.warn('[WARNING] API limit reached during comment fetch');
          break;
        }

        const videoUrl = allVideoUrls[i];
        const videoId = extractVideoId(videoUrl);
        try {
          const videoComments = await fetchCommentsForVideo(videoUrl, rapidApiKey);
          
          // For profile view, we'll attach replies from Supabase for each video
          if (videoId) {
            const supabase = getSupabaseClient();
            const { data: topLevelComments } = await supabase
              .from('comments')
              .select('id, username, comment_text, likes, timestamp, tiktok_comment_id, video_id')
              .eq('video_id', videoId)
              .is('parent_comment_id', null)
              .order('timestamp', { ascending: false });

            if (topLevelComments && topLevelComments.length > 0) {
              // Create a map of API comments by tiktokCommentId for quick lookup
              const apiCommentMap = new Map<string, any>(
                videoComments
                  .map((c: any) => [c.tiktokCommentId, c] as [string, any])
                  .filter(([id]) => id)
              );

              // Build comments with nested replies
              const commentsWithReplies = await Promise.all(
                topLevelComments.map(async (dbComment) => {
                  const replies = await fetchRepliesFromSupabase(dbComment.id, videoId);
                  const apiComment = dbComment.tiktok_comment_id 
                    ? apiCommentMap.get(dbComment.tiktok_comment_id)
                    : null;

                  return {
                    id: dbComment.tiktok_comment_id || dbComment.id,
                    text: dbComment.comment_text,
                    author: dbComment.username,
                    likes: dbComment.likes || 0,
                    timestamp: dbComment.timestamp,
                    tiktokCommentId: dbComment.tiktok_comment_id || null,
                    videoId: dbComment.video_id,
                    replyCount: replies.length,
                    hasReplies: replies.length > 0,
                    replies: replies.length > 0 ? replies : undefined,
                    ...(apiComment ? {
                      replyCount: apiComment.replyCount || replies.length,
                      hasReplies: apiComment.hasReplies || replies.length > 0,
                    } : {}),
                  };
                })
              );

              // Merge with API comments
              const dbCommentIds = new Set(
                commentsWithReplies.map((c: any) => c.tiktokCommentId).filter(Boolean)
              );
              const newApiComments = videoComments.filter(
                (c: any) => c.tiktokCommentId && !dbCommentIds.has(c.tiktokCommentId)
              );
              
              allComments.push(...commentsWithReplies, ...newApiComments);
            } else {
              allComments.push(...videoComments);
            }
          } else {
            allComments.push(...videoComments);
          }
        } catch (error: any) {
          console.error(`Error fetching comments for video ${i + 1}/${allVideoUrls.length}:`, error.message);
          // Continue with next video even if one fails
        }

        // Rate limiting: delay between video requests (except for the last one)
        if (i < allVideoUrls.length - 1) {
          await delay(1000); // 1 second delay between video requests
        }
      }

      // Format comments
      const formattedComments = allComments.filter((comment: any) => comment.text && comment.text.trim().length > 0);

      return NextResponse.json({
        success: true,
        comments: formattedComments,
        total: formattedComments.length,
        videosScanned: allVideoUrls.length,
        isProfile: true,
      });
    }

    // Handle single video URL (existing functionality)
    if (isVideoUrl) {
      const videoId = extractVideoId(videoUrl);
      
      if (!videoId) {
        return NextResponse.json(
          { error: 'Invalid video URL format' },
          { status: 400 }
        );
      }

      // Always fetch comments from Supabase first (instant response)
      let formattedComments = await fetchCommentsFromSupabase(videoId);
      
      const lastSync = await checkLastSyncTime(videoId);
      let isFromCache = true; // Always from cache when skipApi is true or when not syncing
      
      // Calculate next sync time (10 minutes from last sync, or null if never synced)
      let nextSyncAt: Date | null = null;
      if (lastSync) {
        // Next sync is 10 minutes from last sync
        nextSyncAt = new Date(lastSync.getTime() + 10 * 60 * 1000);
      }

      // Only call TikTok API if skipApi is false (button press)
      // skipApi=true means only fetch from Supabase (for page loads)
      if (!skipApi) {
        // Check if sync is needed (10 minutes have passed since last sync)
        const needsSync = await shouldSyncWithAPI(videoId);
        
        // Only call TikTok API if sync is needed
        if (needsSync) {
          console.log(`Syncing with TikTok API for video ${videoId} (button pressed)`);
          
          // Check API limit before syncing
          const currentRequestCount = await getMonthlyRequestCount();
          if (currentRequestCount >= 200000) {
            console.warn('[WARNING] API limit reached, skipping sync');
            // Return cached comments with sync info
            return NextResponse.json({
              success: true,
              comments: formattedComments,
              total: formattedComments.length,
              videosScanned: 1,
              isProfile: false,
              isFromCache: true,
              lastSyncedAt: lastSync?.toISOString() || null,
              nextSyncAt: nextSyncAt?.toISOString() || null,
              apiLimitReached: true,
            });
          }

          // Fetch from TikTok API
          const allComments = await fetchCommentsForVideo(videoUrl, rapidApiKey);
          
          // After syncing comments, also fetch replies for comments that have replies
          // This ensures new replies are stored in the database
          
          // Wait a moment to ensure all comments are saved to database
          await delay(500); // Increased delay to ensure comments are saved
          
          // Fetch replies for comments that have replies
          for (const comment of allComments) {
            const hasRepliesFlag = comment.hasReplies;
            const hasTiktokId = !!comment.tiktokCommentId;
            const replyCountValue = comment.replyCount || 0;
            const replyCountCheck = replyCountValue > 0;
            
            if (hasRepliesFlag && hasTiktokId && replyCountCheck) {
              try {
                // Find parent comment UUID - use username and text as fallback since comment was just saved
                const parentCommentUuid = await findParentCommentUuid(
                  videoId, 
                  comment.tiktokCommentId,
                  comment.author,  // Pass username for fallback lookup
                  comment.text      // Pass comment text for fallback lookup
                );
                
                if (parentCommentUuid) {
                  // Check if replies already exist in Supabase
                  const existingReplies = await fetchRepliesFromSupabase(parentCommentUuid, videoId);
                  
                  // Only fetch from API if no replies exist yet or if reply count increased
                  if (!existingReplies || existingReplies.length === 0 || existingReplies.length < (comment.replyCount || 0)) {
                    // Use the fetchCommentReplies function to fetch and store replies
                    // This will fetch from TikTok API and store them in Supabase with proper parent_comment_id
                    await fetchCommentReplies(videoId, comment.tiktokCommentId, rapidApiKey);
                    
                    // Small delay to avoid rate limiting
                    await delay(200);
                  }
                } else {
                  // Try to fetch replies even if parent UUID not found - they'll be stored without parent link
                  // This can happen if comment was just saved and lookup hasn't caught up yet
                  await fetchCommentReplies(videoId, comment.tiktokCommentId, rapidApiKey);
                  
                  await delay(200);
                }
              } catch (error) {
                console.error(`Error fetching replies for comment ${comment.tiktokCommentId}:`, error);
                // Continue with other comments even if one fails
              }
            }
          }
          
          // Update sync time
          await updateSyncTime(videoId);
          
          // Re-fetch from Supabase after API sync to get updated comments with replies
          formattedComments = await fetchCommentsFromSupabase(videoId);
          
          // Update nextSyncAt since we just synced
          nextSyncAt = new Date(Date.now() + 10 * 60 * 1000);
          isFromCache = false; // We just synced with API
          } else {
            // Update nextSyncAt based on when sync will be available
          if (lastSync) {
            nextSyncAt = new Date(lastSync.getTime() + 10 * 60 * 1000);
          }
        }
      }

      return NextResponse.json({
        success: true,
        comments: formattedComments,
        total: formattedComments.length,
        videosScanned: 1,
        isProfile: false,
        isFromCache: isFromCache,
        lastSyncedAt: lastSync?.toISOString() || null,
        nextSyncAt: nextSyncAt?.toISOString() || null,
      });
    }

    // If neither profile nor video URL pattern matches
    return NextResponse.json(
      { error: 'Invalid URL format. Please provide either a TikTok video URL or profile URL.' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
