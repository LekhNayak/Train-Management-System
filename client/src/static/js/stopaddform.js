document.addEventListener('DOMContentLoaded', () => {
    const trainSelect = document.getElementById('trainSelect');
    const stationRows = document.getElementById('stationRows');
    const formContainer = document.getElementById('form-container');
    const addButton = document.getElementById('addStopButton');
    const end1Input = document.getElementById('end1');
    const depart1Input = document.getElementById('depart1');
    const end2Input = document.getElementById('end2');
    const arrival2Input = document.getElementById('arrival2');

    // Initially hide the station rows and add button
    stationRows.style.display = 'none';
    addButton.style.display = 'none';
    formContainer.style.width = '400px';

    // Event listener for train selection
    trainSelect.addEventListener('change', function() {
        if (this.value) {
            // If a train is selected, display the station rows and button
            stationRows.style.display = 'block';
            addButton.style.display = 'flex';
            formContainer.style.width = '550px';

            // Fetch station data based on selected train
            fetch(`/stopform?trainSelect=${this.value}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Set both end stations in their respective input fields
                    end1Input.value = data.end1_name; // First end station
                    end2Input.value = data.end2_name; // Second end station
                    depart1Input.value = data.end1_depart; // Departure time for end1
                    arrival2Input.value = data.end2_arrival; // Arrival time for end2
                })
                .catch(error => {
                    console.error('Error fetching station data:', error);
                });
        } else {
            stationRows.style.display = 'none';
            addButton.style.display = 'none';
            end1Input.value = ''; // Clear end1 input
            end2Input.value = ''; // Clear end2 input
            depart1Input.value = ''; // Departure time for end1
            arrival2Input.value = ''; // Arrival time for end2
        }
    });

    addButton.addEventListener('click', function() {
        // Create new station row
        const newStationRow = document.createElement('div');
        newStationRow.classList.add('station-row');

        // Create the input fields for the new stop
        newStationRow.innerHTML = `
            <select name="station" required>
                <option value="">Select Station</option>
                <!-- Dynamic station options will be filled here -->
            </select>
            <input type="number" id="order" name="order" required>
            <input type="time" id="arrival" name="arrival" required>
            <input type="time" id="depart" name="depart" required>
        `;

        const lastStationRow = stationRows.querySelector('.station-row:last-child');

        // Insert the new station row before the last station row
        stationRows.insertBefore(newStationRow, lastStationRow);

        fetch('/allstations') // Ensure this endpoint exists in your backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const stationSelect = newStationRow.querySelector('select[name="station"]');
            stationSelect.innerHTML += data.optionsHtml; 
        })
        .catch(error => {
            console.error('Error fetching all stations:', error);
        });
    });

    const stopForm = document.getElementById('stopForm');
    // Add event listener for form submission
    stopForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submitted");
        // Collect form data
        const formData = new FormData(stopForm);
        const stopsData = [];
    
        // Collecting end stations
        
        stopsData.push({
            trainNo: formData.get('train'),
            stationId: end1Input, // end1 station ID
            order: formData.get('order1'),
            arrival: formData.get('arrival1'), // Arrival time for end1
            depart: depart1Input, // Departure time for end1
        });
    
        // Collecting middle stops
        const middleStops = stationRows.querySelectorAll('.stationRows');
        middleStops.forEach((row, index) => {
            const stationSelect = row.querySelector('select[name="station"]');
            const trainSelect = row.querySelector('select[name="train"]');
            const orderInput = row.querySelector('input[name="order"]');
            const arrivalInput = row.querySelector('input[name="arrival"]');
            const departInput = row.querySelector('input[name="depart"]');
    
            stopsData.push({
                trainNo: formData.get('train'),
                stationId: end2Input,
                order: orderInput.value, 
                arrival: arrival2Input,
                depart: departInput.value,
            });
        });

        stopsData.push({
            trainNo: formData.get('train'),
            stationId: formData.get('end2'), // end2 station ID
            order: formData.get('order2'),
            arrival: formData.get('arrival2'), // Arrival time for end2
            depart: formData.get('depart2'), // Departure time for end2
        });
    
        // Send stopsData to backend for insertion
        fetch('/add-stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stops: stopsData }),  // Pass all stops in body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {
            // Handle success response
            console.log(data.message); // Log success message
            alert(data.message); // Optionally alert user
        })

        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error: ' + error.message); // Alert user in case of an error
        });
    });
    
});
