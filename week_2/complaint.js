import { supabase } from './supabase-init.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const toggle = document.getElementById("anonymityToggle");
    const nameInput = document.getElementById("nameInput");
    const nameGroup = document.getElementById("nameGroup");
    const cameraButton = document.getElementById("cameraButton");
    const fileInput = document.getElementById("fileInput");
    const modal = document.getElementById("upload-modal");
    const closeModalBtn = document.querySelector(".close-button");
    const cameraModalButton = document.getElementById("camera-modal-button");
    const fileModalButton = document.getElementById("file-modal-button");
    const fileListContainer = document.getElementById("file-list");
    const fileCount = document.getElementById("file-count");
    const descriptionGroup = document.querySelector(".description-group");
    const descriptionDisplay = document.getElementById("descriptionDisplay");
    const descriptionInput = document.getElementById("descriptionInput");
    const titleInput = document.querySelector('.form-group input[placeholder="Title of Complaint"]');
    const typeInput = document.querySelector('.form-group input[placeholder="Type of complaint"]');
    const submitBtn = document.getElementById("submitBtn");
    
    let uploadedFiles = [];

    // --- Anonymity Toggle ---
    if(toggle) {
        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                nameInput.disabled = true;
                nameInput.value = '';
                nameGroup.classList.add("disabled");
            } else {
                nameInput.disabled = false;
                nameGroup.classList.remove("disabled");
            }
        });
        // Initialize state on page load
        if (toggle.checked) {
            nameInput.disabled = true;
            nameInput.value = '';
            nameGroup.classList.add("disabled");
        }
    }

    // --- Expandable Description ---
    if(descriptionGroup) {
        descriptionGroup.addEventListener('click', () => {
            descriptionDisplay.style.display = 'none';
            descriptionInput.classList.add('show');
            descriptionInput.focus();
        });
    }

    if(descriptionInput) {
        descriptionInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); descriptionInput.blur(); }
        });
        descriptionInput.addEventListener('blur', () => {
            if (!descriptionInput.value) { descriptionDisplay.style.display = 'block'; }
            descriptionInput.classList.remove('show');
        });
    }

    // --- Photo Upload Modal ---
    if(cameraButton && modal) { 
        cameraButton.addEventListener("click", () => { 
            modal.style.display = "flex"; 
        }); 
    } else {
        console.log('cameraButton or modal not found:', cameraButton, modal);
    }
    if(closeModalBtn) { closeModalBtn.addEventListener("click", () => { modal.style.display = "none"; }); }
    window.addEventListener("click", (e) => { if (e.target == modal) { modal.style.display = "none"; } });
    if(cameraModalButton) { cameraModalButton.addEventListener("click", () => { modal.style.display = "none"; capturePhoto(); }); }
    if(fileModalButton) { fileModalButton.addEventListener("click", () => { modal.style.display = "none"; fileInput.click(); }); }
    if(fileInput) { fileInput.addEventListener('change', handleFileSelect); }
    if(fileCount) { fileCount.addEventListener('click', toggleFileList); }

    // Camera capture modal elements
    const cameraCaptureModal = document.getElementById('camera-capture-modal');
    const cameraVideo = document.getElementById('camera-video');
    const capturePhotoBtn = document.getElementById('capture-photo-btn');
    const closeCameraModalBtn = document.getElementById('close-camera-modal');
    let cameraStream = null;

    if(closeCameraModalBtn) {
        closeCameraModalBtn.addEventListener('click', closeCameraModal);
    }
    if(capturePhotoBtn) {
        capturePhotoBtn.addEventListener('click', captureFromVideo);
    }

    function handleFileSelect(event) {
        uploadedFiles.push(...event.target.files);
        updateFileList();
    }
    
    function updateFileList() {
        fileListContainer.innerHTML = "";
        if (uploadedFiles.length > 0) {
            cameraButton.style.display = 'none';
            fileCount.style.display = 'inline-block';
            fileCount.textContent = `${uploadedFiles.length} photo(s) uploaded`;
        } else {
            cameraButton.style.display = '';
            fileCount.style.display = 'none';
        }
        uploadedFiles.forEach(file => {
            const li = document.createElement("li");
            li.className = 'file-list-item';
            const img = document.createElement("img");
            img.className = 'file-thumb';
            img.src = URL.createObjectURL(file);
            img.onload = () => { URL.revokeObjectURL(img.src); };
            const nameSpan = document.createElement("span");
            nameSpan.textContent = file.name;
            li.appendChild(img);
            li.appendChild(nameSpan);
            fileListContainer.appendChild(li);
        });
    }

    function toggleFileList() {
        if (fileListContainer.style.display === 'none' || fileListContainer.style.display === '') {
            fileListContainer.style.display = 'block';
        } else {
            fileListContainer.style.display = 'none';
        }
    }

    function capturePhoto() {
        if (!navigator.mediaDevices?.getUserMedia) return alert("Camera not supported.");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                cameraStream = stream;
                cameraVideo.srcObject = stream;
                cameraCaptureModal.style.display = 'flex';
            }).catch(() => alert("Could not access camera."));
    }

    function captureFromVideo() {
        if (!cameraStream) return;
        const trackSettings = cameraStream.getVideoTracks()[0].getSettings();
        const canvas = document.createElement('canvas');
        canvas.width = cameraVideo.videoWidth || trackSettings.width || 320;
        canvas.height = cameraVideo.videoHeight || trackSettings.height || 240;
        canvas.getContext('2d').drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            const file = new File([blob], `capture-${Date.now()}.png`, { type: 'image/png' });
            uploadedFiles.push(file);
            updateFileList();
            closeCameraModal();
        }, 'image/png');
    }

    function closeCameraModal() {
        cameraCaptureModal.style.display = 'none';
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        cameraVideo.srcObject = null;
    }
    
    // --- Form Submission ---
    if(submitBtn) {
        submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return alert("Please log in to submit.");

            const imageUrls = [];
            for (const file of uploadedFiles) {
                const fileName = `${user.id}/${Date.now()}_${file.name}`;
                const { error } = await supabase.storage.from('complaint-images').upload(fileName, file);
                if (error) return alert("Image upload failed.");
                const { data } = supabase.storage.from('complaint-images').getPublicUrl(fileName);
                imageUrls.push(data.publicUrl);
            }

            const { error } = await supabase.from('complaints').insert([{
                user_id: user.id,
                name: toggle.checked ? null : nameInput.value,
                title: titleInput.value,
                type: typeInput.value,
                description: descriptionInput.value,
                is_anonymous: toggle.checked,
                image_urls: imageUrls
            }]);

            if (error) return alert("Error submitting complaint.");
            
            showToast();
            setTimeout(() => { window.location.href = "homepage.html"; }, 2000);
        });
    }
    
    function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => { toast.classList.remove("show"); }, 3000);
    }
});
