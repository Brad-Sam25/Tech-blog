const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'user_id',
        // 'post-text'
      ], 
      include: [
        { 
        model: Comment,
        attributes: [
          'id',
          'title',
          'user_id',
        ],
        include: {
          model: User,
          attributes: ['username']
        }  
      }]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  if (!req.sessions.loggedIn) {
    res.redirect('/login')
  } else {
      try {
      const postData = await Post.findByPk(req.params.id);

      if (postData) {
        const post = postData.get({ plain: true });

        res.render('edit-post', {
          layout: 'dashboard',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }}
});

module.exports = router;
