// Import the seed data for posts, users, and comments
const seedPosts = require('./postSeeds');
const seedUsers = require('./userSeeds');
const seedComments = require('./commentSeeds');

// Import the Sequelize connection
const sequelize = require('../config/connection');

// Define an asynchronous helper function that seeds data and logs a message
const seedAndLog = async (seedFunction, message) => {
  // Call the provided seed function
  await seedFunction();
  // Log the provided message to the console
  console.log(`\n----- ${message} -----\n`);
};

// Define an asynchronous function that seeds all data
const seedAll = async () => {
  // Sync the Sequelize models with the database
  await sequelize.sync({ force: true });
  // Log a message to the console
  console.log('\n----- SUCCESSFULLY SYNCED -----\n');

  // Seed the users and log a message
  await seedAndLog(seedUsers, 'USERS SEEDED');
  // Seed the posts and log a message
  await seedAndLog(seedPosts, 'POSTS SEEDED');
  // Seed the comments and log a message
  await seedAndLog(seedComments, 'COMMENTS SEEDED');

  // Exit the process
  process.exit(0);
};

// Call the function to seed all data
seedAll();