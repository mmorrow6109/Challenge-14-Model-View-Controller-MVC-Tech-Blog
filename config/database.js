const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'database',
    username: 'root',
    password: 'password',
    host: 'localhost'
});

module.exports = sequelize;
