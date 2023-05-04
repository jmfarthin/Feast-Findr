const sequelize = require('../config/connection');

const { Comment, FoodTruck, User, Menu, MenuItem, Upvote } = require('../models');

const commentData = require('./comments.json');
const userData = require('./user.json');
const foodTruckData = require('./food-truck.json');
const menuItems = require('./menu-item.json')



const seedDB = async () => {
    try {
        console.log("about to sync...")

        await sequelize.sync({ force: true });
        console.log('got connection')

        // seed users
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        });

        // seed food trucks
        const ownerUsers = users.filter(user => user.role !== 'role');

        for (const foodTruck of foodTruckData) {
            await FoodTruck.create({
                ...foodTruck,
                owner_id: ownerUsers[Math.floor(Math.random() * ownerUsers.length)].id,
            });
        };

        // seed comments
        const foodTrucks = await FoodTruck.findAll();

        for (const comment of commentData) {
            await Comment.create({
                ...comment,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                food_truck_id: foodTrucks[Math.floor(Math.random() * foodTrucks.length)].id,
            });
        };


        // seed menu items
        const itemsPerGroup = 7;
        const foodTruckIds = foodTrucks.map(truck => truck.id)
        // Loop through the menu items and add the menu IDs
        let i = 0;

        for (const item of menuItems) {
            // Calculate the group number and index within the group
            const groupNum = Math.floor(i / itemsPerGroup);
            const groupIndex = i % itemsPerGroup;

            // Get the current menu ID
            const truckId = foodTruckIds[groupNum % foodTruckIds.length];

            // Add the menu ID to the current menu item
            await MenuItem.create({
                ...item,
                food_truck_id: truckId
            });
            i++;
        };



        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

seedDB()