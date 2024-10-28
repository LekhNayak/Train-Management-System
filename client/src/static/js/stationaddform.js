// Fetch zones to populate the zone select list
fetch('/stationform')
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML = html; // Inject the station form with zones into the page

        // Fetch divisions based on the selected zone
        document.getElementById('zoneSelect').addEventListener('change', function() {
            const selectedZone = this.value;
            const divisionSelect = document.getElementById('divisionSelect');
            divisionSelect.innerHTML = '<option value="">Select Division</option>'; // Reset and add placeholder

            if (selectedZone) {
                fetch(`/get-divisions?zone=${selectedZone}`)
                    .then(response => response.json())
                    .then(divisions => {
                        divisions.forEach(division => {
                            const option = document.createElement('option');
                            option.value = division.id;
                            option.textContent = division.name;
                            divisionSelect.appendChild(option);
                        });
                    })
                    .catch(err => console.error('Error fetching divisions:', err));
            }
        });

        // Handle station form submission after loading the form
        document.getElementById('stationForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const stationId = document.getElementById('stationId').value.trim();
            const stationName = document.getElementById('stationName').value.trim();
            const zoneId = document.getElementById('zoneSelect').value; // Gets the selected zone ID from the dropdown
            const divisionId = document.getElementById('divisionSelect').value; // Gets the selected division ID
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');

            // Clear any existing error and success messages
            errorMessage.textContent = '';
            successMessage.textContent = '';

            // Validate input lengths and selections
            if (stationId.length > 5) {
                errorMessage.textContent = 'Station ID must be 5 characters or less';
                return;
            }
            if (stationName.length > 50) {
                errorMessage.textContent = 'Station name must be 50 characters or less';
                return;
            }
            if (!zoneId) {
                errorMessage.textContent = 'Please select a zone';
                return;
            }
            if (!divisionId) {
                errorMessage.textContent = 'Please select a division';
                return;
            }

            const data = {
                stationId: stationId,
                stationName: stationName,
                divisionId: divisionId // Send the selected division ID
            };

            fetch('/add-station', {
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
                this.reset();
                errorMessage.textContent = ''; // Clear any previous error messages

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.textContent = ''; // Clear success message
                }, 3000);
            })
            .catch(err => console.error('Error adding station:', err));
        });
    })
    .catch(err => console.error('Error fetching station form:', err));

// Cancel button handler
function cancelForm() {
    document.getElementById('stationForm').reset(); // Reset the form
    document.getElementById('errorMessage').textContent = ''; // Clear any error messages
    window.location.href = '/'; // Redirect to the desired URL
}
