import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase().trim() });

    if (error) {
      console.error('Newsletter insert error:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    
    const { count, error } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch (err) {
    return NextResponse.json({ count: 0 });
  }
}
