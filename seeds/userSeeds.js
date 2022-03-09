// Model
const { User } = require('../models');
// Seed Data
const userData = [
  {
    "username": "Bob",
    "email": "bob@email.com",
    "password": "password1234"
  }
]
// Plant data into DB 
const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});
// Export
module.exports = seedUsers;