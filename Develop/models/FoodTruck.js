const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FoodTruck extends Model {}

FoodTruck.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        owner_id: { // we could make a small change to the name of this class from "owner_id" to "user_id" to be a bit more simple
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cuisine: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        contact_info: {
            type: DataTypes.STRING,
        },
        social_media_links: {
            type: DataTypes.JSON,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'food_truck',
    }
);

module.exports = FoodTruck;

// Tacosaurus Rex (Mexican food)
// Wok This Way (Asian cuisine)
// Mac Attack (Mac and Cheese)
// The Fryin' Dutchman (Dutch food)
// A Salt & Battery (Fish and chips)
// The Rolling Cones (Ice cream)
// The Grilled Cheese Incident (Grilled cheese sandwiches)
// Frying Nemo (Seafood)
// Holy Crepe! (French crepes)
// Wrap Battle (Wraps)
// Rolling Stromboli (Italian cuisine)
// Meat the Press (Paninis)
// Falafel to the Chief (Middle Eastern food)
// The Rolling Doughnut (Donuts)
// The Gumbo Mobile (Cajun food)
// The Mighty Corn Dog (Corn dogs)
// Bao to the Bone (Bao buns)
// The Wiener Wagon (Hot dogs)
// Eggcellent Eats (Breakfast food)
// Rolling in the Dough (Pizza)