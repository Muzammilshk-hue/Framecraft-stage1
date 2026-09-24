import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If keys are missing at runtime, print this directly to the phone screen
if (!url || !key) {
  document.body.innerHTML = `<h1 style="color:red;padding:20px;font-family:sans-serif">
    Supabase Crash! <br/> 
    URL: ${url ? 'OK' : 'MISSING'} <br/> 
    KEY: ${key ? 'OK' : 'MISSING'}
  </h1>`;
  throw new Error("Missing Supabase env vars");
}

export const supabase = createClient
