const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Associations (Model.association(OtherModel, { options }))
User.hasMany(Post, { // a user can have many posts
    foreignKey: 'user_id'
}); 

User.hasMany(Comment, { // a user can have many comments
    foreignKey: 'user_id'
});

Post.belongsTo(User, { // a post belongs to a user
    foreignKey: 'user_id'
}); 

Post.hasMany(Comment, { // a post can have many comments
    foreignKey: 'post_id'
});

Comment.belongsTo(User, { // a comment belongs to a user
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, { // a comment belongs to a post
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };
