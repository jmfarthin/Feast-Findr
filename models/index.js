const User = require('./User');
const FoodTruck = require('./FoodTruck');
const MenuItem = require('./MenuItem');
const Upvote = require('./Upvote');
const Comment = require('./Comment');

// Model associations
User.hasMany(FoodTruck, {
    foreignKey: 'owner_id',
});

FoodTruck.belongsTo(User, {
    foreignKey: 'owner_id',
});

FoodTruck.hasMany(MenuItem, {
    foreignKey: 'food_truck_id',
});

MenuItem.belongsTo(FoodTruck, {
    foreignKey: 'food_truck_id',
});

User.belongsToMany(FoodTruck, {
    through: Upvote,
    as: 'upvotedFoodTrucks',
    foreignKey: 'user_id',
});

FoodTruck.belongsToMany(User, {
    through: Upvote,
    as: 'upvotedBy',
    foreignKey: 'food_truck_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

FoodTruck.hasMany(Comment, {
    foreignKey: 'food_truck_id',
});

Comment.belongsTo(FoodTruck, {
    foreignKey: 'food_truck_id',
});

module.exports = {
    User,
    FoodTruck,
    MenuItem,
    Upvote,
    Comment,
};