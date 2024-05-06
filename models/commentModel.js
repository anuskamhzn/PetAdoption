import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Referencing the 'users' model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  // Referencing the 'users' model
    required: true,
  },
  replies: [replySchema], // Adding the `replies` array
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
