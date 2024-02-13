const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Associations
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
