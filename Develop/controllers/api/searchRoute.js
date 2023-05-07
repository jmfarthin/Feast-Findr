// controllers/SearchController.js

const FoodTruck = require('../models/FoodTruck');
const { convertAddressToCoordinates } = require('../../utils/geolocation');
const geolib = require('geolib');

const findNearbyFoodTrucks = async (req, res) => {
  const { address } = req.body;
  const coordinates = await convertAddressToCoordinates(address);

  if (!coordinates) {
    return res.status(400).json({ error: 'Unable to find coordinates for the provided address' });
  }

  try {
    const foodTrucks = await FoodTruck.findAll();
    const nearbyFoodTrucks = foodTrucks.filter((truck) => {
      const distance = geolib.getDistance(
        { latitude: coordinates.latitude, longitude: coordinates.longitude },
        { latitude: truck.latitude, longitude: truck.longitude }
      );

      return distance <= 25 * 1609; // 25 miles to meters
    });

    res.status(200).json(nearbyFoodTrucks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for nearby food trucks' });
  }
};

module.exports = {
  findNearbyFoodTrucks,
};
