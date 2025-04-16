const toggle = document.getElementById("anonymityToggle");
const nameInput = document.getElementById("nameInput");
const nameGroup = document.getElementById("nameGroup");

toggle.addEventListener("change", () => {
  const disabled = toggle.checked;
  nameInput.disabled = disabled;
  nameGroup.classList.toggle("disabled", disabled);
});

document.getElementById("submitBtn").addEventListener("click", function () {
  // Show toast first
  showToast();

  // Store a flag in localStorage to trigger the toast on homepage
  localStorage.setItem("showToast", "true");

  // Redirect to the homepage after showing the toast
  setTimeout(function () {
    window.location.href = "homepage.html"; // Redirect after 3 seconds (when toast disappears)
  }, 3000); // Adjust time to match the toast display duration
});

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Toast will disappear after 3 seconds
}
