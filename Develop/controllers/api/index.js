const router = require('express').Router();
const userRoutes = require('./userRoutes');
const menuRoutes = require('./menuItemRoutes')

const foodTruckRoutes = require('./foodTruckRoutes');

router.use('/users', userRoutes);
router.use('/foodTruck', foodTruckRoutes);
router.use('/menu', menuRoutes);

module.exports = router;