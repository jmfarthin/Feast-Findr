const router = require('express').Router();
const { FoodTruck, MenuItem } = require('../models');
const { convertAddressToCoordinates, checkDistance } = require('../utils/geolocation');


// Route to search for closest food trucks

router.get('/:address', async (req, res) => {
  const trucks = [];
  try {
    const address = req.params.address;
    const userCoordinates = await convertAddressToCoordinates(address);

    if (!userCoordinates) {
      res.redirect('/');
    } else {
      const truckData = await FoodTruck.findAll({ include: [MenuItem] });

      // find closest foodtrucks
      for (const truck of truckData) {
        const truckCoordinates = await convertAddressToCoordinates(truck.address);
        if (!truckCoordinates) {
          continue;
        }
        const distance = checkDistance(userCoordinates, truckCoordinates);

        if (distance < 20) {
          trucks.push(truck);
        };
      };

      const plainTrucks = trucks.map(truck => truck.get({ plain: true }));
      console.log(plainTrucks);

      // res.status(200).json({ trucks: plainTrucks });
      res.render('results', { trucks: plainTrucks });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/truck/:truckId', async (req, res) => {
  try {
    const truckId = req.params.truckId;
    const foodTruck = await FoodTruck.findByPk(truckId, { include: [MenuItem] });

    if (!foodTruck) {
      res.status(404).json({ message: 'Food truck not found' });
    } else {
      res.status(200).json({ truck: foodTruck.get({ plain: true }) });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});


module.exports = router;


