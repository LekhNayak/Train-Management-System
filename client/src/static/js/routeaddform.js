document.addEventListener('DOMContentLoaded', function() {
    const routeForm = document.getElementById('routeForm');
    const station1Select = document.getElementById('station1Select');
    const station2Select = document.getElementById('station2Select');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Fetch stations and populate the dropdowns
    function fetchStations() {
        fetch('/routeform')
            .then(response => response.json())
            .then(stations => {
                populateSelect(station1Select, stations);
                populateSelect(station2Select, stations);
            })
            .catch(err => console.error('Error fetching stations:', err));
    }

    function populateSelect(selectElement, stations) {
        stations.forEach(station => {
            const option = document.createElement('option');
            option.value = station;
            option.textContent = station;
            selectElement.appendChild(option);
        });
    }

    // Handle form submission
    routeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const routeId = document.getElementById('routeId').value.trim();
        const station1 = station1Select.value;
        const station2 = station2Select.value;
        errorMessage.textContent = ''; // Clear previous messages
        successMessage.textContent = '';

        if (!routeId || !station1 || !station2) {
            errorMessage.textContent = 'Please fill in all required fields.';
            return;
        }

        const data = {
            routeId: routeId,
            station1: station1,
            station2: station2
        };

        fetch('/add-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(message => {
                    errorMessage.textContent = message; // Display server-side error message
                    throw new Error(message);
                });
            }
            return response.text();
        })
        .then(message => {
            successMessage.textContent = message; // Display success message
            routeForm.reset(); // Reset the form
            setTimeout(() => {
                successMessage.textContent = ''; // Hide success message after 3 seconds
            }, 3000);
        })
        .catch(err => console.error('Error adding route:', err));
    });

    // Cancel button handler
    window.cancelForm = function() {
        routeForm.reset(); // Reset the form
        errorMessage.textContent = ''; // Clear any error messages
        window.location.href = '/'; // Redirect to home or desired URL
    };

    // Fetch stations on page load
    fetchStations();
});
