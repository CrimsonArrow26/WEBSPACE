let cropper = null;
let croppedImageDataUrl = '';

const uploadInput = document.getElementById('image');
const uploadForm = document.getElementById('upload-form');
const cropDialog = document.getElementById('crop-dialog');
const cropConfirmBtn = document.getElementById('crop-confirm');
const cropCancelBtn = document.getElementById('crop-cancel');
const imageToCrop = document.getElementById('image-to-crop');
const animatedPolaroid = document.querySelector('.animated-polaroid');
const downloadLink = document.getElementById('download-link');
const polaroidCanvas = document.getElementById('polaroid-canvas');

// Camera switching logic
const cameras = [
  {
    type: 'svg',
    name: 'Polaroid Classic',
    src: `<svg class=\"camera-svg\" width=\"410\" height=\"348\" viewBox=\"0 0 410 348\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M376.901 343.292L399.49 327.314L403.048 265.055H6.95199L10.5096 327.314L33.0992 343.292H376.901Z\" fill=\"#1D1E20\" /><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M123.457 25.3857H205H286.543C284.339 16.5702 279.931 9.40771 273.32 5H136.68C130.069 9.40771 126.763 16.5702 123.457 25.3857Z\" fill=\"#1D1E20\" /><path d=\"M390.124 187.369V50.1791C390.124 50.1791 389.602 39.5933 386.267 34.7521C382.932 29.9109 373.044 25.3857 373.044 25.3857H286.543H205H123.457H36.9559C36.9559 25.3857 26.4948 30.0125 23.7328 34.7521C20.6514 40.0396 19.876 50.1791 19.876 50.1791V118.774V187.369L5 230.895L6.95199 265.055H403.048L405 230.895L390.124 187.369Z\" fill=\"#FCFCF7\" /><path d=\"M390.124 187.369V50.1791C390.124 50.1791 389.602 39.5933 386.267 34.7521C382.932 29.9109 373.044 25.3857 373.044 25.3857H286.543M390.124 187.369L405 230.895M390.124 187.369H290.399M405 230.895H262.3M405 230.895L403.048 265.055M5 230.895L19.876 187.369M5 230.895H147.7M5 230.895L6.95199 265.055M19.876 187.369V118.774V50.1791C19.876 50.1791 20.6514 40.0396 23.7328 34.7521C26.4948 30.0125 36.9559 25.3857 36.9559 25.3857H123.457M19.876 187.369H93.7052M111.887 187.369H139.986M6.95199 265.055L10.5096 327.314L33.0992 343.292H376.901L399.49 327.314L403.048 265.055M6.95199 265.055H403.048M123.457 25.3857H205H286.543M123.457 25.3857C126.763 16.5702 130.069 9.40771 136.68 5H273.32C279.931 9.40771 284.339 16.5702 286.543 25.3857\" stroke=\"#0C0C0D\" stroke-width=\"8.81543\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"41.9146\" y=\"294.807\" width=\"327.273\" height=\"25.3444\" rx=\"8.81543\" fill=\"#323233\" stroke=\"#0C0C0D\" stroke-width=\"6.61157\" /><rect x=\"41.9146\" y=\"58.9945\" width=\"66.1157\" height=\"33.0578\" rx=\"8.81543\" fill=\"#0C0C0D\" /><rect x=\"307.479\" y=\"44.6694\" width=\"66.1157\" height=\"66.1157\" rx=\"8.81543\" fill=\"#1D1E20\" stroke=\"#0C0C0D\" stroke-width=\"6.61157\" /><circle cx=\"340.537\" cy=\"77.7273\" r=\"22.0386\" fill=\"#2E3033\" stroke=\"#0C0C0D\" stroke-width=\"3.30579\" /><circle cx=\"340.537\" cy=\"77.7272\" r=\"13.2231\" fill=\"#45484D\" stroke=\"#0C0C0D\" stroke-width=\"2.20386\" /><path d=\"M341.198 73.595C341.198 75.8772 339.348 77.7273 337.066 77.7273C334.784 77.7273 332.934 75.8772 332.934 73.595C332.934 71.3129 334.784 69.4628 337.066 69.4628C339.348 69.4628 341.198 71.3129 341.198 73.595Z\" fill=\"#FAFAFA\" /><path d=\"M347.149 82.0248C347.149 82.9377 346.409 83.6777 345.496 83.6777C344.583 83.6777 343.843 82.9377 343.843 82.0248C343.843 81.1119 344.583 80.3719 345.496 80.3719C346.409 80.3719 347.149 81.1119 347.149 82.0248Z\" fill=\"#FAFAFA\" /><circle cx=\"205\" cy=\"116.295\" r=\"74.9311\" fill=\"#1D1E20\" stroke=\"#0C0C0D\" stroke-width=\"8.81543\" /><circle cx=\"205\" cy=\"116.295\" r=\"62.8099\" stroke=\"#FCFCF7\" stroke-width=\"3.30579\" /><circle cx=\"205.551\" cy=\"116.846\" r=\"52.3416\" stroke=\"#292A2C\" stroke-width=\"2.20386\" /><circle cx=\"205.551\" cy=\"116.846\" r=\"57.8512\" stroke=\"#292A2C\" stroke-width=\"2.20386\" /><circle cx=\"205\" cy=\"116.295\" r=\"44.0771\" fill=\"#1D1E20\" stroke=\"#292A2C\" stroke-width=\"7.7135\" /><circle cx=\"205\" cy=\"116.295\" r=\"22.0386\" fill=\"#292A2C\" /><circle cx=\"193.43\" cy=\"102.521\" r=\"13.7741\" fill=\"#FAFAFA\" /><circle cx=\"221.529\" cy=\"130.62\" r=\"5.50964\" fill=\"#FAFAFA\" /><circle cx=\"69.4628\" cy=\"138.333\" r=\"22.0386\" fill=\"#E71302\" stroke=\"#0C0C0D\" stroke-width=\"6.61157\" /></svg>`
  },
  {
    type: 'img',
    name: 'Polaroid 600',
    src: 'src/components/polaroid600.png'
  },
  {
    type: 'img',
    name: 'Polaroid SX-70',
    src: 'src/components/polaroidSX70.png'
  },
  {
    type: 'img',
    name: 'Polaroid OneStep',
    src: 'src/components/polaroidOneStep.png'
  }
];
let currentCamera = 0;

function renderCamera(idx, direction = 0) {
  const area = document.getElementById('camera-area');
  if (!area) return;
  // Animate out current camera
  if (area.firstChild) {
    area.firstChild.classList.add(direction > 0 ? 'slide-left' : 'slide-right');
    setTimeout(() => { area.innerHTML = ''; }, 400);
  }
  setTimeout(() => {
    let cam = cameras[idx];
    let el;
    if (cam.type === 'svg') {
      el = document.createElement('div');
      el.innerHTML = cam.src;
    } else {
      el = document.createElement('img');
      el.src = cam.src;
      el.alt = cam.name;
      el.style.maxWidth = '100%';
      el.style.maxHeight = '100%';
    }
    el.className = 'camera-visual slide-in-' + (direction > 0 ? 'right' : 'left');
    area.appendChild(el);
  }, area.firstChild ? 400 : 0);
}

document.getElementById('camera-prev').onclick = () => {
  currentCamera = (currentCamera - 1 + cameras.length) % cameras.length;
  renderCamera(currentCamera, -1);
};
document.getElementById('camera-next').onclick = () => {
  currentCamera = (currentCamera + 1) % cameras.length;
  renderCamera(currentCamera, 1);
};

document.addEventListener('DOMContentLoaded', () => {
  renderCamera(currentCamera);
});

function showDialog(dialog) {
  dialog.classList.remove('hidden');
  dialog.style.display = 'flex';
}

function hideDialog(dialog) {
  dialog.classList.add('hidden');
  dialog.style.display = 'none';
}

function clearAll() {
  hideDialog(cropDialog);
  animatedPolaroid.classList.add('hidden');
  animatedPolaroid.classList.remove('animate');
  polaroidCanvas.classList.remove('reveal');
  uploadForm.style.display = 'block';  // Show upload form again
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  imageToCrop.src = '';
  croppedImageDataUrl = '';
  const ctx = polaroidCanvas.getContext('2d');
  ctx.clearRect(0, 0, polaroidCanvas.width, polaroidCanvas.height);
}

uploadInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    imageToCrop.src = evt.target.result;
    showDialog(cropDialog);
    setTimeout(() => {
      if (cropper) cropper.destroy();
      cropper = new Cropper(imageToCrop, {
        aspectRatio: 1 / 1,
        background: false,
        viewMode: 0,
      });
    }, 100);
  };
  reader.readAsDataURL(file);
});

cropConfirmBtn.addEventListener('click', function () {
  if (!cropper) return;
  croppedImageDataUrl = cropper.getCroppedCanvas().toDataURL('image/png');
  hideDialog(cropDialog);
  uploadForm.style.display = 'none';  // Hide upload form during animation
  drawPolaroid(croppedImageDataUrl);
});

cropCancelBtn.addEventListener('click', function () {
  clearAll();
});

function drawPolaroid(src) {
  const img = new window.Image();
  img.onload = function () {
    // Set canvas size for polaroid: wider and taller for frame
    const frameWidth = 200;
    const frameHeight = 240;
    const imageSize = 176;
    const frameRadius = 10;
    const imageTop = 12;
    const imageLeft = 12;
    const bottomBorder = 40; // extra space at bottom
    polaroidCanvas.width = frameWidth;
    polaroidCanvas.height = frameHeight;
    const ctx = polaroidCanvas.getContext('2d');
    // Draw white polaroid frame with rounded corners
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(frameRadius, 0);
    ctx.lineTo(frameWidth - frameRadius, 0);
    ctx.quadraticCurveTo(frameWidth, 0, frameWidth, frameRadius);
    ctx.lineTo(frameWidth, frameHeight - frameRadius);
    ctx.quadraticCurveTo(frameWidth, frameHeight, frameWidth - frameRadius, frameHeight);
    ctx.lineTo(frameRadius, frameHeight);
    ctx.quadraticCurveTo(0, frameHeight, 0, frameHeight - frameRadius);
    ctx.lineTo(0, frameRadius);
    ctx.quadraticCurveTo(0, 0, frameRadius, 0);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0,0,0,0.13)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
    // Draw the real image immediately
    ctx.save();
    ctx.beginPath();
    ctx.rect(imageLeft, imageTop, imageSize, imageSize);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, imageLeft, imageTop, imageSize, imageSize);
    ctx.restore();
    // Show and animate the polaroid
    animatedPolaroid.classList.remove('hidden', 'in-front');
    const wrapper = polaroidCanvas.parentElement;
    wrapper.classList.remove('reveal');
    void animatedPolaroid.offsetWidth; // Trigger reflow
    animatedPolaroid.classList.add('animate');
    // Move polaroid in front when it starts moving up (65% of 3.5s = 2.275s)
    setTimeout(() => {
      animatedPolaroid.classList.add('in-front');
    }, 2275);
    // Wait for polaroid animation to finish before revealing image
    setTimeout(() => {
      if (downloadLink) {
        downloadLink.href = polaroidCanvas.toDataURL('image/png', 2.0);
      }
      // Save to gallery in localStorage
      savePolaroidToGallery(polaroidCanvas.toDataURL('image/png', 2.0));
      // Start the development animation (reveal)
      void polaroidCanvas.offsetWidth; // Trigger reflow
      wrapper.classList.add('reveal');
      // Reset everything after 9 seconds (1s after reveal finishes)
      setTimeout(() => {
        clearAll();
        uploadInput.value = '';
      }, 9000);
    }, 3500); // Wait for ejectPolaroid animation to finish
  };
  img.src = src;
}

function savePolaroidToGallery(dataUrl) {
  let gallery = JSON.parse(localStorage.getItem('polaroidGallery') || '[]');
  gallery.push({ dataUrl, date: Date.now() });
  localStorage.setItem('polaroidGallery', JSON.stringify(gallery));
} 