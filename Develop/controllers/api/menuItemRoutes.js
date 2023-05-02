const router = require('express').Router();
const { MenuItem, FoodTruck } = require('../../models');
const withAuth = require('../../utils/auth');

// a route to create a menu item
router.post('/', withAuth, async (req, res) => {
    try {
        const itemData = await MenuItem.create({

            ...req.body,
            user_id: req.session.user_id,
        });

        
    } catch (err) {
        res.status(400).json(err);
    }
});