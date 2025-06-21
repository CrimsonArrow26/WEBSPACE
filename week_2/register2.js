import { supabase } from './supabase-init.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const passwordInput = document.getElementById('password');
    const strengthText = document.getElementById('strength-text');
    const bars = document.querySelectorAll('.password-strength .bar');
    const modal = document.getElementById('notificationModal');
    const closeModal = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    const showModal = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    };

    if(closeModal) {
        closeModal.onclick = () => {
            modal.style.display = 'none';
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        updateStrengthIndicator(strength);
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (password !== confirmPassword) {
            showModal('Error', 'Passwords do not match.');
            return;
        }

        const strength = checkPasswordStrength(password);
        if (strength < 3) {
            showModal('Error', 'Password is not strong enough.');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            // Show specific errors for password or email issues
            if (error.message.toLowerCase().includes('password') || error.message.toLowerCase().includes('email')) {
                showModal('Sign-Up Failed', error.message);
            } else {
                showModal('Check your email', 'If this email is not already registered, you will receive a verification link. Please check your inbox and spam folder.');
            }
        } else if (data.user) {
            showModal('Success', 'Sign-up successful! Please check your email to verify your account.');
            signupForm.reset();
        }
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
    }

    function updateStrengthIndicator(strength) {
        bars.forEach((bar, index) => {
            bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#ddd';
        });
        strengthText.textContent = getStrengthText(strength);
    }

    function getStrengthColor(strength) {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'green';
            default: return '#ddd';
        }
    }

    function getStrengthText(strength) {
        switch (strength) {
            case 1: return 'Weak';
            case 2: return 'Medium';
            case 3: return 'Strong';
            case 4: return 'Very Strong';
            default: return 'Use 8 or more characters with a mix of letters, numbers, and symbols.';
        }
    }
});
