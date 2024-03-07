// Import necessary modules and files
const router = require('express').Router(); // Express router
const { Comment } = require('../../models'); // Comment model from the database models
const withAuth = require('../../utils/auth'); // Authentication middleware

// Common error handling function
const handleError = (err, res, statusCode = 500) => {
  console.log(err); // Log the error
  res.status(statusCode).json(err); // Send a response with the error status code and the error
};

// Route to get all comments
router.get('/', (req, res) => {
    // Find all comments in the database
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData)) // Send the comment data as a response
      .catch(err => handleError(err, res)); // Handle any errors
});

// Route to create a new comment
router.post('/', withAuth, (req, res) => {
  // Check if the user is logged in
  if (req.session) {
    // Create a new comment with the provided data
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData)) // Send the comment data as a response
      .catch(err => handleError(err, res, 400)); // Handle any errors with a 400 status code
  }
});

// Route to delete a comment
router.delete('/:id', withAuth, (req, res) => {
    // Delete the comment with the provided id
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          // Check if a comment was deleted
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' }); // Send a 404 status code if no comment was found
            return;
          }
          res.json(dbCommentData); // Send the comment data as a response
        })
        .catch(err => handleError(err, res)); // Handle any errors
});

// Export the router
module.exports = router;