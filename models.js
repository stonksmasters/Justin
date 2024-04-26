document.addEventListener('DOMContentLoaded', function() {
    const modelContainer = document.getElementById('model-container');

    fetch('honda.json')  // Make sure the path to honda.json is correct.
    .then(response => response.json())
    .then(models => {
        models.forEach(model => {
            const modelHtml = `
                <section id="${model.model.toLowerCase().replace(/\s/g, '-')}">
                    <h2>${model.model}</h2>
                    <p>${model.description}</p>
                    <h3>Highlights</h3>
                    <ul>${model.highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>
                    <h3>Key Features</h3>
                    <ul>${model.features.Performance.concat(model.features.Technology, model.features.Safety).map(feature => `<li>${feature}</li>`).join('')}</ul>
                    <h3>Colors and Trims</h3>
                    <p>Available in colors such as ${model.colors.exterior.join(', ')} for the exterior and ${model.colors.interior.join(', ')} for the interior.</p>
                    <p>Trims include: ${Object.keys(model.trims).join(', ')}.</p>
                </section>
            `;
            modelContainer.innerHTML += modelHtml;
        });
    })
    .catch(error => console.error('Failed to load model data:', error));
});
