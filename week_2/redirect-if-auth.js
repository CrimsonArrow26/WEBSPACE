import { supabase } from './supabase-init.js';

(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const loader = document.getElementById('auth-loader');
  if (session) {
    window.location.href = 'homepage.html';
  } else if (loader) {
    loader.style.display = 'none';
  }
})(); 