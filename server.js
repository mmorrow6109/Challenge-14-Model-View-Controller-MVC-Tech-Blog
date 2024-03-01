const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secret teehee',
    cookie: {
        maxAge: 86400000, //milliseconds in a day
        httpOnly: true, //the cookie cannot be accessed through client-side scripts

        secure: false, //the cookie can be sent over both HTTP and HTTPS. In production, this should be set to true so that the cookie is only sent over HTTPS

        sameSite: 'strict', //the browser will only send the cookie if the request originated from the same site that set the cookie
    },
    resave: false, //prevents the session from being saved to the session store on every request, which would get very inefficient

    saveUninitialized: true, //forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified

    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(require('express-session')(sess)); //add the session object to our app
app.use(express.json()); //parse incoming JSON data
app.use(express.urlencoded({ extended: true })); //parse incoming form data
app.use(express.static(path.join(__dirname, 'public'))); //serve the files in the public directory

app.engine('handlebars', create({ helpers }).engine); //create a new Handlebars.js engine instance with custom helper functions
app.set('view engine', 'handlebars'); //inform the Express.js server that it should use the Handlebars.js template engine

app.use(routes); //use the routes we set up in the controllers directory

sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on http://localhost:3001/'));
}); //sync the connection to the database, then turn on the server