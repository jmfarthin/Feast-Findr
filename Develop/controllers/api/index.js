const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const foodTruckRoutes = require('./foodTruckRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/foodTrucks', foodTruckRoutes);

module.exports = router;