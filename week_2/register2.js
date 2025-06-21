import { supabase } from './supabase-init.js';

// --- Reusable Modal Function ---
function showModal(title, message, isSuccess = false) {
    const modal = document.getElementById('notificationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // Add a class for styling success messages differently if desired
    modalTitle.style.color = isSuccess ? 'green' : '#B81D1D';

    modal.style.display = 'block';
}

// --- Form Submission Logic ---
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the old way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        // You can use the new modal for all messages
        showModal('Error', 'Passwords do not match!');
        return;
    }

    // --- Sign up user with Supabase ---
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error signing up:', error.message);
        // Check for specific error message for existing user
        if (error.message.includes('User already registered')) {
            showModal('Registration Failed', 'This email is already registered. Please sign in.');
        } else {
            showModal('Registration Failed', `An error occurred: ${error.message}`);
        }
    } else {
        showModal('Success!', 'Registration complete! You can now use the "Sign In" button to log in.', true);
        // No automatic redirection as requested.
    }
});

// --- General Modal Closing Logic ---
function setupModalClosers() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // Find close buttons by class or ID for backwards compatibility
        const closeButton = modal.querySelector('.close-button, #closeModal'); 
        if (closeButton) {
            closeButton.onclick = function () {
                modal.style.display = 'none';
            };
        }
    });

    // Close modal if user clicks outside of the modal content
    window.onclick = function (event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    };
}

// Initialize the modal closing behavior when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupModalClosers();
});

// You can add password strength indicator logic here if needed.
