// =======================
// IMAGE CONFIGURATION
// =======================
// Simply add your images here and the gallery will auto-generate!
// Format: 'imageName.png': { title: 'Project Title', category: 'category', description: 'Description' }

const Images = {
    'Invsys.PNG': {
        title: 'Dynamic Inventory System',
        category: '3d',
        description: 'Click to enlarge'
    },
    'Combds.PNG': {
        title: 'Combat with level and DataStore',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Stats.PNG': {
        title: 'Integrative Stats System',
        category: 'mobile',
        description: 'Click to enlarge'
    },
    'Craft.PNG': {  
        title: 'Scalable Crafting System',
        category: '3d',
        description: 'Click to enlarge'
    },
    'Charactersys.PNG': {
        title: 'Character Customization System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'DataStore.PNG': {
        title: 'Integrative DataStore System',
        category: 'mobile',
        description: 'Click to enlarge'
    },
    'Modules.PNG': {
        title: 'Organized Modular Scripting',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Plugins.PNG': {
        title: 'Dynamic Game Plugins Creation',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Skilltree.PNG': {
        title: 'Dynamic Skill Tree System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Skills.png': {
        title: 'Smooth Skill System Implementation',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Topbar.PNG': {
        title: 'Organized and Customizable Topbar System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Rounds.png': {
        title: 'Scalable Rounds System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'RNG.PNG': {
        title: 'Scalable/Editable RNG System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Gamepass.PNG': {
        title: 'Gamepass System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'BoatSys.png': {
        title: 'Boat System',
        category: '2d',
        description: 'Click to enlarge'
    },
    'Dialogue.PNG': {
        title: 'Dialogue System',
        category: '2d',
        description: 'Click to enlarge'
    },
    
};

// =======================
// GALLERY GENERATION
// =======================

let filteredImages = Object.entries(Images);

function generateGallery(imagesToDisplay = null) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const imagesToRender = imagesToDisplay || filteredImages;

    imagesToRender.forEach(([imageName, imageData]) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.setAttribute('data-category', imageData.category);
        galleryItem.setAttribute('data-image', imageName);

        // Create placeholder or image
        const imageElement = document.createElement('img');
        imageElement.src = imageName;
        imageElement.alt = imageData.title;
        imageElement.onerror = function() {
            // If image fails to load, show placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.classList.add('placeholder-image');
            placeholder.textContent = imageData.title;
            this.parentNode.appendChild(placeholder);
        };

        const overlay = document.createElement('div');
        overlay.classList.add('gallery-overlay');
        overlay.innerHTML = `
            <div class="overlay-text">
                <p>${imageData.description}</p>
            </div>
        `;

        const titleElement = document.createElement('div');
        titleElement.classList.add('gallery-title');
        titleElement.textContent = imageData.title;

        galleryItem.appendChild(imageElement);
        galleryItem.appendChild(titleElement);
        galleryItem.appendChild(overlay);

        // Add click listener to enlarge
        galleryItem.addEventListener('click', function() {
            openModal(imageName, imageData.title);
        });

        gallery.appendChild(galleryItem);
    });
}

// =======================
// MODAL FUNCTIONALITY
// =======================

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close');
let currentImageIndex = 0;

function openModal(imageName, title) {
    // Clear modal content first to prevent duplication
    modalImage.style.display = 'block';
    const existingPlaceholders = modal.querySelectorAll('.modal-placeholder');
    existingPlaceholders.forEach(p => p.remove());
    
    modal.classList.add('show');
    modalImage.src = imageName;
    modalImage.style.opacity = '0';
    
    // Fade in image
    modalImage.onload = function() {
        this.style.opacity = '1';
    };
    
    modalImage.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.classList.add('modal-placeholder');
        placeholder.innerHTML = `<div class="placeholder-large">${title}</div>`;
        modal.appendChild(placeholder);
    };
    
    modalCaption.textContent = title;
    document.body.style.overflow = 'hidden';
    currentImageIndex = filteredImages.findIndex(([name]) => name === imageName);
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// =======================
// FILTER FUNCTIONALITY
// =======================
// Filters removed - all images now display by default

// =======================
// INITIALIZATION
// =======================

document.addEventListener('DOMContentLoaded', function() {
    generateGallery();

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
