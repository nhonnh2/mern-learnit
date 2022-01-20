const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');
const verifyToken = require('../app/middlewares/auth')


//@route POST api/posts/create
//@desc create post
//@access private
router.post('/create', verifyToken, postController.create);

//@route PUT api/posts/:id/update
//@desc update posts
//@access private
router.put('/:id/update', verifyToken, postController.update)

//@route DELETE api/posts/:id/delete
//@desc delete posts
//@access private
router.delete('/:id/delete', verifyToken, postController.delete)

//@route POST api/posts
//@desc get posts
//@access private
router.get('/', verifyToken, postController.getPosts)


module.exports = router;