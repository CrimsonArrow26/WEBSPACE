import { supabase } from './supabase-init.js';

// --- Reusable Modal Function ---
function showModal(title, message, isSuccess = false) {
    const modal = document.getElementById('notificationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modalTitle.style.color = isSuccess ? 'green' : '#B81D1D';
    
    // Use 'block' to match the known-good CSS behavior
    modal.style.display = 'block';
}

// --- Form Submission Logic ---
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        showModal('Login Failed', 'Invalid email or password. Please try again.');
        console.error('Error signing in:', error.message);
    } else {
        // Successful login. The session is persisted by default.
        showModal('Login successful!', 'Login successful! Redirecting to the homepage...', true);
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 2000);
    }
});

// --- General Modal Closing Logic ---
function setupModalClosers() {
    const modal = document.getElementById('notificationModal');
    // Ensure modal and button exist before adding listeners
    if (modal) {
        const closeButton = modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.onclick = function () {
                modal.style.display = 'none';
            };
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupModalClosers();

    // --- Google Sign-In Logic ---
    const googleSignInButton = document.getElementById('google-signin-btn');
    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/homepage.html`,
                },
            });

            if (error) {
                showModal('Google Sign-In Failed', error.message);
                console.error('Error with Google Sign-In:', error.message);
            }
            // On success, Supabase handles the redirect automatically.
        });
    }
});
