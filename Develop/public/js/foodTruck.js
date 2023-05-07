
// Add a food truck
const truckFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the create truck form
    const truckName = document.querySelector('#food-truck-name').value.trim();
    const cuisine = document.querySelector('#cuisine').value.trim();
    const description = document.querySelector('#description').value.trim();
    const image = document.querySelector('#image').value.trim();
    const phoneNumber = document.querySelector('#phone-number').value.trim();
    const link = document.querySelector('#link').value.trim();
    const address = document.querySelector('#address').value.trim();

    if (truckName && cuisine && description && phoneNumber && address) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/foodTrucks', {
            method: 'POST',
            body: JSON.stringify({ truckName, cuisine, description, image, phoneNumber, link }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the user profile page
            document.location.replace('/addMenu');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#truck-form')
    .addEventListener('submit', truckFormHandler);

