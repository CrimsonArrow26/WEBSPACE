import { supabase } from './supabase-init.js';

/**
 * A dedicated function to handle signing the user out.
 * It includes console logs for debugging purposes.
 */
async function handleLogout() {
    console.log('Logout button clicked. Attempting to sign out...');

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error during logout:', error.message);
        alert('An error occurred while logging out. Please try again.');
    } else {
        console.log('Logout successful. Redirecting to login page...');
        // Redirect to the login page on successful logout.
        window.location.href = 'login.html';
    }
}

/**
 * Manages the dark mode state and UI.
 * @param {boolean} isDarkMode - The desired state for dark mode.
 */
function setTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
}

/**
 * Sends a password reset email to the currently logged-in user.
 */
async function sendPasswordReset() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: 'https://your-site.com/update-password.html', // Optional: A page where users can be redirected after clicking the link
        });

        if (error) {
            console.error('Error sending password reset email:', error.message);
            alert('Failed to send password reset email. Please try again.');
        } else {
            alert('A password reset link has been sent to your email address.');
        }
    } else {
        alert('Could not find a logged-in user. Please log in again.');
    }
}

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("User logged out successfully.");
    // Redirect to login page after successful logout
    window.location.href = "login.html";
  }
});

const usernameElem = document.getElementById("username");
const emailElem = document.getElementById("email");
const nameModal = document.getElementById("name-modal");
const nameInput = document.getElementById("name-input");
const saveNameButton = document.getElementById("save-name-button");
const profileImage = document.getElementById("profile-image");

// Avatar Upload Modal Elements
const avatarUploadModal = document.getElementById('avatarUploadModal');
const closeModalBtn = avatarUploadModal ? avatarUploadModal.querySelector('.close-button') : null;
const takePhotoBtn = document.getElementById('takeAvatarPhotoBtn');
const cameraInput = document.getElementById('avatarCameraInput');
const selectFileBtn = document.getElementById('selectAvatarFileBtn');
const fileInput = document.getElementById('avatarFileInput');

async function loadUserProfile() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error getting session:", sessionError.message);
    return;
  }
  
  if (!session) {
    console.log("No active session found.");
    window.location.href = "login.html";
    return;
  }

  const user = session.user;

  // Display email
  if (user && user.email) {
    emailElem.textContent = user.email;
  }

  // Check for and display user's full name from metadata
  const userMetadata = user.user_metadata;
  if (userMetadata && userMetadata.full_name) {
    usernameElem.textContent = userMetadata.full_name;
  } else {
    // If no name, show the modal to prompt for it
    nameModal.style.display = "flex";
  }

  // Load and display avatar
  if (userMetadata && userMetadata.avatar_url) {
    profileImage.src = userMetadata.avatar_url;
  }
}

async function saveName() {
  const newName = nameInput.value.trim();
  if (newName === "") {
    alert("Please enter your name.");
    return;
  }

  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: newName },
  });

  if (error) {
    console.error("Error updating user name:", error.message);
    alert("Failed to save your name. Please try again.");
  } else {
    // Update the UI with the new name and hide the modal
    usernameElem.textContent = data.user.user_metadata.full_name;
    nameModal.style.display = "none";
    console.log("User name updated successfully.");
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", loadUserProfile);
saveNameButton.addEventListener("click", saveName);

// Also allow pressing Enter to save the name
nameInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        saveName();
    }
});

document.getElementById("change-password-button").addEventListener("click", () => {
    window.location.href = "update.html";
});

// 2. Setup Dark Mode functionality
const darkModeToggle = document.querySelector("#dark-mode-toggle");
if (darkModeToggle) {
    // Set initial theme based on saved preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    darkModeToggle.checked = savedDarkMode;
    setTheme(savedDarkMode);

    // Add listener for changes
    darkModeToggle.addEventListener("change", function () {
        setTheme(this.checked);
    });
}

// --- Avatar Upload Logic ---

// Open Modal when profile image is clicked
if (profileImage) {
    profileImage.addEventListener('click', () => {
        console.log("Profile image clicked. Opening modal.");
        if (avatarUploadModal) {
            avatarUploadModal.style.display = 'block';
        }
    });
}

// Close Modal
const closeModal = () => {
    console.log("Closing modal.");
    if (avatarUploadModal) {
        avatarUploadModal.style.display = 'none';
    }
};
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}
window.addEventListener('click', (event) => {
    if (event.target == avatarUploadModal) {
        closeModal();
    }
});

// Button click triggers file input
if (takePhotoBtn && cameraInput) {
    takePhotoBtn.addEventListener('click', () => cameraInput.click());
}
if (selectFileBtn && fileInput) {
    selectFileBtn.addEventListener('click', () => fileInput.click());
}

// Handle file selection
const handleFileSelect = async (event) => {
    console.log("handleFileSelect triggered.");
    const file = event.target.files[0];
    if (!file) {
        console.log("No file selected.");
        return;
    }
    console.log("File selected:", file.name);

    closeModal();

    try {
        await uploadProfilePicture(file);
    } catch (error) {
        console.error("Error in handleFileSelect:", error);
        alert("Upload failed. Check the console for details.");
    }
};

if (cameraInput) {
    cameraInput.addEventListener('change', handleFileSelect);
}
if (fileInput) {
    fileInput.addEventListener('change', handleFileSelect);
}

// Upload picture to Supabase
async function uploadProfilePicture(file) {
    console.log("uploadProfilePicture started.");
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('Error getting user:', userError?.message);
        throw new Error("You must be logged in to upload a picture.");
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    try {
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        if (!urlData || !urlData.publicUrl) {
            throw new Error("Could not get public URL.");
        }
        const publicUrl = urlData.publicUrl;

        const { error: updateUserError } = await supabase.auth.updateUser({
            data: { avatar_url: publicUrl },
        });

        if (updateUserError) throw updateUserError;

        profileImage.src = publicUrl;
        alert('Profile picture updated successfully!');
    } catch (error) {
        console.error('Error during profile picture upload:', error);
        alert(`Upload Error: ${error.message}`);
        throw error; // re-throw to be caught by caller
    }
}
