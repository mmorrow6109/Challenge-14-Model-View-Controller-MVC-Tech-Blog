const { Comment } = require('../models');

const commentController = {
    addComment: async (req, res) => {
        try {
            const { content } = req.body;
            const postId = req.params.id;
            const userId = req.session.user.id; // Assuming user is stored in session
            const newComment = await Comment.create({ content, postId, userId });
            res.redirect(`/posts/${postId}`);
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).send('Error adding comment');
        }
    }
};

module.exports = commentController;
