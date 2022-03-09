//  Seeds
const plantPosts = require('./postsSeed');
const plantUsers = require('./usersSeed');
const plantComments = require('./commentsSeed');
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