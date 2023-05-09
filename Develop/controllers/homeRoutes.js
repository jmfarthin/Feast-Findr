const router = require('express').Router();
const { FoodTruck, User, MenuItem } = require('../models');
const withAuth = require('../utils/auth');


// route to get all food trucks when the application is booted up
router.get('/', async (req, res) => {
    // try {

    // } catch (err) {
    //     res.status(500).json(err);
    // }

    res.render("homepage", {
        logged_in: req.session.logged_in,
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
router.get('/profile', async (req, res) => {
    
    const userFoodTruck = await FoodTruck.findOne({
        where: {
            owner_id: req.session.user_id
        },
        include: [{ model: MenuItem}],
    });

    const foodTruck = userFoodTruck.get({ plain: true });


    // if (userFoodTruck) {

    //     res.json(userFoodTruck);

    // } else {
    //     res.status(404).json({ message: 'Food truck not found for the current user' });
    // }

    res.render("profile", {
        ...foodTruck,
        logged_in: true
    })
});

// A route that will either direct the user to the login page, or to their profile page if they are already signed in
router.get('/login', (req, res) => {

    res.render("login", {
    })
});

// A route that will allow the user to find the closest nearby food trucks with Opencage, passing it through geolib
// router.post('/search', searchRoute.findNearbyFoodTrucks);
// router.get('/truck', (req, res) => {
//     res.render('truck');

router.get('/truck', withAuth, async (req, res) => {

    try {
        const currentUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const user = currentUser.get({ plain: true });

        res.render('truck', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/menu', async (req, res) => {

    try {
        const currentFoodTruck = await FoodTruck.findOne({
            where: {
                owner_id: req.session.user_id
            }
        });

        console.log(currentFoodTruck.id);

        // if (!currentFoodTruck) {
        //     res
        //         .status(400)
        //         .json({message: 'Cannot find food truck'})
        // }

        const truck = currentFoodTruck.get({ plain: true });

        res.render('menu', {
            ...truck,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;






// A route to get the user's coordinates 
// router.get('/user-coordinates', getUserCoordinates);
