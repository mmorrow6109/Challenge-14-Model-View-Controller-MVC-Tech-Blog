const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Defining a new class called Post that extends (or inherits from) another class called Model

//"extends" keyword is used to create a subclass, or a child class. The child class inherits all the methods and properties from the parent class, but it can also add new methods and properties or override the ones inherited from the parent class.

// In this case, Post is a child class of Model, so it will inherit all the methods and properties of Model. However, since the Post class is currently empty ({}), it doesn't add any new functionality or override any inherited functionality.

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize, //Pass in our imported sequelize connection (the direct connection to our database)
        freezeTableName: true, // Don't pluralize name of database table
        underscored: true, // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        modelName: 'post' // Make it so our model name stays lowercase in the database
    }
);

module.exports = Post;
