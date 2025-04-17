// Dark Mode Toggle
const toggle = document.querySelector(".switch input");
toggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", this.checked);
});

// // Firebase Configuration (Replace with your actual Firebase values)
// const firebaseConfig = {
//   apiKey: "AIzaSyCDHjGnKQhw4Q33pHSuHCfvzABI5-Ft7Jg",
//   authDomain: "nivaran-9bc6b.firebaseapp.com",
//   projectId: "nivaran-9bc6b",
//   storageBucket: "nivaran-9bc6b.firebasestorage.app",
//   messagingSenderId: "431802679807",
//   appId: "1:431802679807:web:8fcaa4016379c8a99ae7ca",
//   measurementId: "G-1PX9CJV5GV"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// // Protect the page (check if user is logged in)
// auth.onAuthStateChanged(user => {
//   if (!user) {
//     window.location.href = "login.html"; // Not logged in, redirect
//   } else {
//     // Display user's name or email
//     document.getElementById("username").textContent = user.displayName || user.email;

//     // Display user's profile picture if available
//     const userImage = user.photoURL ? user.photoURL : "path/to/default/avatar.png";
//     document.querySelector(".profile-info img").src = userImage;
//   }
// });

// // Logout function
// function logout() {
//   auth.signOut().then(() => {
//     window.location.href = "login.html"; // Redirect to login page after logout
//   }).catch(err => {
//     console.error("Logout error:", err);
//   });
// }
