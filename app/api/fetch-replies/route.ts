import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

// Helper function to delay execution (for rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

// Helper function to find parent comment UUID with fallback mechanisms
async function findParentCommentUuid(
  videoId: string,
  tiktokCommentId: string,
  username?: string,
  commentText?: string
): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    
    // Ensure tiktokCommentId is a string (database expects TEXT)
    const tiktokCommentIdStr = String(tiktokCommentId);
    
    // First, try to find by tiktok_comment_id (primary method)
    const { data: parentCommentById, error: errorById } = await supabase
      .from('comments')
      .select('id')
      .eq('video_id', videoId)
      .eq('tiktok_comment_id', tiktokCommentIdStr)
      .is('parent_comment_id', null) // Only top-level comments can have replies
      .maybeSingle();

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
        .maybeSingle();

      if (!errorByText && parentCommentByText?.id) {
        console.warn(`Parent comment found by fallback method (text) for TikTok comment ID ${tiktokCommentIdStr}`);
        return parentCommentByText.id;
      }
    }

    // If still not found, log warning
    console.warn(`Parent comment not found for TikTok comment ID ${tiktokCommentIdStr}, video ${videoId}`);
    if (errorById && errorById.code !== 'PGRST116') {
      console.error('Error finding parent comment:', errorById);
    }

    return null;
  } catch (error) {
    console.error('[findParentCommentUuid] Exception in findParentCommentUuid:', error);
    return null;
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

// Helper function to fetch replies for a specific comment
async function fetchCommentReplies(
  videoId: string,
  commentId: string,
  rapidApiKey: string,
  forceRefresh: boolean = false
): Promise<any[]> {
  // First, try to fetch replies from Supabase (unless force refresh is requested)
  if (!forceRefresh) {
    const parentCommentUuid = await findParentCommentUuid(videoId, commentId);
    
    if (parentCommentUuid) {
      const supabaseReplies = await fetchRepliesFromSupabase(parentCommentUuid, videoId);
      
      if (supabaseReplies && supabaseReplies.length > 0) {
        return supabaseReplies;
      }
    }
  }

  // If no replies in Supabase or force refresh, fetch from TikTok API
  let allReplies: any[] = [];
  let cursor = 0;
  let hasMore = true;

  // Look up parent comment UUID before processing replies
  const parentCommentUuid = await findParentCommentUuid(videoId, commentId);
  
  if (!parentCommentUuid) {
    console.warn(`Parent comment UUID not found for TikTok comment ID ${commentId}, replies will be stored without parent link`);
  }

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
      console.error(`Error fetching replies for comment ${commentId}:`, {
        status: response.status,
        statusText: response.statusText,
        errorText
      });
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
      videoId: videoId, // Include videoId for consistency
      replyCount: reply.reply_count || reply.replyCount || 0,
      hasReplies: (reply.reply_count || reply.replyCount || 0) > 0,
    })).filter((reply: any) => reply.text && reply.text.trim().length > 0);

    // Process each reply through database
    for (const reply of formattedReplies) {
      const username = reply.author;
      const replyText = reply.text;
      const replyTiktokCommentId = reply.tiktokCommentId;
      
      // Check if reply already exists
      const exists = await checkCommentExists(username, videoId, replyText);
      
      if (!exists && parentCommentUuid) {
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
      } else if (!exists && !parentCommentUuid) {
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
    const { videoId, commentId, forceRefresh, skipApi } = await request.json();

    if (!videoId || !commentId) {
      return NextResponse.json(
        { error: 'Both videoId and commentId are required' },
        { status: 400 }
      );
    }

    // If skipApi is true, only fetch from Supabase (no TikTok API call)
    // This is used on page load to prevent automatic API calls
    if (skipApi) {
      // Ensure commentId is converted to string for consistent lookup
      const commentIdStr = String(commentId);
      
      const parentCommentUuid = await findParentCommentUuid(videoId, commentIdStr);
      
      if (parentCommentUuid) {
        const supabaseReplies = await fetchRepliesFromSupabase(parentCommentUuid, videoId);
        
        // Return replies from Supabase (even if empty array)
        return NextResponse.json({
          success: true,
          replies: supabaseReplies || [],
          total: supabaseReplies?.length || 0,
          source: 'supabase',
        });
      } else {
        // No parent found, return empty replies
        return NextResponse.json({
          success: true,
          replies: [],
          total: 0,
          source: 'supabase',
        });
      }
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;

    if (!rapidApiKey) {
      return NextResponse.json(
        { error: 'RapidAPI key is not configured' },
        { status: 500 }
      );
    }

    // If forceRefresh is not set, try to fetch from Supabase first
    if (!forceRefresh) {
      const parentCommentUuid = await findParentCommentUuid(videoId, commentId);
      
      if (parentCommentUuid) {
        const supabaseReplies = await fetchRepliesFromSupabase(parentCommentUuid, videoId);
        
        if (supabaseReplies && supabaseReplies.length > 0) {
          // Return replies from Supabase without making API call
          return NextResponse.json({
            success: true,
            replies: supabaseReplies,
            total: supabaseReplies.length,
            source: 'supabase',
          });
        }
      }
    }

    // If no replies in Supabase or forceRefresh is true, fetch from TikTok API
    // Check monthly API request limit before proceeding
    const currentRequestCount = await getMonthlyRequestCount();
    if (currentRequestCount >= 200000) {
      return NextResponse.json(
        { error: 'Monthly RapidAPI request limit (200000) has been reached. Please try again next month.' },
        { status: 429 }
      );
    }

    // Fetch replies for the comment from TikTok API
    const allReplies = await fetchCommentReplies(videoId, commentId, rapidApiKey, forceRefresh);

    const formattedReplies = allReplies.filter((reply: any) => reply.text && reply.text.trim().length > 0);

    return NextResponse.json({
      success: true,
      replies: formattedReplies,
      total: formattedReplies.length,
      source: 'tiktok_api',
    });

  } catch (error: any) {
    console.error('Error fetching comment replies:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch comment replies' },
      { status: 500 }
    );
  }
}
