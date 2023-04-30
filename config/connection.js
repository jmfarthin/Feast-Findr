// Load environment variables from .env file (if present) into process.env
require('dotenv').config();

// Import the Sequelize class
const Sequelize = require('sequelize');

// Create a new Sequelize instance based on the environment
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // If JAWSDB_URL is present, use it in production environment
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost', // Use the DB_HOST environment variable or default to 'localhost'
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Export the sequelize instance
module.exports = sequelize;