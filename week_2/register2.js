document.addEventListener("DOMContentLoaded", function () {
  const strengthBars = document.querySelectorAll('.bar'); // Get all the strength bars
  const strengthText = document.getElementById('strength-text'); // Get the strength text element
  const passwordInput = document.getElementById('password'); // Password input
  const confirmPasswordInput = document.getElementById('confirm-password'); // Confirm password input
  const signupForm = document.getElementById('signup-form'); // Form
  const getStartedBtn = document.getElementById('getStartedBtn'); // Get Started button

  // Function to update the strength bars based on the password input
  function updateStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;         // Length of 8 or more
    if (/[A-Z]/.test(password)) strength++;       // Contains at least one uppercase letter
    if (/\d/.test(password)) strength++;          // Contains at least one digit
    if (/[\W_]/.test(password)) strength++;       // Contains at least one special character

    strengthBars.forEach((bar, index) => {
      bar.classList.toggle('filled', index < strength);
    });

    if (strength === 0) {
      strengthText.textContent = '';
    } else if (strength === 1) {
      strengthText.textContent = 'Very Weak';
      strengthText.style.color = 'red';
    } else if (strength === 2) {
      strengthText.textContent = 'Weak';
      strengthText.style.color = 'orange';
    } else if (strength === 3) {
      strengthText.textContent = 'Moderate';
      strengthText.style.color = 'yellow';
    } else if (strength === 4) {
      strengthText.textContent = 'Strong';
      strengthText.style.color = 'green';
    }
  }

  // Event listener to update password strength
  passwordInput.addEventListener('input', (e) => {
    updateStrength(e.target.value);
  });

  // Function to show the modal when passwords don't match
  function showPasswordMismatchModal() {
    document.getElementById('passwordMismatchModal').style.display = 'block';
  }

  // Close modal when clicking the close button
  document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('passwordMismatchModal').style.display = 'none';
  });

  // Validate password match on form submit
  getStartedBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      showPasswordMismatchModal(); // Show modal if passwords don't match
    } else {
      signupForm.submit(); // Submit the form if passwords match
    }
  });
});
