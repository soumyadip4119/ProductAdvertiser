import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specifications: [
    {
      type: String,
      required: true,
    },
  ],
  summary: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ProductsModel = mongoose.model("Products", productSchema);
