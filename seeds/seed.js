// Seeds
const seedPosts = require('./postSeeds');
const seedUsers = require('./userSeeds');
const seedComments = require('./commentSeeds');
// Sequelize
const sequelize = require('../config/connection');
// Plant all seeds into DB
const seedAll = async () => {
  await sequelize.sync({ force: true })
  // Planters
  await seedUsers();  
  await seedPosts();
  await seedComments();
  process.exit(0);
};
// Init
seedAll();