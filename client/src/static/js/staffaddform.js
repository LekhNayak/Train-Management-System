// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    const stationForm = document.getElementById('staffForm');
    const cancelButton = document.getElementById('cancelButton');

    if (staffForm) {
        staffForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const staffId = document.getElementById('staffId').value.trim();
            const name = document.getElementById('name').value.trim();
            const role = document.getElementById('roleSelect').value; // Gets the selected role from the dropdown
            const dob = document.getElementById('dob').value;
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');

            // Clear any existing error and success messages
            errorMessage.textContent = '';
            successMessage.textContent = '';

            const data = {
                staffId: staffId,
                name: name,
                role: role,
                dob: dob
            };

            fetch('/add-staff', {
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
                this.reset(); // Reset the form
                errorMessage.textContent = ''; // Clear any previous error messages

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.textContent = ''; // Clear success message
                }, 3000);
            })
            .catch(err => {
                console.error('Error adding staff:', err);
                errorMessage.textContent = 'An error occurred while adding staff.'; // Display a generic error message
            });
        });
    } else {
        console.error('Form with ID "staffForm" not found.');
    }

    // Add event listener to cancel button if it exists
    if (cancelButton) {
        cancelButton.addEventListener('click', cancelForm);
    } else {
        console.error('Cancel button with ID "cancelButton" not found.');
    }
});

// Cancel button handler
function cancelForm() {
    document.getElementById('staffForm').reset(); // Reset the form
    document.getElementById('errorMessage').textContent = ''; // Clear any error messages
    window.location.href = '/'; // Redirect to the desired URL
}
