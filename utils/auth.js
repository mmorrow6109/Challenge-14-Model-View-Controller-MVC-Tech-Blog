// Define a middleware function 'withAuth' to check if a user is logged in
const withAuth = (req, res, next) => {
    // If the user is not logged in (i.e., 'req.session.logged_in' is false)
    if (!req.session.logged_in) {
      // Redirect the user to the '/login' page
      res.redirect('/login');
    } else {
      // If the user is logged in, proceed to the next middleware function or route handler
      next();
    }
};

// Export the 'withAuth' middleware function to be used in other parts of the application
module.exports = withAuth;