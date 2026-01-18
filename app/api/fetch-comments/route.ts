import { NextRequest, NextResponse } from 'next/server';

// Helper function to delay execution (for rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to extract username from profile URL
function extractUsername(profileUrl: string): string | null {
  const match = profileUrl.match(/@([\w\.-]+)/);
  return match ? match[1] : null;
}

// Helper function to fetch comments for a single video
async function fetchCommentsForVideo(
  videoUrl: string,
  rapidApiKey: string
): Promise<any[]> {
  const encodedUrl = encodeURIComponent(videoUrl);
  const apiUrl = `https://tiktok-scraper7.p.rapidapi.com/comment/list?url=${encodedUrl}&count=50&cursor=`;

  let allComments: any[] = [];
  let cursor = '';
  let hasMore = true;

  // Paginate through all comments for this video
  while (hasMore) {
    const paginatedUrl = `https://tiktok-scraper7.p.rapidapi.com/comment/list?url=${encodedUrl}&count=50&cursor=${cursor}`;
    
    const response = await fetch(paginatedUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching comments for video ${videoUrl}:`, errorText);
      break; // Continue with next video if this one fails
    }

    const data = await response.json();
    
    // Extract comments from the TikTok Scraper API response
    let comments: any[] = [];
    if (data.data?.data?.comments && Array.isArray(data.data.data.comments)) {
      comments = data.data.data.comments;
    } else if (data.data?.comments && Array.isArray(data.data.comments)) {
      comments = data.data.comments;
    } else if (data.comments && Array.isArray(data.comments)) {
      comments = data.comments;
    } else if (data.data && Array.isArray(data.data)) {
      comments = data.data;
    } else if (Array.isArray(data)) {
      comments = data;
    }

    // Format comments to a consistent structure
    const formattedComments = comments.map((comment: any) => ({
      id: comment.comment_id || comment.id || comment.cid || Math.random().toString(),
      text: comment.text || comment.comment_text || comment.content || '',
      author: comment.user?.nickname || comment.author || comment.user_name || 'Unknown',
      likes: comment.digg_count || comment.likes || comment.like_count || 0,
      timestamp: comment.create_time || comment.timestamp || Date.now(),
    })).filter((comment: any) => comment.text && comment.text.trim().length > 0);

    allComments = allComments.concat(formattedComments);

    // Check if there are more comments (pagination)
    const nextCursor = data.cursor || data.data?.cursor || data.data?.data?.cursor;
    hasMore = nextCursor && nextCursor !== cursor && formattedComments.length === 50;
    cursor = nextCursor || '';

    // Rate limiting: delay between pagination requests
    if (hasMore) {
      await delay(500); // 500ms delay between comment pagination requests
    }
  }

  return allComments;
}

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json();

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
      // Try different possible endpoint patterns
      let allVideoUrls: string[] = [];
      let cursor = '';
      let hasMore = true;
      const maxVideos = 1000; // Safety limit
      let videoCount = 0;

      while (hasMore && videoCount < maxVideos) {
        // Try profile endpoint - common patterns for TikTok Scraper API
        // Pattern 1: Using full profile URL (similar to comment/list)
        const encodedProfileUrl = encodeURIComponent(`https://www.tiktok.com/@${username}`);
        let profileApiUrl = `https://tiktok-scraper7.p.rapidapi.com/user/posts?url=${encodedProfileUrl}&count=30&cursor=${cursor}`;

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
        const videoUrl = allVideoUrls[i];
        try {
          const videoComments = await fetchCommentsForVideo(videoUrl, rapidApiKey);
          allComments.push(...videoComments);
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
      const allComments = await fetchCommentsForVideo(videoUrl, rapidApiKey);

      const formattedComments = allComments.filter((comment: any) => comment.text && comment.text.trim().length > 0);

      return NextResponse.json({
        success: true,
        comments: formattedComments,
        total: formattedComments.length,
        videosScanned: 1,
        isProfile: false,
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
