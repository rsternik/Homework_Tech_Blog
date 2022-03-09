// Models
const User = require('./user.js');
const Post = require('./post');
const Comment = require('./comment');
// User with many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
});
// Post belongs to user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});
// Comment belongs to user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
// Comment belongs to post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});
// User has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
// Post has many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
// Exports
module.exports = { User, Post, Comment };