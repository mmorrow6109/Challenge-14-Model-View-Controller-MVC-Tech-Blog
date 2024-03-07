const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1] // comments must be at least one character long
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // references the `user` model, which we set in `User.js` as its `modelName` property
                key: 'id' // references the `id` column in the `user` model
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post', // references the `post` model, which we set in `Post.js` as its `modelName` property
                key: 'id' // references the `id` column in the `post` model
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;
