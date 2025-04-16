import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Initialize Firebase Auth and Firestore
const auth = getAuth();
const db = getFirestore();

// Google Sign-Up Handler
const googleSignUpBtn = document.getElementById('google-signup'); // make sure this button exists in your HTML
googleSignUpBtn.addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log('Google Sign-Up Successful:', user);
      // Save user to Firestore
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }).then(() => {
        // Redirect to home or another page after successful sign-up
        window.location.href = "home.html"; // Example redirect
      }).catch(err => {
        console.error("Error saving user to Firestore:", err);
      });
    })
    .catch(err => {
      console.error('Google Sign-Up Error:', err);
      alert('Error with Google Sign-Up');
    });
});

// Facebook Sign-Up Handler
const facebookSignUpBtn = document.getElementById('facebook-signup'); // make sure this button exists in your HTML
facebookSignUpBtn.addEventListener('click', () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log('Facebook Sign-Up Successful:', user);
      // Save user to Firestore
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }).then(() => {
        // Redirect to home or another page after successful sign-up
        window.location.href = "home.html"; // Example redirect
      }).catch(err => {
        console.error("Error saving user to Firestore:", err);
      });
    })
    .catch(err => {
      console.error('Facebook Sign-Up Error:', err);
      alert('Error with Facebook Sign-Up');
    });
});

// Handle Auth State Changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Display welcome message and profile picture
    document.getElementById("welcome").innerText = `Welcome, ${user.displayName}`;
    document.getElementById("profile-pic").src = user.photoURL || 'default-profile-pic.png'; // Default if no photo
  } else {
    console.log('No user signed in');
  }
});
