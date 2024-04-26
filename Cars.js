document.addEventListener('DOMContentLoaded', function() {
    const carListElement = document.getElementById('car-list');
    const statusButtons = document.querySelectorAll('.filter-status');
    const typeButtons = document.querySelectorAll('.filter-type');
    let currentStatus = 'all'; // Default to show all
    let currentType = 'all'; // Default to show all

    fetch('cars.json')
        .then(response => response.json())
        .then(cars => {
            displayCars(cars); // Display all cars initially
            
            statusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    currentStatus = button.dataset.filter; // Update current status filter
                    filterCars(cars, currentStatus, currentType);
                });
            });

            typeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    currentType = button.dataset.filter; // Update current type filter
                    filterCars(cars, currentStatus, currentType);
                });
            });
        })
        .catch(error => console.error('Error loading car data:', error));

    function displayCars(cars) {
        carListElement.innerHTML = cars.map(car => `
            <div class="card">
                <img src="${car.images[0]}" alt="${car.model}">
                <h3>${car.model} - ${car.year}</h3>
                <p>Type: ${car.type}, Status: ${car.status}</p>
            </div>
        `).join('');
    }

    function filterCars(cars, status, type) {
        const filteredCars = cars.filter(car => {
            return (status === 'all' || car.status.toLowerCase() === status) &&
                   (type === 'all' || car.type.toLowerCase() === type);
        });
        displayCars(filteredCars);
    }
    
});
