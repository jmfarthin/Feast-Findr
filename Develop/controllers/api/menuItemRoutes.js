const router = require('express').Router();
const { MenuItem, FoodTruck } = require('../../models');
const withAuth = require('../../utils/auth');

// a route to create a menu item
router.post('/', async (req, res) => {
    try {
        const itemData = await MenuItem.BulkCreate(req.body);

        res.status(200).json(itemData);
    } catch (err) {
        res.status(400).json(err);
    }
});


// A route to delete a menu item
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const itemData = await MenuItem.destroy({
            where: {
                id: req.params.id,
                // food_truck_id: 
            },
        });

        if (!itemData) {
            res.status(404).json({ message: 'No menu item found with this id!' });
            return;
        }

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);

        res.status(200).json(menuItem);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;