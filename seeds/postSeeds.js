// Import the Post model from the models directory
const { Post } = require('../models');

// Define an array of post data
const postData = [
  {
    // The first post has the title "New Programming Language Released!", content about a new programming language called SuperCode, and is associated with the user with ID 6
    title: "New Programming Language Released!",
    post_content: "A new programming language has been released that promises to revolutionize software development. It's called SuperCode and it's designed to be easy to learn, write, and read, while still being powerful and efficient.",
    user_id: 1,
    post_id: 1
  },
  {
    // The second post has the title "AI Technology Advancements", content about recent advancements in AI technology, and is associated with the user with ID 7
    title: "AI Technology Advancements",
    post_content: "Recent advancements in AI technology are paving the way for more intelligent and autonomous systems. These systems are expected to have a wide range of applications, from self-driving cars to advanced data analysis.",
    user_id: 2,
    post_id: 2
  },
  // More posts can be added as needed
];

// Define an asynchronous function that seeds the Post table with the post data
const seedPosts = () => Post.bulkCreate(postData);

// Export the seedPosts function
module.exports = seedPosts;