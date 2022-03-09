// Models
const { Post } = require('../models');
// Seed Data
const postData = [
    {
      "title": "Test 1",
      "body": "This is my first post.",
      "user_id": "1"
    },
    {
      "title": "Test 2",
      "body": "This is my second post.",
      "user_id": "1"
    }
  
  ]
// Plant seed data
const seedPosts = () => Post.bulkCreate(postData);
// Export
module.exports = seedPosts;

