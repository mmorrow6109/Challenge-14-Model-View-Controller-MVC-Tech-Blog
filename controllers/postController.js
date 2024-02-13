const { Post } = require('../models');

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.render('home', { posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).send('Error fetching posts');
        }
    },
    getPostById: async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await Post.findByPk(postId);
            res.render('post', { post });
        } catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).send('Error fetching post');
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;
            const newPost = await Post.create({ title, content });
            res.redirect('/dashboard');
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).send('Error creating post');
        }
    },
    deletePostById: async (req, res) => {
        try {
            const postId = req.params.id;
            await Post.destroy({ where: { id: postId } });
            res.redirect('/dashboard');
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).send('Error deleting post');
        }
    }
};

module.exports = postController;
