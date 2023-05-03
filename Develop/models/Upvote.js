const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Upvote extends Model {}

Upvote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        food_truck_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'food_truck',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'upvote',
    }
);

module.exports = Upvote;