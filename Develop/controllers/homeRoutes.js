const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

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
    const userFoodTruck = await FoodTruck.findByPk(req.user.id, {
        include: [{ model: User }]
    })

    if (userFoodTruck) {
        res.json(userFoodTruck);

    } else {
        res.status(404).json({ message: 'Food truck not found for the current user' });
    }

    res.render("profile", {
        userFoodTruck
    })
});

// A route that will either direct the user to the login page, or to their profile page if they are already signed in
router.get('/login', (req, res) => {

    res.render("login", {
    })
});

router.get('/truck', (req, res) => {
    res.render('truck');
});

router.get('/menu', (req, res) => {
    res.render('menu');
})

module.exports = router;

