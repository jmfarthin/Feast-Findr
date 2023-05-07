const router = require('express').Router();
const { FoodTruck } = require('../../models');
const withAuth = require('../../utils/auth');
const {covertAddressToCoordinates } = require ('../../utils/geolocation');

// A route for creating a food truck
router.post('/', async (req, res) => {
    try {
        console.log({ ...req.body });
        const newFoodTruck = await FoodTruck.create({ ...req.body });

        res.status(200).json(newFoodTruck);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foodTruck = await FoodTruck.findByPk(req.params.id);
        res.status(200).json(foodTruck);
    } catch (error) {
        res.status(400).json(err);
    }
})

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
            latitude:req.body.latitude,
            longitude:req.body.longitude,

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

const getFoodTruckById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const selectedFoodTruck = await FoodTruck.findByPk(id);
  
      if (!selectedFoodTruck) {
        return res.status(404).json({ error: 'Food truck not found' });
      }
  
      res.status(200).json(selectedFoodTruck);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the food truck' });
    }
  };
  

module.exports ={ router,
getFoodTruckById};