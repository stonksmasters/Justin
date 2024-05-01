document.addEventListener('DOMContentLoaded', function() {
    const modelContainer = document.getElementById('model-container');

    fetch('honda.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(models => {
        models.forEach(model => {
            const modelSection = document.createElement('section');
            modelSection.id = model.model.toLowerCase().replace(/\s+/g, '-');

            let galleryHTML = '';
            if (model.gallery.length > 0) {
                galleryHTML = `
                    <div class="gallery-container">
                        <div class="gallery-slider">
                            ${model.gallery.map((img, index) => `
                                <div class="slide" style="background-image: url('${img}'); ${index === 0 ? '' : 'display: none;'}"></div>
                            `).join('')}
                        </div>
                        <button class="gallery-prev">❮</button>
                        <button class="gallery-next">❯</button>
                    </div>
                `;
            }

            modelSection.innerHTML = `
                <h2>${model.model}</h2>
                <p>${model.description}</p>
                <h3>Highlights</h3>
                <ul>${model.highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>
                <h3>Key Features</h3>
                <ul>${Object.values(model.features).flat().map(feature => `<li>${feature}</li>`).join('')}</ul>
                <h3>Colors and Trims</h3>
                <p>Available in colors such as ${model.colors.exterior.join(', ')} for the exterior and ${model.colors.interior.join(', ')} for the interior.</p>
                <p>Trims include: ${Object.entries(model.trims).map(([trim, desc]) => `<b>${trim}</b>: ${desc}`).join(', ')}</p>
                <h3>Gallery</h3>
                ${galleryHTML}
            `;

            modelContainer.appendChild(modelSection);
            if (model.gallery.length > 0) {
                initializeGallery(modelSection.querySelector('.gallery-container'));
            }
        });
    })
    .catch(error => {
        console.error('Failed to load model data:', error);
        modelContainer.innerHTML = '<p>Error loading model details.</p>';
    });
});

function initializeGallery(galleryContainer) {
    const prevButton = galleryContainer.querySelector('.gallery-prev');
    const nextButton = galleryContainer.querySelector('.gallery-next');
    const slides = galleryContainer.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].style.display = 'none';
        slides[index].style.display = 'block';
        currentSlide = index;
    }

    nextButton.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    });

    showSlide(currentSlide); // Show first slide initially
}
document.addEventListener('DOMContentLoaded', function() {
    const testDriveButtons = document.querySelectorAll('.test-drive-btn');
    const modal = document.getElementById('testDriveModal');
    const closeModal = document.getElementById('closeModal');

    testDriveButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
});
