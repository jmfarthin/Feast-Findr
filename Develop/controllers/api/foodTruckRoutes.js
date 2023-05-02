const router = require('express').Router();
const { FoodTruck } = require('../../models');
const withAuth = require('../../utils/auth');

// creating a food truck
router.post('/', withAuth, async (req, res) => {
    try {
        const newFoodTruck = await FoodTruck.create({
            ...req.body,
            owner_id: req.session.user_id,
        });

        res.status(200).json(newFoodTruck);
    } catch (err) {
        res.status(400).json(err);
    }
});

// updating food truck - likely updating the food truck's location
router.put('/', withAuth, async (req, res) => {

});

// deleting a food truck - OPTIONAL
router.delete('/:id', withAuth, async (req, res) => {

});