const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const searchRoute = require('./api/searchRoute');
const { getUserCoordinates } = require('./controllers/UserController');

// route to get all food trucks when the application is booted up
router.get('/', async (req, res) => {
    // try {

    // } catch (err) {
    //     res.status(500).json(err);
    // }

    res.render("homepage", {
    })
});

// route to get one specific food truck
router.get('/truck/:id', async (req, res) => {
    // try {

    // } catch (err) {
    //     res.status(500).json(err);
    // }

    res.render("homepage", {
    })
});

// A route to take signed in users to their profile page
router.get('/profile', withAuth, async (req, res) => {
    // try {

    // } catch (err) {
    //     res.status(500).json(err);
    // }

    res.render("profile", {
    })
});

// A route that will either direct the user to the login page, or to their profile page if they are already signed in
router.get('/login', (req, res) => {

    res.render("login", {
    })
});

// A route that will allow the user to find the closest nearby food trucks with Opencage, passing it through geolib
router.post('/search', searchRoute.findNearbyFoodTrucks);


// A route to get the user's coordinates 
router.get('/user-coordinates', getUserCoordinates);





module.exports = router;