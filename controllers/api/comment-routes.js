const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// URL: /api/comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_info: req.body.comment_info,

    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
