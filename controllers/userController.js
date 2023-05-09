

const { convertAddressToCoordinates } = require('../utils/geolocation');

const getUserCoordinates = async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  const coordinates = await convertAddressToCoordinates(address);

  if (!coordinates) {
    return res.status(400).json({ error: 'Unable to find coordinates for the provided address' });
  }

  res.status(200).json(coordinates);
};

module.exports = {
  getUserCoordinates,
};

