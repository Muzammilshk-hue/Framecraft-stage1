import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safely initialize Supabase only if keys exist
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export default function App() {
  const [status, setStatus] = useState('Checking Supabase connection...');

  useEffect(() => {
    if (supabase) {
      setStatus('Connected to Supabase!');
    } else {
      setStatus('Missing Supabase environment variables');
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>Framecraft</h1>
      <p>Supabase Status: {status}</p>
    </div>
  );
}
