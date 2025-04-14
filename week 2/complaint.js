const toggle = document.getElementById('anonymityToggle');
  const nameInput = document.getElementById('nameInput');
  const nameGroup = document.getElementById('nameGroup');

  toggle.addEventListener('change', () => {
    const disabled = toggle.checked;
    nameInput.disabled = disabled;
    nameGroup.classList.toggle('disabled', disabled);
  });

  const descDisplay = document.getElementById('descriptionDisplay');
  const descInput = document.getElementById('descriptionInput');
  
  function expandDescription() {
    descDisplay.style.display = 'none';
    descInput.classList.add('show');
    descInput.focus();
  }
  
  function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const lines = descInput.value.split('\n');
      const preview = lines[0] || 'Enter Description';
      descDisplay.textContent = preview;
      descInput.classList.remove('show');
      descDisplay.style.display = 'block';
    }
  }
  