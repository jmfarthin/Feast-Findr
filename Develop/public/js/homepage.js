const signupButtonHandler = async (event) => {
    document.location.replace(`/login`);
};


const searchButton = document.getElementById('search-button');

const searchFoodTruckHandler = async (event) => {
    event.preventDefault()
    try {
      const address = document.getElementById('address').value
      const url = `/results/${address}`
        // const response = await fetch(`/results/?address=${address}`);

      //   if (response.ok) {
          window.location.href =url; // Redirect to the results page
      // } else {
      //     alert('Search failed, try again!');
      // }
      console.log(response);
    } catch (error) {
        console.log(error);
    }
}

searchButton.addEventListener('click', searchFoodTruckHandler);






































// const getUserCoordinates = require('../api/userController');
// const findNearbyFoodTrucks = require ('../api/searchRoute')


// document
//     .querySelector(".search-form2")
//     .addEventListener('submit', signupButtonHandler);


// document.addEventListener('DOMContentLoaded', () => {
//     const addressForm = document.getElementById('address-form');
//     const userAddress = document.getElementById('user-address');
//     const newSearchButton = document.getElementById('new-search');
//     const resultDiv = document.getElementById('result');
//     const foodTrucksDiv = document.getElementById('food-truck-list');
  
//      addressForm.addEventListener('submit', async (event))

//    event.preventDefault();

//   const userCoordinates = await getUserCoordinates(userAddress);

//   if (userCoordinates) {
//     const foodTrucks = await findNearbyFoodTrucks(userCoordinates);
//     displayFoodTrucks(foodTrucks);
//     form.hidden = true;
//     resultDiv.hidden = false;
//   } else {
//     alert('Unable to find coordinates for the provided address. Please try again.');
//   }
// });

// newSearchButton.addEventListener('click', () => {
//   addressForm.hidden = false;
//   resultDiv.hidden = true;
// });



// const displayFoodTrucks = (foodTrucks) => {
//   foodTrucksDiv.innerHTML = '';

//   foodTrucks.forEach((foodTruck) => {
//     const card = document.createElement('div');
//     card.className = 'food-truck-card';
//     card.innerHTML = `
//       <img src="${foodTruck.icon}" alt="${foodTruck.name} icon">
//       <h3>${foodTruck.name}</h3>
//       <p>${foodTruck.distance.toFixed(2)} miles away</p>
//     `;
//     card.addEventListener('click', () => {
//       window.location.href = `/food-truck/${foodTruck.id}`;
//     });

//     foodTrucksDiv.appendChild(card);
//   });
// };
