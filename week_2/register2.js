document.addEventListener("DOMContentLoaded", function () {
  const strengthBars = document.querySelectorAll(".bar");
  const strengthText = document.getElementById("strength-text");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const signupForm = document.getElementById("signup-form");
  const getStartedBtn = document.getElementById("getStartedBtn");
  const notificationBar = document.getElementById("notification-bar");

  function updateStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    strengthBars.forEach((bar, index) => {
      bar.classList.toggle("filled", index < strength);
    });

    if (strength === 0) {
      strengthText.textContent = "";
    } else if (strength === 1) {
      strengthText.textContent = "Very Weak";
      strengthText.style.color = "red";
    } else if (strength === 2) {
      strengthText.textContent = "Weak";
      strengthText.style.color = "orange";
    } else if (strength === 3) {
      strengthText.textContent = "Moderate";
      strengthText.style.color = "yellow";
    } else if (strength === 4) {
      strengthText.textContent = "Strong";
      strengthText.style.color = "green";
    }
  }

  passwordInput.addEventListener("input", (e) => {
    updateStrength(e.target.value);
  });

  function showPasswordMismatchModal() {
    document.getElementById("passwordMismatchModal").style.display = "block";
  }

  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("passwordMismatchModal").style.display = "none";
  });

  function showNotification(message) {
    notificationBar.textContent = message;
    notificationBar.classList.add("show");


    setTimeout(() => {
      notificationBar.classList.remove("show");
    }, 3000);
  }

  getStartedBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

   
    if (!email || !password || !confirmPassword) {
      showNotification("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match. Please try again.");
      return;
    }

   
    localStorage.setItem("email", email.toLowerCase());
    localStorage.setItem("password", password);

    console.log("Saved Email:", localStorage.getItem("email"));
    console.log("Saved Password:", localStorage.getItem("password"));

 
    window.location.href = "login.html";
  });
});
