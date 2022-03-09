// Required Models
const { Post } = require('../models');
// Posts Seed Data
const postData = [
    {
      "title": "Day 1",
      "body": "My post comment.",
      "user_id": "1"
    }
  ]
// Plant Seed
const plantPosts = () => Post.bulkCreate(postData);
// Export
module.exports = plantPosts;
