// Import the User model from the models directory
const { User } = require('../models');

// Define an array of user data
const userData = [
  {
    // The first user has the username "john_doe", twitter handle "johnd", github handle "johnd", email "john_doe@gmail.com", and password "p@ssword7"
    username: "john_doe",
    email: "john_doe@gmail.com",
    password: "p@ssword7"
  },
  {
    // The second user has the username "jane_doe", twitter handle "janed", github handle "janed", email "jane_doe@gmail.com", and password "p@ssword8"
    username: "jane_doe",
    email: "jane_doe@gmail.com",
    password: "p@ssword8"
  },
  // More users can be added as needed
];

// Define an asynchronous function that seeds the User table with the user data
const seedUsers = () => User.bulkCreate(userData);

// Export the seedUsers function
module.exports = seedUsers;