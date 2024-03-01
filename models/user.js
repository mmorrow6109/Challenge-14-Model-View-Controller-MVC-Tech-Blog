const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt'); // bcyrpt is a password hashing library

class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
} 

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true, // there cannot be any duplicate email values in this table
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [4] // passwords must be at least four characters long
            }
        }
    },
    {
        // a HOOK is a place in code that allows you to tap into a component, module, or system to alter or augment its behavior without modifying the original source code. Hooks provide a way to inject custom code at specific operations or lifecycle events.

        hooks: {
            // set up beforeCreate lifecycle "hook" functionality. This hook is a function that runs before a new record is saved to the database.

            //runs before a new user is CREATED
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //runs before an existing user is UPDATED
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;
