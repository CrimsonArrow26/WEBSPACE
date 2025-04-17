import { auth, signInWithEmailAndPassword } from "./firebaseConfig.js";

document.addEventListener("DOMContentLoaded", function () {
  const signInBtn = document.getElementById("signInBtn");
  const notificationBar = document.getElementById("notification-bar");

  function showNotification(message) {
    notificationBar.textContent = message;
    notificationBar.classList.add("show");

    setTimeout(() => {
      notificationBar.classList.remove("show");
    }, 3000);
  }

  signInBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      showNotification("Please enter both email and password.");
      return;
    }

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Stored Email:", storedEmail);
    console.log("Stored Password:", storedPassword);

    if (!storedEmail || !storedPassword) {
      showNotification("You have not signed up yet. Please sign up first.");
      window.location.href = "register2.html";
      return;
    }

    if (email.toLowerCase() === storedEmail && password === storedPassword) {
      window.location.href = "homepage.html";
    } else {
      showNotification("Invalid email or password. Please try again.");
    }
  });
});
