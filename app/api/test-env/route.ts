import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    rapidApiKeyExists: !!process.env.RAPIDAPI_KEY,
    openRouterKeyExists: !!process.env.OPENROUTER_API_KEY,
    rapidApiKeyLength: process.env.RAPIDAPI_KEY?.length || 0,
    openRouterKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('API') || k.includes('RAPID'))
  });
}
