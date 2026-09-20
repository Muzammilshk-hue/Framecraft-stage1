import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [status, setStatus] = useState('Connecting to Supabase...');

  useEffect(() => {
    if (supabaseUrl && supabaseAnonKey) {
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
