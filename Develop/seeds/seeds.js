const sequelize = require('../config/connection');

const { Comment, FoodTruck, User, Menu, MenuItem, Upvote } = require('../models');

const commentData = require('./comments.json');
const userData = require('./user.json');
const foodTruckData = require('./food-truck.json');
// const menuItems = require('./menu-item.json');


const seedDB = async () => {
    try {
        console.log("about to sync...")

        await sequelize.sync({ force: true });
        console.log('got connection')
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        });

        const ownerUsers = users.filter(user => user.role !== 'role');

        for (const foodTruck of foodTruckData) {
            await FoodTruck.create({
                ...foodTruck,
                owner_id: ownerUsers[Math.floor(Math.random() * ownerUsers.length)].id,
            });
        };

        const foodTrucks = await FoodTruck.findAll();

        for (const comment of commentData) {
            await Comment.create({
                ...comment,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                food_truck_id: foodTrucks[Math.floor(Math.random() * foodTrucks.length)].id,
            });
        };

        const truckIds = foodTrucks.map(truck => truck.id)

        await Menu.bulkCreate(truckIds.map((truck_id) => {
            return {
                food_truck_id: truck_id
            }
        }));



        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

seedDB()