const signupButtonHandler = async (event) => {
    document.location.replace(`/login`);
};



document
    .querySelector(".search-form2")
    .addEventListener('submit', signupButtonHandler);


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const newSearchButton = document.getElementById('new-search');
    const addressForm = document.getElementById('address-form');
    const resultDiv = document.getElementById('result');
    const foodTrucksDiv = document.getElementById('food-trucks');
  
    form.addEventListener('submit', async (event))




  event.preventDefault();

  const address = form.address.value.trim();
  const city = form.city.value.trim();
  const state = form.state.value.trim();
  const zipCode = form.zipCode.value.trim();

  const fullAddress = `${address}, ${city}, ${state}` + (zipCode ? `, ${zipCode}` : '');
  const userCoordinates = await getUserCoordinates(fullAddress);

  if (userCoordinates) {
    const foodTrucks = await findNearbyFoodTrucks(userCoordinates);
    displayFoodTrucks(foodTrucks);
    addressForm.hidden = true;
    resultDiv.hidden = false;
  } else {
    alert('Unable to find coordinates for the provided address. Please try again.');
  }
});

newSearchButton.addEventListener('click', () => {
  addressForm.hidden = false;
  resultDiv.hidden = true;
});

const getUserCoordinates = async (address) => {
  try {
    const response = await fetch(`/coordinates?address=${encodeURIComponent(address)}`);
    const coordinates = await response.json();

    if (coordinates.error) {
      console.error('Error fetching coordinates:', coordinates.error);
      return null;
    }

    return coordinates;
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return null;
  }
};

const findNearbyFoodTrucks = async (userCoordinates) => {
  try {
    const response = await fetch(`/food-trucks?latitude=${userCoordinates.latitude}&longitude=${userCoordinates.longitude}`);
    const foodTrucks = await response.json();

    if (foodTrucks.error) {
      console.error('Error fetching food trucks:', foodTrucks.error);
      return [];
    }

    return foodTrucks;
  } catch (error) {
    console.error('Error fetching food trucks:', error.message);
    return [];
  }
};

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
