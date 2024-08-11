import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, // New field
      ref: "users", // Reference to User or Shelter collection
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);