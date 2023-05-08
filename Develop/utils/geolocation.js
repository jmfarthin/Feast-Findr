// This will import the fetch method

const fetch = require('node-fetch');
const geolib = require('geolib');

//this formula takes the address and passes it into the api parameters to geocode the string address and return the resulting coordinates
const convertAddressToCoordinates = async (address) => {
  const apiKey = 'e67eaf040010438d8c6b339939fdd6ea';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error('No coordinates found for the provided address');
    }

    const { lat, lng } = data.results[0].geometry;

    // console.log(lat, lng)
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error('Error converting address to coordinates:', error.message);
    return null;
  }
};



const location1 = '490 Roaring fork lake rd';
const location2 = '2240 Burton Lake Rd'


const checkDistance = (user, truck) => {
  const distance = geolib.getDistance(user, truck);
  const mileDistance = distance * 0.000621;
  console.log(mileDistance);
  return mileDistance;
}

module.exports = {
  convertAddressToCoordinates, checkDistance
};