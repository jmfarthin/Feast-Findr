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
        owner_id: {
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