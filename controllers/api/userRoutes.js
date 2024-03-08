const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single user by their id (primary key) and include associated posts and comments
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new user (need to be /signup?)
router.post('/', async (req, res) => {
    try {
        const findUser = await User.findOne({ where: { username: req.body.username } });
        if (findUser) {
            res.status(400).json({ message: 'Username already exists!' });
            return;
        }

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json(user);
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Log in an existing user (//does this need to be /login?)
router.post('/login', async (req, res) => { 
    // User.findOne({
    //     where: {
    //         username: req.body.username
    //     }
    // })
        const userData= await User.findOne({ where: { username: req.body.username } });
             if (!userData) {
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }

            const validPassword = await userData.checkPassword(req.body.password);
                if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

                 req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });
        // .then(dbUserData => {
        //     if (!dbUserData) {
        //         res.status(400).json({ message: 'No user with that username!' });
        //         return;
        //     }
        //     // check if the user's password matches the hashed password stored in the database
        //     const validPassword = dbUserData.checkPassword(req.body.password);

        //     if (!validPassword) {
        //         res.status(400).json({ message: 'Incorrect password!' });
        //         return;
        //     }
        //     //save user's data in the session and set the 'loggedIn' property to 'true'
        //     req.session.save(() => {
        //         req.session.user_id = dbUserData.id;
        //         req.session.username = dbUserData.username;
        //         req.session.loggedIn = true;

        //         res.json({ user: dbUserData, message: 'You are now logged in!' });
        //     });
        // });
});

// Log out an existing user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        //remove the session variables
        req.session.destroy(() => {
            res.status(204).end(); //204 status code means that a request has succeeded, but client does not need to go to a different page
        });
    } else {
        res.status(404).end();
    }
});

// Update a user by their id (primary key)
router.put('/:id', withAuth, (req, res) => {
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a user by their id (primary key)
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;