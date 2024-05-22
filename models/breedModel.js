import mongoose from "mongoose";

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    ref: "Category",
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("Breed", breedSchema);