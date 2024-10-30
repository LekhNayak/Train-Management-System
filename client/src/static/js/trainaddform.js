document.getElementById('trainForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        trainno: document.getElementById('trainno').value,
        trainName: document.getElementById('trainName').value,
        type: document.getElementById('typeSelect').value,
        route: document.getElementById('routeSelect').value,
        departure: document.getElementById('departure').value,
        arrival: document.getElementById('arrival').value,
        direction: document.querySelector('input[name="direction"]:checked').value,
    };

    fetch('/trains/add-train', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Alert success message
        document.getElementById('trainForm').reset(); // Clear the form
    })
    .catch(error => console.error('Error:', error));
});
