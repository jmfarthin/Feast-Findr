-- Drop existing database if it exists
DROP DATABASE IF EXISTS feast_findr_db;

-- Create the FeastFindr database
CREATE DATABASE feast_findr_db;

-- Set the new database as the active one
USE feast_findr_db;

-- Create Users table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'owner') NOT NULL DEFAULT 'user',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
);

-- Create FoodTrucks table
CREATE TABLE food_trucks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    cuisine VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    contact_info VARCHAR(255),
    social_media_links JSON,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    address VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,

    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Create Menus table
CREATE TABLE menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_truck_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (food_truck_id) REFERENCES food_trucks(id)
);

-- Create MenuItems table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

-- Create Upvotes table
CREATE TABLE upvotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_truck_id INT NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_truck_id) REFERENCES food_trucks(id)
);

-- Create Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_truck_id INT NOT NULL,
    text TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_truck_id) REFERENCES food_trucks(id)
);