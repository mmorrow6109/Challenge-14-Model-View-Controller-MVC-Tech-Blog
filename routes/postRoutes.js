const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePostById);

module.exports = router;
