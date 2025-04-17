// import { auth, providerGoogle, providerFacebook } from "./firebase-init.js";
// import { signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// // Sign-in with Google
// document.querySelector("#google-signup").addEventListener("click", () => {
//   signInWithPopup(auth, providerGoogle)
//     .then((result) => {
//       const user = result.user;
//       console.log("Google Login Success:", user);
//       saveUserData(user);
//     })
//     .catch((err) => console.error("Error: ", err));
// });

// // Sign-in with Facebook
// document.querySelector("#facebook-signup").addEventListener("click", () => {
//   signInWithPopup(auth, providerFacebook)
//     .then((result) => {
//       const user = result.user;
//       console.log("Facebook Login Success:", user);
//       saveUserData(user);
//     })
//     .catch((err) => console.error("Error: ", err));
// });

// // Function to save user data to Firestore
// function saveUserData(user) {
//   const db = getFirestore();
//   const userRef = doc(db, "users", user.uid);
//   setDoc(userRef, {
//     name: user.displayName,
//     email: user.email,
//     photo: user.photoURL,
//   })
//     .then(() => {
//       console.log("User data saved to Firestore");
//       window.location.href = "homepage.html"; // Redirect to homepage after successful sign-in
//     })
//     .catch((error) => {
//       console.error("Error saving user data:", error);
//     });
// }

// // Display the user's name and photo if already signed in
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     document.getElementById("welcome").innerText = "Welcome, " + user.displayName;
//     document.getElementById("profile-pic").src = user.photoURL;
//   }
// });
