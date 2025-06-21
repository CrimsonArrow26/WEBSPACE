const toggle = document.getElementById("anonymityToggle");
const nameInput = document.getElementById("nameInput");
const nameGroup = document.getElementById("nameGroup");

// New elements
const modal = document.getElementById("upload-choice-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const takePhotoBtn = document.getElementById("take-photo-btn");
const chooseFileBtn = document.getElementById("choose-file-btn");
const fileInput = document.getElementById("fileInput");
const cameraButton = document.getElementById("cameraButton");
const fileInfo = document.getElementById("file-info");
const fileCount = document.getElementById("file-count");
const fileList = document.getElementById("file-list");

let uploadedFiles = [];

toggle.addEventListener("change", () => {
  const disabled = toggle.checked;
  nameInput.disabled = disabled;
  nameGroup.classList.toggle("disabled", disabled);
});

// Show the modal when the camera button is clicked
cameraButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

takePhotoBtn.addEventListener("click", () => {
  modal.style.display = "none";
  capturePhoto();
});

chooseFileBtn.addEventListener("click", () => {
  modal.style.display = "none";
  fileInput.click();
});

fileInput.addEventListener("change", handleFileSelect);

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

function handleFileSelect(event) {
  const files = event.target.files;
  if (files.length > 0) {
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadedFiles.push({ name: file.name, dataUrl: e.target.result });
        updateFileInfo();
      };
      reader.readAsDataURL(file);
    }
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
            
            // Add captured photo to the list
            const fileName = `photo_${Date.now()}.png`;
            uploadedFiles.push({ name: fileName, dataUrl: dataUrl });
            updateFileInfo();

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

function updateFileInfo() {
  if (uploadedFiles.length > 0) {
    cameraButton.style.display = "none";
    fileInfo.style.display = "block";
    fileCount.textContent = `${uploadedFiles.length} photo(s) uploaded`;

    fileList.innerHTML = ""; // Clear previous list
    uploadedFiles.forEach(file => {
      const listItem = document.createElement("li");
      
      const thumbnail = document.createElement("img");
      thumbnail.src = file.dataUrl;
      thumbnail.alt = file.name;

      const fileName = document.createTextNode(file.name);

      listItem.appendChild(thumbnail);
      listItem.appendChild(fileName);
      fileList.appendChild(listItem);
    });
    fileList.style.display = "none"; // Initially hidden
  } else {
    cameraButton.style.display = "block";
    fileInfo.style.display = "none";
  }
}

fileInfo.addEventListener("click", () => {
  if (fileList.style.display === "none") {
    fileList.style.display = "block";
  } else {
    fileList.style.display = "none";
  }
});
