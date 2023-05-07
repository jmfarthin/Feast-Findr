
// Add a food truck
const truckFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the create truck form
    const name = document.querySelector('#food-truck-name').value.trim();
    const cuisine = document.querySelector('#cuisine').value.trim();
    const description = document.querySelector('#description').value.trim();
    const image = document.querySelector('#image').value.trim();
    const contact_info = document.querySelector('#contact').value.trim();
    const social_media_links = document.querySelector('#link').value.trim();
    const owner_id = document.getElementById('truck-form').getAttribute('data-session');
    // const address = document.querySelector('#address').value.trim();



    if (name && cuisine && description && contact_info) {
        // Send a POST request to the API endpoint
        try {
            console.log(JSON.stringify({ owner_id, name, cuisine, description, image, contact_info, social_media_links }));
            const response = await fetch('/api/foodTruck', {
                method: 'POST',
                body: JSON.stringify({ owner_id, name, cuisine, description, image, contact_info, social_media_links }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, redirect the browser to the user profile page
                document.location.replace('/menu');
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }

    }
};

document
    .querySelector('#truck-form')
    .addEventListener('submit', truckFormHandler);


