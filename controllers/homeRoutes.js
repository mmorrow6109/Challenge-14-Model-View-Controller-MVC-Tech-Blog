//import necessary modules
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//route for getting all posts and rendering them to the homepage
router.get('/', (req, res) => {
  console.log(req.session);
  
  //get all posts and include the post creator's username
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    //include related data from the Comment and User models
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      //serialize, or convert the data to plain JS objects for rendering the homepage tempate
      const posts = dbPostData.map(post => post.get({ plain: true }));
      //pass the posts into the homepage template
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route for rendering the single post page
router.get('/post/:id', (req, res) => {
  //get a single post by its primary key and include the post creator's username
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    //include related data from the Comment and User models
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      //if no post by that id exists, return an error message
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      //serialize the data
      const post = dbPostData.get({ plain: true });
      //pass the post into the single post template
      res.render('single-post', { // single-post.handlebars
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route for rendering the login page
router.get('/login', (req, res) => {
  //if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //otherwise, render the login page
  res.render('login');
});

//route for rendering the signup page

router.get('/signup', (req, res) => {
  //if the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //otherwise, render the signup page
  res.render('signup');
});

//export the router
module.exports = router;