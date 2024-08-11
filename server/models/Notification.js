import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {  // Reference to the pet/product
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  message: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
