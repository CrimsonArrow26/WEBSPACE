document.addEventListener("DOMContentLoaded", function () {
  const strengthBars = document.querySelectorAll('.bar'); // Get all the strength bars
  const strengthText = document.getElementById('strength-text'); // Get the strength text element

  
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

  
  document.querySelector('#password').addEventListener('input', (e) => {
    updateStrength(e.target.value);
  });
});
