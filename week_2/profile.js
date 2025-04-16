const toggle = document.querySelector('.switch input');

toggle.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode', this.checked);
});

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  appId: "your-app-id"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Protect the page (check if user is logged in)
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html"; // not logged in, redirect
  } else {
    document.getElementById("username").textContent = user.displayName || user.email;
  }
});

// Logout function
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html"; // back to login page after logout
  }).catch(err => {
    console.error("Logout error:", err);
  });
}