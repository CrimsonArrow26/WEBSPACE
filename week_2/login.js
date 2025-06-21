import { supabase } from './supabase-init.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const googleSignInBtn = document.getElementById('google-signin-btn');
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

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            showModal('Error', 'Please enter both email and password.');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            showModal('Login Failed', error.message);
        } else if (data.user) {
            showModal('Success', 'You are now logged in. Redirecting...');
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 2000);
        }
    });

    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) {
                showModal('Google Sign-In Failed', error.message);
            }
        });
    }
});

