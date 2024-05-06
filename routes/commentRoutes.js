import express from 'express';
import Comment from './../models/commentModel.js';
import User from './../models/userModel.js'; // Import the User model
import { requireSignIn } from '../middlewares/authMiddleware.js'; // Assuming authentication middleware is correctly implemented

const router = express.Router();

router.post('/comments', requireSignIn, async (req, res) => {
  const { productId, text } = req.body;
  const user = req.user;

  try {
    // Create a new comment
    const newComment = new Comment({
      text,
      productId,
      userId: user._id, // Associate the comment with the user
    });

    // Save the comment
    await newComment.save();

    // Fetch the user's name from the database based on their ID
    const userObj = await User.findById(user._id);

    if (!userObj) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the comment and user's name
    res.status(201).json({
      comment: {
        text: newComment.text,
        user: {
          name: userObj.name, // Include the user's name in the response
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting comment' });
  }
});

router.post('/comments/replies', requireSignIn, async (req, res) => {
  const { commentId, text } = req.body;
  const user = req.user;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Create a new reply
    const reply = {
      text,
      userId: user._id,
    };

    // Add the reply to the comment's replies array
    comment.replies.push(reply);

    // Save the updated comment
    await comment.save();

    // Find the user information for the reply
    const userObj = await User.findById(user._id, 'name');

    if (!userObj) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the reply with user information
    res.status(201).json({
      reply: {
        text: reply.text,
        user: {
          name: userObj.name,
        },
      },
    });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Error adding reply' });
  }
});

router.get('/comments/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const comments = await Comment.find({ productId })
      .populate('userId', 'name') // Populate the user who made the comment
      .populate('replies.userId', 'name'); // Populate users who made the replies

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});
//delete comment
router.delete('/comments/delete/:commentId', requireSignIn, async (req, res) => {
  const { commentId } = req.params;
  const user = req.user;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Correct method for deleting a document in MongoDB
    await Comment.deleteOne({ _id: commentId });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error.message); // Log error message
    res.status(500).json({ error: 'Error deleting comment' });
  }
});


// Delete a reply
router.delete('/comments/replies/delete/:commentId/:replyId', requireSignIn, async (req, res) => {
  const { commentId, replyId } = req.params;
  const user = req.user;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);

    if (replyIndex === -1) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    const reply = comment.replies[replyIndex];

    if (reply.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Remove the reply from the replies array
    comment.replies.splice(replyIndex, 1);

    // Save the updated comment
    await comment.save();

    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error('Error deleting reply:', error.message);
    res.status(500).json({ error: 'Error deleting reply' });
  }
});



export default router;
