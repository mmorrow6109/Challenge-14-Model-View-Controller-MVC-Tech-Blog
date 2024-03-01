//import 'express' package to create a router
const router = require('express').Router();

//import the apiRoutes, homeRoutes, and dashboardRoutes
const apiRoutes = require('./api');
const homeRoutes = require('.homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

//use the imported routes (middleware)
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

//catch-all route that will return an error message if the client makes a request to an endpoint that doesn't exist
router.use((req, res) => {
  res.status(404).end();
});

//export the router to be used in other parts of the application
module.exports = router;