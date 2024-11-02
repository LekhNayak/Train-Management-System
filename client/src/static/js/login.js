// client/js/login.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Clear any existing error message
    errorMessage.textContent = '';

    // Send the data to the backend for validation
    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/station'; // Redirect on successful login
        } else {
            errorMessage.textContent = data.message; // Display error message
        }
    })
    .catch(err => console.error('Error during authentication:', err));
});
