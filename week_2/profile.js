import { supabase } from './supabase-init.js';

document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.querySelector(".switch input");
    const logoutButton = document.getElementById('logout-button');
    const reportProblemButton = document.getElementById('report-problem-row');
    const changePasswordButton = document.getElementById('change-password-row');
    
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const profileImage = document.getElementById('profile-image');
    const profileImageUpload = document.getElementById('profile-image-upload');

    if (toggle) {
        toggle.addEventListener("change", function () {
            document.body.classList.toggle("dark-mode", this.checked);
        });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        usernameElement.textContent = user.user_metadata?.full_name || 'Admin';
        emailElement.textContent = user.email;

        if (user.user_metadata?.avatar_url) {
            const { data } = supabase.storage.from('avatars').getPublicUrl(user.user_metadata.avatar_url);
            if (data) {
                profileImage.src = data.publicUrl;
            }
        }
    } else {
        window.location.href = 'login.html';
    }

    profileImageUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file || !user) return;

        const fileName = `${user.id}/${Date.now()}`;
        
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file);

        if (uploadError) {
            alert('Failed to upload new profile picture.');
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            data: { avatar_url: fileName }
        });

        if (updateError) {
            alert('Failed to update profile picture.');
        } else {
            const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
            if (data) {
                profileImage.src = data.publicUrl;
            }
            alert('Profile picture updated successfully!');
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error);
                alert('Failed to log out. Please try again.');
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    if (reportProblemButton) {
        reportProblemButton.addEventListener('click', () => {
            window.location.href = 'complaint.html';
        });
    }

    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', () => {
            alert('Change password functionality not implemented yet.');
        });
    }
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
