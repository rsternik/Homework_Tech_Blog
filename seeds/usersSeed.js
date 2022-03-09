// Required models
const { User } = require('../models');
// User seed data
const usersData = [
    {
      "username": "Bobby",
      "email": "bob@bob.com",
      "password": "password1234"
    }
  ]
// Plant seed
const plantUsers = () => User.bulkCreate(usersData, {
  individualHooks: true,
  returning: true,
});
// Export
module.exports = plantUsers;