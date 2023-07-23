import mongoose from "mongoose";
import commentSchema from "./Comment.js";

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    tags: [{
      type: String
    }],
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
