import { supabase } from './supabase-init.js';

document.addEventListener('DOMContentLoaded', () => {
    const googleSignUpBtn = document.getElementById('google-signup');
    const modal = document.getElementById('notificationModal');
    const closeModal = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    const showModal = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    };

    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    googleSignUpBtn.addEventListener('click', async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.href,
            },
        });

        if (error) {
            showModal('Google Sign-Up Failed', error.message);
        }
    });

    // Handle the redirect from Google
    supabase.auth.onAuthStateChange((event, session) => {
        // The presence of a hash with an access_token indicates a return from OAuth
        if (event === 'SIGNED_IN' && session && window.location.hash.includes('access_token')) {
            showModal('Success', 'You have successfully signed up. Redirecting to the homepage...');
            // To prevent the modal from re-appearing on reload, clear the hash.
            window.history.replaceState(null, '', window.location.pathname);
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 2000); // 2-second delay to show the message
        }
    });
});
