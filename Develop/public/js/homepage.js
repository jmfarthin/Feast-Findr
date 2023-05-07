const signupButtonHandler = async (event) => {
    document.location.replace(`/login`);
};

const getUserCoordinates = require('../api/userController');
const findNearbyFoodTrucks = require ('../api/searchRoute')


document
    .querySelector(".search-form2")
    .addEventListener('submit', signupButtonHandler);


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const newSearchButton = document.getElementById('new-search');
    const addressForm = document.getElementById('address-form');
    const resultDiv = document.getElementById('result');
    const foodTrucksDiv = document.getElementById('food-truck-list');
  
     form.addEventListener('submit', async (event))

   event.preventDefault();

  const street = form.street.value.trim();
  const city = form.city.value.trim();
  const state = form.state.value.trim();
  const zipCode = form.zipCode.value.trim();

  const fullAddress = `${street}, ${city}, ${state}` + (zipCode ? `, ${zipCode}` : '');
  const userCoordinates = await getUserCoordinates(fullAddress);

  if (userCoordinates) {
    const foodTrucks = await findNearbyFoodTrucks(userCoordinates);
    displayFoodTrucks(foodTrucks);
    form.hidden = true;
    resultDiv.hidden = false;
  } else {
    alert('Unable to find coordinates for the provided address. Please try again.');
  }
});

newSearchButton.addEventListener('click', () => {
  addressForm.hidden = false;
  resultDiv.hidden = true;
});



const displayFoodTrucks = (foodTrucks) => {
  foodTrucksDiv.innerHTML = '';

  foodTrucks.forEach((foodTruck) => {
    const card = document.createElement('div');
    card.className = 'food-truck-card';
    card.innerHTML = `
      <img src="${foodTruck.icon}" alt="${foodTruck.name} icon">
      <h3>${foodTruck.name}</h3>
      <p>${foodTruck.distance.toFixed(2)} miles away</p>
    `;
    card.addEventListener('click', () => {
      window.location.href = `/food-truck/${foodTruck.id}`;
    });

    foodTrucksDiv.appendChild(card);
  });
};
