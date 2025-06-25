// Application state
let currentScreen = 'location';
let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLocation = null;
let selectedCategory = null;
let contacts = [];
let filteredContacts = [];
let searchTerm = '';
let showSearch = false;

// Translations
const translations = {
    en: {
        appTitle: 'Who Can I Call?',
        appSubtitle: 'Find emergency and civic contacts near you',
        home: 'Home',
        search: 'Search',
        suggest: 'Suggest Contact',
        settings: 'Settings',
        selectCategory: 'Select Issue Category',
        detectingLocation: 'Detecting your location...',
        locationDetected: 'Location detected',
        enterPincode: 'Enter your PIN code',
        pincodePlaceholder: '6-digit PIN code',
        useCurrentLocation: 'Use Current Location',
        manualLocation: 'Enter PIN Code',
        contacts: 'Contacts',
        noContacts: 'No contacts found',
        noContactsDesc: 'Try adjusting your search or location',
        verified: 'Verified',
        workingHours: 'Working Hours',
        callNow: 'Call Now',
        searchPlaceholder: 'Search contacts...',
        suggestContact: 'Suggest New Contact',
        contactName: 'Contact Name',
        phoneNumber: 'Phone Number',
        department: 'Department',
        category: 'Category',
        location: 'Location',
        workingHoursLabel: 'Working Hours',
        additionalInfo: 'Additional Information',
        yourEmail: 'Your Email (optional)',
        submit: 'Submit Suggestion',
        suggestionSubmitted: 'Thank you for your suggestion!',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
        about: 'About',
        version: 'Version',
        loading: 'Loading...',
        error: 'Error',
        retry: 'Retry',
        cancel: 'Cancel',
        save: 'Save',
        close: 'Close',
        required: 'Required',
        optional: 'Optional'
    },
    hi: {
        appTitle: 'किसे कॉल करूं?',
        appSubtitle: 'अपने पास आपातकालीन और नागरिक संपर्क खोजें',
        home: 'होम',
        search: 'खोजें',
        suggest: 'संपर्क सुझाएं',
        settings: 'सेटिंग्स',
        selectCategory: 'समस्या श्रेणी चुनें',
        detectingLocation: 'आपका स्थान खोजा जा रहा है...',
        locationDetected: 'स्थान मिल गया',
        enterPincode: 'अपना पिन कोड डालें',
        pincodePlaceholder: '6-अंकीय पिन कोड',
        useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
        manualLocation: 'पिन कोड डालें',
        contacts: 'संपर्क',
        noContacts: 'कोई संपर्क नहीं मिला',
        noContactsDesc: 'अपनी खोज या स्थान बदलने का प्रयास करें',
        verified: 'सत्यापित',
        workingHours: 'कार्य समय',
        callNow: 'अभी कॉल करें',
        searchPlaceholder: 'संपर्क खोजें...',
        suggestContact: 'नया संपर्क सुझाएं',
        contactName: 'संपर्क नाम',
        phoneNumber: 'फोन नंबर',
        department: 'विभाग',
        category: 'श्रेणी',
        location: 'स्थान',
        workingHoursLabel: 'कार्य समय',
        additionalInfo: 'अतिरिक्त जानकारी',
        yourEmail: 'आपका ईमेल (वैकल्पिक)',
        submit: 'सुझाव भेजें',
        suggestionSubmitted: 'आपके सुझाव के लिए धन्यवाद!',
        language: 'भाषा',
        theme: 'थीम',
        light: 'हल्का',
        dark: 'गहरा',
        system: 'सिस्टम',
        about: 'के बारे में',
        version: 'संस्करण',
        loading: 'लोड हो रहा है...',
        error: 'त्रुटि',
        retry: 'पुनः प्रयास',
        cancel: 'रद्द करें',
        save: 'सेव करें',
        close: 'बंद करें',
        required: 'आवश्यक',
        optional: 'वैकल्पिक'
    }
};

// Categories data
const categories = [
    {
        id: 'crime',
        name: 'Crime & Safety',
        nameHi: 'अपराध और सुरक्षा',
        icon: 'shield',
        color: 'bg-red-500',
        description: 'Police, Emergency Services',
        descriptionHi: 'पुलिस, आपातकालीन सेवाएं'
    },
    {
        id: 'medical',
        name: 'Medical Emergency',
        nameHi: 'चिकित्सा आपातकाल',
        icon: 'heart',
        color: 'bg-pink-500',
        description: 'Hospitals, Ambulance, Health',
        descriptionHi: 'अस्पताल, एम्बुलेंस, स्वास्थ्य'
    },
    {
        id: 'water',
        name: 'Water Supply',
        nameHi: 'जल आपूर्ति',
        icon: 'droplets',
        color: 'bg-blue-500',
        description: 'Water Board, Supply Issues',
        descriptionHi: 'जल बोर्ड, आपूर्ति समस्याएं'
    },
    {
        id: 'electricity',
        name: 'Electricity',
        nameHi: 'बिजली',
        icon: 'zap',
        color: 'bg-yellow-500',
        description: 'Power Grid, Outages',
        descriptionHi: 'पावर ग्रिड, कटौती'
    },
    {
        id: 'roads',
        name: 'Roads & Transport',
        nameHi: 'सड़क और परिवहन',
        icon: 'car',
        color: 'bg-green-500',
        description: 'Traffic, Road Maintenance',
        descriptionHi: 'यातायात, सड़क रखरखाव'
    },
    {
        id: 'animal',
        name: 'Animal Control',
        nameHi: 'पशु नियंत्रण',
        icon: 'dog',
        color: 'bg-orange-500',
        description: 'Animal Rescue, Control',
        descriptionHi: 'पशु बचाव, नियंत्रण'
    },
    {
        id: 'disability',
        name: 'Disability Support',
        nameHi: 'विकलांगता सहायता',
        icon: 'accessibility',
        color: 'bg-purple-500',
        description: 'Accessibility, Support Services',
        descriptionHi: 'पहुंच, सहायता सेवाएं'
    }
];

// Mock contacts data
const mockContacts = [
    {
        id: '1',
        name: 'Mumbai Police Control Room',
        phone: '100',
        department: 'Mumbai Police',
        category: 'crime',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Emergency police assistance'
    },
    {
        id: '2',
        name: 'Women Helpline Mumbai',
        phone: '103',
        department: 'Mumbai Police',
        category: 'crime',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Women safety and assistance'
    },
    {
        id: '3',
        name: 'Emergency Ambulance Mumbai',
        phone: '108',
        department: 'Health Department',
        category: 'medical',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Free ambulance service'
    },
    {
        id: '4',
        name: 'KEM Hospital Emergency',
        phone: '022-24107000',
        department: 'KEM Hospital Mumbai',
        category: 'medical',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400012' },
        description: 'King Edward Memorial Hospital'
    },
    {
        id: '5',
        name: 'BMC Water Supply',
        phone: '1916',
        department: 'Brihanmumbai Municipal Corporation',
        category: 'water',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Water supply complaints'
    },
    {
        id: '6',
        name: 'MSEB Power Outage',
        phone: '19120',
        department: 'Maharashtra State Electricity Board',
        category: 'electricity',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Power outage complaints'
    },
    {
        id: '7',
        name: 'Mumbai Traffic Police Helpline',
        phone: '8454999999',
        department: 'Mumbai Traffic Police',
        category: 'roads',
        workingHours: '24/7',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Traffic related issues'
    },
    {
        id: '8',
        name: 'Animal Helpline Mumbai',
        phone: '022-24137518',
        department: 'Mumbai Animal Welfare',
        category: 'animal',
        workingHours: '9:00 AM - 6:00 PM',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Animal rescue and control'
    },
    {
        id: '9',
        name: 'Disability Helpline Maharashtra',
        phone: '1800-222-363',
        department: 'Social Welfare Department',
        category: 'disability',
        workingHours: '9:00 AM - 5:00 PM',
        isVerified: true,
        location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
        description: 'Disability support services'
    }
];

// Icon SVGs
const icons = {
    shield: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>',
    heart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>',
    droplets: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.5 14.25c0-1.78 1.409-3.25 3.25-3.25s3.25 1.47 3.25 3.25-1.409 3.25-3.25 3.25-3.25-1.47-3.25-3.25z M10.75 6.75c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25z"></path>',
    zap: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
    car: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 6h4l3 6v5a1 1 0 01-1 1h-2m-6 0H9a1 1 0 01-1-1v-5l3-6h4z"></path>',
    dog: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>',
    accessibility: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>'
};

// Utility functions
function t(key) {
    return translations[currentLanguage][key] || key;
}

function updateTexts() {
    // Update header
    document.getElementById('appTitle').textContent = t('appTitle');
    document.getElementById('appSubtitle').textContent = t('appSubtitle');
    
    // Update location screen
    document.getElementById('useLocationTitle').textContent = t('useCurrentLocation');
    document.getElementById('detectLocationText').textContent = t('useCurrentLocation');
    document.getElementById('manualLocationText').textContent = t('manualLocation');
    document.getElementById('enterPincodeTitle').textContent = t('enterPincode');
    document.getElementById('pincodeInput').placeholder = t('pincodePlaceholder');
    
    // Update categories screen
    document.getElementById('selectCategoryTitle').textContent = t('selectCategory');
    
    // Update contacts screen
    document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    document.getElementById('noContactsTitle').textContent = t('noContacts');
    document.getElementById('noContactsDesc').textContent = t('noContactsDesc');
    
    // Update navigation
    document.getElementById('homeNavText').textContent = t('home');
    document.getElementById('searchNavText').textContent = t('search');
    
    // Update settings modal
    document.getElementById('settingsTitle').textContent = t('settings');
    document.getElementById('languageTitle').textContent = t('language');
    document.getElementById('themeTitle').textContent = t('theme');
    document.getElementById('aboutTitle').textContent = t('about');
    
    // Update suggest modal
    document.getElementById('suggestTitle').textContent = t('suggestContact');
}

function applyTheme() {
    const html = document.documentElement;
    
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    } else if (currentTheme === 'light') {
        html.classList.remove('dark');
    } else { // system
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.classList.toggle('dark', prefersDark);
    }
}

function showScreen(screen) {
    document.getElementById('locationScreen').classList.add('hidden');
    document.getElementById('categoriesScreen').classList.add('hidden');
    document.getElementById('contactsScreen').classList.add('hidden');
    document.getElementById(screen + 'Screen').classList.remove('hidden');
    setActiveSidebarLink(screen);
    currentScreen = screen;
}

function showError(message, containerId = 'locationError') {
    const errorContainer = document.getElementById(containerId);
    const errorText = document.getElementById(containerId + 'Text');
    if (errorText) {
        errorText.textContent = message;
    }
    errorContainer.classList.remove('hidden');
}

function hideError(containerId = 'locationError') {
    document.getElementById(containerId).classList.add('hidden');
}

// Location functions
function detectLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser');
        return;
    }
    const detectBtn = document.getElementById('detectLocationBtn');
    const detectText = document.getElementById('detectLocationText');
    detectBtn.disabled = true;
    detectText.textContent = t('detectingLocation');
    hideError();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Mock location data for demo (now Mumbai)
            currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                pincode: '400001',
                city: 'Mumbai',
                state: 'Maharashtra'
            };
            localStorage.setItem('lastKnownLocation', JSON.stringify(currentLocation));
            showScreen('categories');
            loadContacts();
        },
        (error) => {
            showError(error.message);
            detectBtn.disabled = false;
            detectText.textContent = t('useCurrentLocation');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

function setManualLocation(pincode) {
    if (!/^[0-9]{6}$/.test(pincode)) {
        showError('Please enter a valid 6-digit PIN code');
        return;
    }
    // Mock location data for demo (now Mumbai)
    currentLocation = {
        latitude: 19.0760,
        longitude: 72.8777,
        pincode: pincode,
        city: 'Mumbai',
        state: 'Maharashtra'
    };
    localStorage.setItem('lastKnownLocation', JSON.stringify(currentLocation));
    showScreen('categories');
    loadContacts();
}

// Category functions
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = '';
    
    categories.forEach(category => {
        const card = document.createElement('button');
        card.className = 'category-card';
        card.onclick = () => selectCategory(category.id);
        
        const name = currentLanguage === 'hi' ? category.nameHi : category.name;
        const description = currentLanguage === 'hi' ? category.descriptionHi : category.description;
        
        card.innerHTML = `
            <div class="category-icon ${category.color}">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${icons[category.icon]}
                </svg>
            </div>
            <h3 class="font-medium text-gray-900 dark:text-white text-sm mb-1 text-center">${name}</h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">${description}</p>
        `;
        
        grid.appendChild(card);
    });
}

function selectCategory(categoryId) {
    selectedCategory = categoryId;
    showScreen('contacts');
    filterContacts();
    renderContacts();
}

// Contact functions
function loadContacts() {
    contacts = mockContacts;
    filterContacts();
}

function filterContacts() {
    let filtered = contacts;

    // Filter by category
    if (selectedCategory) {
        filtered = filtered.filter(contact => contact.category === selectedCategory);
    }

    // Filter by location (approximate matching for demo)
    if (currentLocation && currentLocation.pincode) {
        filtered = filtered.filter(contact => 
            contact.location.pincode === currentLocation.pincode ||
            contact.location.city.toLowerCase().includes(currentLocation.city.toLowerCase()) ||
            contact.location.state.toLowerCase().includes(currentLocation.state.toLowerCase())
        );
    }

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(contact =>
            contact.name.toLowerCase().includes(term) ||
            contact.department.toLowerCase().includes(term) ||
            contact.phone.includes(term)
        );
    }

    // Sort verified contacts first
    filtered.sort((a, b) => {
        if (a.isVerified && !b.isVerified) return -1;
        if (!a.isVerified && b.isVerified) return 1;
        return a.name.localeCompare(b.name);
    });

    filteredContacts = filtered;
}

function renderContacts() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const noContactsState = document.getElementById('noContactsState');
    const contactsList = document.getElementById('contactsList');
    const contactsGrid = document.getElementById('contactsGrid');
    const contactsTitle = document.getElementById('contactsTitle');

    // Hide all states
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    noContactsState.classList.add('hidden');
    contactsList.classList.add('hidden');

    if (filteredContacts.length === 0) {
        noContactsState.classList.remove('hidden');
        return;
    }

    // Show contacts
    contactsList.classList.remove('hidden');
    contactsTitle.textContent = `${t('contacts')} (${filteredContacts.length})`;
    
    contactsGrid.innerHTML = '';
    
    filteredContacts.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                    <div class="flex items-center mb-1">
                        <h3 class="font-semibold text-gray-900 dark:text-white text-sm">${contact.name}</h3>
                        ${contact.isVerified ? `
                            <svg class="h-4 w-4 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        ` : ''}
                    </div>
                    
                    <div class="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        ${contact.department}
                    </div>
                    
                    ${contact.description ? `
                        <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">${contact.description}</p>
                    ` : ''}
                </div>
                
                ${contact.isVerified ? `
                    <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">${t('verified')}</span>
                ` : ''}
            </div>
            
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${contact.workingHours}
                </div>
            </div>
            
            <button onclick="callContact('${contact.phone}')" class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span class="font-mono font-semibold">${contact.phone}</span>
            </button>
        `;
        
        contactsGrid.appendChild(card);
    });
}

function callContact(phone) {
    window.location.href = `tel:${phone}`;
}

// Search functions
function toggleSearch() {
    showSearch = !showSearch;
    document.getElementById('searchContainer').classList.toggle('hidden', !showSearch);
    document.getElementById('searchNavBtn').classList.toggle('text-red-600', showSearch);
    document.getElementById('searchNavBtn').classList.toggle('bg-red-50', showSearch);
    
    if (showSearch) {
        document.getElementById('searchInput').focus();
    }
}

function handleSearch(event) {
    searchTerm = event.target.value;
    filterContacts();
    renderContacts();
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Settings functions
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update button states
    document.getElementById('englishBtn').className = lang === 'en' 
        ? 'w-full p-3 rounded-lg border text-left transition-colors border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
        : 'w-full p-3 rounded-lg border text-left transition-colors border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800';
    
    document.getElementById('hindiBtn').className = lang === 'hi' 
        ? 'w-full p-3 rounded-lg border text-left transition-colors border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
        : 'w-full p-3 rounded-lg border text-left transition-colors border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800';
    
    updateTexts();
    renderCategories();
    renderContacts();
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    // Update button states
    const themes = ['light', 'dark', 'system'];
    themes.forEach(t => {
        const btn = document.getElementById(t + 'ThemeBtn');
        btn.className = theme === t 
            ? 'w-full p-3 rounded-lg border text-left transition-colors flex items-center border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            : 'w-full p-3 rounded-lg border text-left transition-colors flex items-center border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800';
    });
    
    applyTheme();
}

// Form functions
function handleSuggestForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('suggestName').value,
        phone: document.getElementById('suggestPhone').value,
        department: document.getElementById('suggestDepartment').value,
        category: document.getElementById('suggestCategory').value,
        location: document.getElementById('suggestLocation').value,
        workingHours: document.getElementById('suggestHours').value,
        additionalInfo: document.getElementById('suggestInfo').value,
        email: document.getElementById('suggestEmail').value
    };
    
    console.log('Suggested contact:', formData);
    
    // Show success modal
    hideModal('suggestModal');
    showModal('successModal');
    
    // Reset form
    document.getElementById('suggestForm').reset();
    
    // Hide success modal after 3 seconds
    setTimeout(() => {
        hideModal('successModal');
    }, 3000);
}

function handlePincodeForm(event) {
    event.preventDefault();
    const pincode = document.getElementById('pincodeInput').value;
    setManualLocation(pincode);
}

// Sidebar logic
function openSidebar() {
    document.getElementById('sidebarMenu').classList.remove('hidden');
    document.getElementById('sidebarMenu').classList.add('show');
    document.body.classList.add('sidebar-open');
}
function closeSidebar() {
    document.getElementById('sidebarMenu').classList.add('hidden');
    document.getElementById('sidebarMenu').classList.remove('show');
    document.body.classList.remove('sidebar-open');
}

function setActiveSidebarLink(page) {
    document.getElementById('sidebarLocationBtn').classList.remove('active');
    document.getElementById('sidebarCategoriesBtn').classList.remove('active');
    document.getElementById('sidebarSettingsBtn').classList.remove('active');
    if (page === 'location') {
        document.getElementById('sidebarLocationBtn').classList.add('active');
    } else if (page === 'categories') {
        document.getElementById('sidebarCategoriesBtn').classList.add('active');
    } else if (page === 'settings') {
        document.getElementById('sidebarSettingsBtn').classList.add('active');
    }
}

// Event listeners
function initEventListeners() {
    // Header buttons
    document.getElementById('menuBtn').onclick = openSidebar;
    document.getElementById('searchBtn').onclick = toggleSearch;
    document.getElementById('settingsBtn').onclick = () => showModal('settingsModal');
    
    // Location screen
    document.getElementById('detectLocationBtn').onclick = detectLocation;
    document.getElementById('manualLocationBtn').onclick = () => {
        document.getElementById('locationDetector').classList.add('hidden');
        document.getElementById('manualLocationForm').classList.remove('hidden');
    };
    document.getElementById('cancelPincodeBtn').onclick = () => {
        document.getElementById('locationDetector').classList.remove('hidden');
        document.getElementById('manualLocationForm').classList.add('hidden');
    };
    document.getElementById('manualLocationForm').onsubmit = handlePincodeForm;
    
    // Navigation
    document.getElementById('homeNavBtn').onclick = () => showScreen('categories');
    document.getElementById('searchNavBtn').onclick = toggleSearch;
    document.getElementById('suggestBtn').onclick = () => showModal('suggestModal');
    
    // Search
    document.getElementById('searchInput').oninput = handleSearch;
    
    // Settings modal
    document.getElementById('closeSettingsBtn').onclick = () => hideModal('settingsModal');
    document.getElementById('englishBtn').onclick = () => setLanguage('en');
    document.getElementById('hindiBtn').onclick = () => setLanguage('hi');
    document.getElementById('lightThemeBtn').onclick = () => setTheme('light');
    document.getElementById('darkThemeBtn').onclick = () => setTheme('dark');
    document.getElementById('systemThemeBtn').onclick = () => setTheme('system');
    
    // Suggest modal
    document.getElementById('closeSuggestBtn').onclick = () => hideModal('suggestModal');
    document.getElementById('cancelSuggestBtn').onclick = () => hideModal('suggestModal');
    document.getElementById('suggestForm').onsubmit = handleSuggestForm;
    
    // Close modals on backdrop click
    document.getElementById('settingsModal').onclick = (e) => {
        if (e.target === e.currentTarget) hideModal('settingsModal');
    };
    document.getElementById('suggestModal').onclick = (e) => {
        if (e.target === e.currentTarget) hideModal('suggestModal');
    };
    
    // System theme change listener
    if (currentTheme === 'system') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    }

    // Sidebar menu
    document.getElementById('closeSidebarBtn').onclick = closeSidebar;
    document.getElementById('sidebarBackdrop').onclick = closeSidebar;
    document.getElementById('sidebarLocationBtn').onclick = function() {
        closeSidebar();
        showScreen('location');
    };
    document.getElementById('sidebarCategoriesBtn').onclick = function() {
        closeSidebar();
        showScreen('categories');
    };
    document.getElementById('sidebarSettingsBtn').onclick = function() {
        closeSidebar();
        showModal('settingsModal');
        setActiveSidebarLink('settings');
    };
}

// Initialize app
function init() {
    // Apply initial theme
    applyTheme();
    
    // Update texts
    updateTexts();
    
    // Always start on location screen
    showScreen('location');
    // Remove auto-navigation to categories if location exists
    // const savedLocation = localStorage.getItem('lastKnownLocation');
    // if (savedLocation) {
    //     try {
    //         currentLocation = JSON.parse(savedLocation);
    //         showScreen('categories');
    //         loadContacts();
    //     } catch (e) {
    //         console.error('Failed to parse saved location');
    //     }
    // }
    
    // Render categories
    renderCategories();
    
    // Initialize event listeners
    initEventListeners();
    
    // On app init, set the correct sidebar highlight
    setActiveSidebarLink(currentScreen);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);