// Models
const { Comment } = require('../models');
// Seed Data
const commentData = [
  {
    "comment_text": "My first comment.",
    "post_id": "1",
    "user_id": "1"
  },
  {
    "comment_text": "My second comment.",
    "post_id": "2",
    "user_id": "1"
  },
]
// Plant data into DB
const seedComments = () => Comment.bulkCreate(commentData);
// Export
module.exports = seedComments;