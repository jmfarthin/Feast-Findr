const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MenuItem extends Model { }

MenuItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        food_truck_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'food_truck',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'menu-item',
    }
);

module.exports = MenuItem;