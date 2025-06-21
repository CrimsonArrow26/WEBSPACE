import { supabase } from './supabase-init.js';

/**
 * Handles the Google sign-in process when the button is clicked.
 */
async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        console.error('Error signing in with Google:', error);
        // You could show a modal here for a better user experience
        alert(`Google Sign-In failed: ${error.message}`);
    }
    // If successful, Supabase handles the browser redirect to Google.
    // No 'else' block or redirect is needed here.
}

// Attach the event listener to the Google sign-up button
document.addEventListener('DOMContentLoaded', () => {
    const googleButton = document.getElementById('google-signup');
    if (googleButton) {
        googleButton.addEventListener('click', signInWithGoogle);
    }

    // After a user signs in with Google, they are redirected back here.
    // Supabase automatically handles the session. We now only listen for the
    // 'SIGNED_IN' event to prevent redirecting on a simple page load.
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            window.location.href = 'homepage.html';
        }
    });
});

// import { auth, providerGoogle, providerFacebook, signInWithPopup, onAuthStateChanged } from "./firebaseConfig.js";

// function loginWithGoogle() {
//   signInWithPopup(auth, providerGoogle)
//     .then(result => {
//       const user = result.user;
//       console.log("Google Login Success:", user);
//       document.getElementById("welcome").innerText = "Welcome, " + user.displayName;
//       document.getElementById("profile-pic").src = user.photoURL;
//     })
//     .catch(err => console.error(err));
// }

// function loginWithFacebook() {
//   signInWithPopup(auth, providerFacebook)
//     .then(result => {
//       const user = result.user;
//       console.log("Facebook Login Success:", user);
//       document.getElementById("welcome").innerText = "Welcome, " + user.displayName;
//       document.getElementById("profile-pic").src = user.photoURL;
//     })
//     .catch(err => console.error(err));
// }

// // Optional: Auto-fill welcome message if already signed in
// onAuthStateChanged(auth, user => {
//   if (user) {
//     document.getElementById("welcome").innerText = "Welcome, " + user.displayName;
//     document.getElementById("profile-pic").src = user.photoURL;
//   }
// });
