// Handle form submission
document.getElementById('zoneForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const zoneId = document.getElementById('zoneId').value.trim();
    const zoneName = document.getElementById('zoneName').value.trim();
    const hq = document.getElementById('hq').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage'); // New success message element

    // Clear any existing error message
    errorMessage.textContent = '';
    successMessage.textContent = ''; // Clear any previous success messages

    // Validate input lengths
    if (zoneId.length > 4) {
        errorMessage.textContent = 'Zone ID must be 4 characters or less.';
        return;
    }
    if (zoneName.length > 40) {
        errorMessage.textContent = 'Zone must be 40 characters or less.';
        return;
    }
    if (hq.length > 30) {
        errorMessage.textContent = 'Headquarters must be 30 characters or less.';
        return;
    }

    const data = {
        zoneId: zoneId,
        zoneName: zoneName,
        hq: hq
    };

    fetch('/add-zone', {
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
        // Clear any previous error messages
        errorMessage.textContent = '';

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.textContent = ''; // Clear success message
        }, 3000);
    })
    .catch(err => console.error('Error adding zone:', err));
});

// Cancel button handler
function cancelForm() {
    document.getElementById('zoneForm').reset(); // Reset the form
    document.getElementById('errorMessage').textContent = ''; // Clear any error messages
    window.location.href = '/'; // Redirect to the desired URL
}
