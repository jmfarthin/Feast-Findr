

const form = document.getElementById('menu-form');
const menuItemsContainer = document.getElementById('items-container');
const addMenuItemButton = document.getElementById('add-menu-item');
const truckId = document.getElementById('for-truck-id').getAttribute('data-session')
// Initialize menu items array
let menuItems = [];

// Add event listener to "Add Menu Item" button
addMenuItemButton.addEventListener('click', () => {
    // Only add menu item if there are fewer than 10
    if (menuItems.length < 10) {
        // Create new menu item element
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item', 'block');

        // Create inputs for name, description, and price
        const itemId = menuItems.length + 1;
        menuItemElement.innerHTML =
            `<div class="field is-grouped control">
        <label class="label control" for="item-${itemId}-name">Name</label>
        <div class="control">
            <input class="input" type="text" id="item-${itemId}-name" name="item-${itemId}-name"
                placeholder="Thelma's Famous Waffles">
        </div>
        <label class="label control">Price</label>
        <div class="control">
            <input class="input" type="number" step="0.01" id="item-${itemId}-price" name="item-${itemId}-price"
                placeholder="10.95">
        </div>
        <div class="control">
            <button type="button" class="button" id="remove-item-button">Remove</button>
        </div>
        </div>
        <div class="field">
            <label class="label control" for="item-${itemId}-description">Description</label>
            <div class="control">
                <textarea class="textarea" id="item-${itemId}-description" name="item-${itemId}-description"
                    placeholder="Tasty buttermilke waffles!"></textarea>
        </div>
        </div>`;
        // Add event listener to "Remove" button for menu item
        const removeButton = menuItemElement.querySelector('#remove-item-button');
        removeButton.addEventListener('click', () => {
            // Remove menu item from container and menuItems array
            menuItemsContainer.removeChild(menuItemElement);
            menuItems.splice(menuItems.indexOf(menuItems.find(item => item.element === menuItemElement)), 1);
        });

        // Add menu item element to container
        menuItemsContainer.appendChild(menuItemElement);

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
    try {
        console.log(JSON.stringify(menuItems));
        const response = await fetch('/api/menu', {
            method: 'POST',
            body: JSON.stringify(menuItems),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        });

        if (response.ok) {
            console.log(JSON.stringify(menuItems));
            // If successful, redirect the browser to the user profile page
            // document.location.replace('/');
        } else {
            console.error();
        }
    } catch (error) {
        console.log(error)
    }


};

document
    .querySelector('#menu-form')
    .addEventListener('submit', menuFormHandler);