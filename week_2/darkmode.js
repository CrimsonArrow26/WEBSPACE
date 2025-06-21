window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.querySelector("#dark-mode-toggle");

  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    if (toggle) {
      toggle.checked = true;
    }
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
      }
    });
  }
});
