const { User } = require('../models');

const userController = {
    signUp: async (req, res) => {
        try {
            const { username, password } = req.body;
            const newUser = await User.create({ username, password });
            req.session.user = newUser; // Store user in session
            res.redirect('/dashboard');
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).send('Error signing up');
        }
    },
    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username, password } });
            if (user) {
                req.session.user = user; // Store user in session
                res.redirect('/dashboard');
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            res.status(500).send('Error signing in');
        }
    },
    signOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
};

module.exports = userController;
