const toggle = document.getElementById("anonymityToggle");
const nameInput = document.getElementById("nameInput");
const nameGroup = document.getElementById("nameGroup");

toggle.addEventListener("change", () => {
  const disabled = toggle.checked;
  nameInput.disabled = disabled;
  nameGroup.classList.toggle("disabled", disabled);
});

document.getElementById("submitBtn").addEventListener("click", function () {
  showToast();

  localStorage.setItem("showToast", "true");

  setTimeout(function () {
    window.location.href = "homepage.html";
  }, 3000);
});

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function triggerFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log("File uploaded:", file);
    };
    reader.readAsDataURL(file);
  }
}

function capturePhoto() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        video.onplay = function () {
          setTimeout(function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL("image/png");
            console.log("Captured photo:", dataUrl);

            const img = document.createElement("img");
            img.src = dataUrl;
            img.alt = "Captured Photo";
            document.body.appendChild(img);

            stream.getTracks().forEach((track) => track.stop());

            video.remove();
          }, 1000);
        };
      })
      .catch(function (error) {
        console.error("Error accessing the camera:", error);
        alert(
          "Unable to access the camera. Please check your device settings."
        );
      });
  } else {
    alert("Camera not supported on this device or browser.");
  }
}

document.getElementById("cameraButton").addEventListener("click", capturePhoto);
