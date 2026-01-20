import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

/**
 * Get Supabase client with lazy initialization.
 * This function checks for environment variables when called, not at module load time.
 * @returns Supabase client instance
 * @throws Error if environment variables are not configured
 */
export function getSupabaseClient(): SupabaseClient {
  // Check if client already exists (singleton pattern)
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env.local file.');
  }

  // Create and cache the client
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
