const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        console.log(`Login attempt for user: ${req.body.username}`);
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if(!userData) {
            res.status(400).json({ message: 'Incorrect email or password!' });
            return;
        }

        const validPassword = await userData.validPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            console.log(`${req.body.username} logged in successfully`);
            res.json({ user: userData, message: 'Success! You are logged in!' });
        });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        console.log(`Signup attempt for user: ${req.body.username}`);
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            console.log(`${req.body.username} signed up and logged in successfully`);
            res.json({ user: newUser, message: 'Success! You are signed in!' });
        });
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log('----- Trying to logout! -----')
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.json({ message: 'Logout completed'});
            console.log('----- Session DESTROYED -----')
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;