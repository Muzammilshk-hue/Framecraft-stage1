import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual keys from your Supabase Dashboard
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

