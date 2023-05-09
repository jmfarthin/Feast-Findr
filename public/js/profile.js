var formUpdatingHandler = async (event) => {
    if (event.target.hasAttribute('truck-id')) {
        const id = event.target.getAttribute('truck-id');
        const address = document.querySelector('#address').value.trim();

        if (address) {
            const response = await fetch(`/api/foodTruck/${id}`, {
                method: 'PUT',
                body: JSON.stringify({address}),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to update Address');
            }
        }
    }
}

document
    .querySelector('.control')
    .addEventListener('click', formUpdatingHandler);