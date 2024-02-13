const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.use('/', routes);

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
