import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products", // Assuming there's a Product model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming there's a User model
    required: true,
  },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming there's a Shelter model
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Adoption = mongoose.model('Adoption', adoptionSchema);

export default Adoption;
