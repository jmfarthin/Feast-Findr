const router = require('express').Router();
const { FoodTruck } = require('../../models');
const withAuth = require('../../utils/auth');
const opencage = require('opencage-api-client');

// A route for creating a food truck
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

// A route for updating a food truck - likely updating the food truck's location
router.put('/:id', withAuth, async (req, res) => {
    try {
        const newFoodTruck = await FoodTruck.update({
            name: req.body.name,
            cuisine: req.body.cuisine,
            description: req.body.description,
            image: req.body.image,
            contact_info: req.body.contact_info,
            social_media_links: req.body.social_media_links,
            address:req.body.address,
            lat:req.body.lat,
            lng:req.body.long,

        },
        {
            where: {
                id: req.params.id,
                owner_id: req.session.user_id,
            }
        });

        res.status(200).json(newFoodTruck);
    } catch (err) {
        res.status(400).json(err);
    }
});

// A route for deleting a food truck - OPTIONAL
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const newFoodTruck = await FoodTruck.destroy({
            where: {
                id: req.params.id,
                user_id
            }
        })

        if (!newFoodTruck) {
            res.status(404).json({ message: 'No food truck found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});