const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;
    try {
      const newPost = await Post.create({
        // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
        ...body,
        // TODO: SET USERID TO LOGGEDIN USERID
        user_id: req.session.userId
      });
      res.json(newPost);
      console.log("!!!!!!!!!!!!!!!!!!!!!!")
      console.log("newPost", newPost)
      console.log("!!!!!!!!!!!!!!!!!!!!!!!")
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = await Post.update(req.body, {
        where: {
          id: req.params.id
        },
      });
  
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = Post.destroy({
        // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
        where: {
          id: req.params.id
        },
      });
  
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
