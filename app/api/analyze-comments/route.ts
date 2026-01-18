import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    const { comments } = await request.json();

    if (!comments || !Array.isArray(comments) || comments.length === 0) {
      return NextResponse.json(
        { error: 'Comments array is required and must not be empty' },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }

    // Prepare comments text for analysis
    const commentsText = comments
      .map((c: Comment, index: number) => `Comment ${index + 1}: "${c.text}" (Likes: ${c.likes})`)
      .join('\n');

    // Create a comprehensive prompt for analysis
    const prompt = `You are analyzing TikTok video comments. Analyze the following comments and provide insights.

Comments:
${commentsText}

Please analyze these comments and return a JSON object with the following structure:
{
  "summary": "A brief 2-3 sentence summary of the overall comment sentiment and themes",
  "sentimentBreakdown": {
    "positive": <number of positive comments>,
    "negative": <number of negative comments>,
    "neutral": <number of neutral comments>
  },
  "categoryBreakdown": {
    "question": <number of questions>,
    "hate": <number of hateful/toxic comments>,
    "praise": <number of praising/complimentary comments>,
    "botSpam": <number of bot/spam comments>,
    "other": <number of other comments>
  },
  "overallSentiment": "Positive" | "Negative" | "Neutral",
  "overallCategory": "Question" | "Hate" | "Praise" | "Bot/Spam" | "Other",
  "goldenComment": {
    "index": <0-based index of the most valuable comment>,
    "reason": "Why this comment is valuable (e.g., high engagement potential, meaningful question, positive feedback worth responding to)"
  }
}

Return ONLY valid JSON, no additional text.`;

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'TikTok Comment Analyzer',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing social media comments. Always return valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error('OpenRouter Error:', errorText);
      throw new Error(`OpenRouter API error: ${openRouterResponse.statusText}`);
    }

    const completion = await openRouterResponse.json();
    const analysisText = completion.choices[0]?.message?.content;
    if (!analysisText) {
      throw new Error('No response from OpenRouter');
    }

    const analysis = JSON.parse(analysisText);

    // Find the golden comment
    const goldenCommentIndex = analysis.goldenComment?.index;
    const goldenComment = goldenCommentIndex !== undefined && comments[goldenCommentIndex]
      ? {
          id: comments[goldenCommentIndex].id,
          text: comments[goldenCommentIndex].text,
          author: comments[goldenCommentIndex].author,
          reason: analysis.goldenComment.reason,
        }
      : null;

    // Build the response
    const result: AnalysisResult = {
      sentiment: analysis.overallSentiment || 'Neutral',
      category: analysis.overallCategory || 'Other',
      goldenComment,
      summary: analysis.summary || 'No summary available',
      totalComments: comments.length,
      sentimentBreakdown: {
        positive: analysis.sentimentBreakdown?.positive || 0,
        negative: analysis.sentimentBreakdown?.negative || 0,
        neutral: analysis.sentimentBreakdown?.neutral || 0,
      },
      categoryBreakdown: {
        question: analysis.categoryBreakdown?.question || 0,
        hate: analysis.categoryBreakdown?.hate || 0,
        praise: analysis.categoryBreakdown?.praise || 0,
        botSpam: analysis.categoryBreakdown?.botSpam || 0,
        other: analysis.categoryBreakdown?.other || 0,
      },
    };

    return NextResponse.json({
      success: true,
      analysis: result,
    });

  } catch (error: any) {
    console.error('Error analyzing comments:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze comments' },
      { status: 500 }
    );
  }
}
