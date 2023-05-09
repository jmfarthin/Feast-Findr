const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const searchRoute = require('./searchRoute')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/results', searchRoute);

module.exports = router;