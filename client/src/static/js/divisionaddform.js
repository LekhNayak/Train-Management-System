// Fetch zones to populate the select list
fetch('/divisionform')
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML = html; // Inject the division form with zones into the page

        // Handle division form submission after loading the form
        document.getElementById('divisionForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const divisionId = document.getElementById('divisionId').value.trim();
            const divisionName = document.getElementById('divisionName').value.trim();
            const zoneId = document.getElementById('zoneSelect').value; // Gets the selected zone ID from the dropdown
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');

            // Clear any existing error and success messages
            errorMessage.textContent = '';
            successMessage.textContent = '';

            // Validate input lengths
            if (divisionId.length > 5) {
                errorMessage.textContent = 'Division ID must be 5 characters or less';
                return;
            }
            if (divisionName.length > 30) {
                errorMessage.textContent = 'Division must be 30 characters or less';
                return;
            }
            if(zoneId.length === 0){
                errorMessage.textContent = 'Please select a zone';
                return;
            }

            const data = {
                divisionId: divisionId,
                divisionName: divisionName,
                zone: zoneId // Send the selected zone ID
            };

            fetch('/add-division', {
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
            .catch(err => console.error('Error adding division:', err));
        });
    })
    .catch(err => console.error('Error fetching division form:', err));

// Cancel button handler
function cancelForm() {
    document.getElementById('divisionForm').reset(); // Reset the form
    document.getElementById('errorMessage').textContent = ''; // Clear any error messages
    window.location.href = '/'; // Redirect to the desired URL
}
