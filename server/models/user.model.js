// user.model.js

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: String,
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // make sure this matches your Post model name
    },
  ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
