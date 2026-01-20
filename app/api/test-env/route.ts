import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    rapidApiKeyExists: !!process.env.RAPIDAPI_KEY,
    openRouterKeyExists: !!process.env.OPENROUTER_API_KEY,
    supabaseUrlExists: !!process.env.SUPABASE_URL,
    supabaseAnonKeyExists: !!process.env.SUPABASE_ANON_KEY,
    rapidApiKeyLength: process.env.RAPIDAPI_KEY?.length || 0,
    openRouterKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
    supabaseUrlLength: process.env.SUPABASE_URL?.length || 0,
    supabaseAnonKeyLength: process.env.SUPABASE_ANON_KEY?.length || 0,
    supabaseUrl: process.env.SUPABASE_URL || 'NOT SET',
    supabaseAnonKeyPreview: process.env.SUPABASE_ANON_KEY 
      ? `${process.env.SUPABASE_ANON_KEY.substring(0, 20)}...` 
      : 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(k => 
      k.includes('API') || k.includes('RAPID') || k.includes('SUPABASE')
    )
  });
}
