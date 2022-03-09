//  Seeds
const seedPosts = require('./postsSeed');
const seedUsers = require('./usersSeed');
const seedComments = require('./commentsSeed');
//  Sequelize
const sequelize = require('../config/connection');
// Plant seeds into DB
const plantAll = async () => {
  // Sequelize
  await sequelize.sync({ force: true })
  // Seeds
  await plantUsers();
  await plantPosts();
  await plantComments();
  process.exit(0);
};
// Plant all seeds
plantAll();