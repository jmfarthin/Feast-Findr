const router = require('express').Router();
const { Comment, FoodTruck } = require('../../models');
const withAuth = require('../../utils/auth');


// Creating a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({

            ...req.body,
            user_id: req.session.user_id,
            // food_truck_id:
            // not sure how to handle the food_truck_id. Might need to use an Include
        });

        
    } catch (err) {
        res.status(400).json(err);
    }
});

// deleting a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!projectData) {
            res.status(404).json({ message: 'No comment found with this id!' })
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;