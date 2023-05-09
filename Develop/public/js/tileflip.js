const directionButtons = document.querySelectorAll('.directions-button');

function attachFlipEventListeners() {
  document.querySelectorAll('.flip-tile').forEach(flipTile => {
    flipTile.addEventListener('click', () => {
      const flipTileInner = flipTile.querySelector('.flip-tile-inner');
      flipTileInner.style.transform = flipTileInner.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
    });
  });
}

async function fetchFoodTruckData(truckId) {
  const response = await fetch(`/search/truck/${truckId}`);

  if (!response.ok) {
    throw new Error(`Error fetching food truck data: ${response.statusText}`);
  }

  const data = await response.json();
  return data.truck;
}

async function directionsButtonEventListener(button) {
  const truckId = button.dataset.truckId;
  const foodTruck = await fetchFoodTruckData(truckId);

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foodTruck.address)}`, '_blank');
  });
}

const getDirectionHandler = async (event) => {
  // event.stopPropagation();
  if (event.target.hasAttribute('truck-address')) {
    console.log("test value")
    const truckAddress = event.target.getAttribute('truck-address');
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(truckAddress)}`, '_blank');
  }
}


// Attach event listeners
attachFlipEventListeners();

directionButtons.forEach((button) => {
  directionsButtonEventListener(button);
});


document
  .querySelector('.container')
  .addEventListener('click', getDirectionHandler);