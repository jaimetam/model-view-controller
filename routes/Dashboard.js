const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => { //withAuth
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new-post', withAuth, (req, res) => { //withAuth
    res.render('new-post', {
        loggedIn: true,
    });
});

router.get('/update/:id', withAuth, async (req, res) => { //withAuth
    try {
        const postData = await Post.findByPk(req.params.id);

        if(postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        } else {
            res.status(404).json({ message: 'There`s no post with that ID.' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update/:id', withAuth, async (req, res) => { //withAuth
    try {
        const result = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    userId: req.session.userId,
                },
            }
        );

        if (result > 0) {
            res.json({ message: 'The post has been updated!' });
        } else {
            res.status(404).json({ message: 'There`s no post with that ID.' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', withAuth, async (req, res) => { //withAuth
    try {
        const result = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if(result > 0) {
            res.json({ message: 'The post has been deleted!' });
        } else {
            res.status(404).json({ message: 'There`s no post with that ID.' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/new-post', withAuth, async (req, res) => {
    try {
        const newPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId
        });
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Failed to create the new post!', err);
        res.status(500).json({ message: 'Fail to create new post! '});
    }
})

module.exports = router;