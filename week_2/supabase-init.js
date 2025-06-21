import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// --- IMPORTANT ---
// 1. Go to your Supabase project dashboard.
// 2. Find your "Project URL" and "anon" public key in Settings > API.
// 3. Replace the placeholder values below with your actual credentials.

const supabaseUrl = 'https://ynriujkfqvmrudvvuohr.supabase.co'; // Replace with your Supabase Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlucml1amtmcXZtcnVkdnZ1b2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NTMwNjIsImV4cCI6MjA2NjAyOTA2Mn0.dU4C-TpaPV5TrAi49vV71nWjxcvzhgX5zXzKAJVIC4g'; // Replace with your Supabase anon public key

// Create and export a single Supabase client for interacting with your project
export const supabase = createClient(supabaseUrl, supabaseKey); 