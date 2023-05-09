
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
    const address = document.getElementById('address').value.trim();
    // const address = document.querySelector('#address').value.trim();

    const newTruck = {
        owner_id: owner_id,
        name: name,
        cuisine: cuisine,
        description: description,
        image: image,
        contact_info: contact_info,
        social_media_links: { website: social_media_links },
        address: address
    };

    if (name && cuisine && description && contact_info && address) {
        // Send a POST request to the API endpoint
        try {
            console.log(JSON.stringify(newTruck));
            const response = await fetch('/api/foodTruck', {
                method: 'POST',
                body: JSON.stringify(newTruck),
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


