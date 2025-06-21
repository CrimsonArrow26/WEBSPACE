import { supabase } from './supabase-init.js';

(async function () {
    const protectedPages = [
        '/about.html',
        '/complaint.html',
        '/homepage.html',
        '/list.html',
        '/profile.html',
        '/update.html'
    ];

    const path = window.location.pathname;
    const isProtectedPage = protectedPages.some(page => path.endsWith(page));
    const isIndexPage = path.endsWith('/index.html') || path === '/';
    
    const { data: { session } } = await supabase.auth.getSession();

    if (session && isIndexPage) {
        // User is logged in and on the root/index page, redirect to homepage.
        window.location.href = 'homepage.html';
    } else if (!session && isProtectedPage) {
        // User is NOT LOGGED IN and is trying to access a protected page.
        // Redirect them to the login page.
        console.log('User is not logged in, redirecting from protected page to login.');
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html';
    }
})(); 