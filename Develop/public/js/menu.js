// Add menu form

let menuItems = [];
const truckId = document.querySelector('#truck-id').getAttribute('data-id');
const memuForm = document.getElementById('menu-form');
const itemsContainer = document.getElementById('items-container');
const addItemButton = document.getElementById('add-menu-item');

addItemButton.addEventListener('click', () => {
    // Only add menu item if there are fewer than 10
    if (menuItems.length < 10) {
        // Create new menu item element
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');

        // Create inputs for name, description, and price
        const itemNameInput = document.createElement('input');
        itemNameInput.type = 'text';
        itemNameInput.name = `item-${menuItems.length + 1}-name`;
        itemNameInput.id = `item-${menuItems.length + 1}-name`;
        const itemDescriptionInput = document.createElement('input');
        itemDescriptionInput.type = 'text';
        itemDescriptionInput.name = `item-${menuItems.length + 1}-description`;
        itemDescriptionInput.id = `item-${menuItems.length + 1}-description`;
        const itemPriceInput = document.createElement('input');
        itemPriceInput.type = 'number';
        itemPriceInput.name = `item-${menuItems.length + 1}-price`;
        itemPriceInput.id = `item-${menuItems.length + 1}-price`;
        itemPriceInput.step = '0.01';

        // Add inputs to menu item element
        menuItemElement.appendChild(document.createTextNode('Name: '));
        menuItemElement.appendChild(itemNameInput);
        menuItemElement.appendChild(document.createTextNode(' Description: '));
        menuItemElement.appendChild(itemDescriptionInput);
        menuItemElement.appendChild(document.createTextNode(' Price: $'));
        menuItemElement.appendChild(itemPriceInput);

        // Add menu item element to container
        itemsContainer.appendChild(menuItemElement);

        // Add new menu item to menuItems array
        menuItems.push({
            food_truck_id: '',
            name: '',
            description: '',
            price: ''
        });
    }
});




const menuFormHandler = async (event) => {
    event.preventDefault();

    // Update menuItems array with form data
    for (let i = 0; i < menuItems.length; i++) {
        const itemName = document.getElementById(`item-${i + 1}-name`).value;
        const itemDescription = document.getElementById(`item-${i + 1}-description`).value;
        const itemPrice = document.getElementById(`item-${i + 1}-price`).value;

        menuItems[i] = {
            food_truck_id: truckId,
            name: itemName,
            description: itemDescription,
            price: itemPrice
        };
    }

    // send menu
    const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ menuItems })
    });

    if (response.ok) {
        // If successful, redirect the browser to the user profile page
        document.location.replace('/profile');
    } else {
        console.error();
    }

};

document
    .querySelector('#menu-form')
    .addEventListener('submit', menuFormHandler);