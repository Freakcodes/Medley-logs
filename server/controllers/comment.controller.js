import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
export const getComments = async (req, res) => {
  const posts = await Post.find({ slug: req.params.slug });
  const comments = await Comment.find({ post: posts }).populate("user","username");
//   if (comments.length == 0) {
//     res.status(400).send("No comments in this post");
//   }
  res.status(200).json(comments);
};

export const postComments = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(401).json("User not found!");
  }
  const newComment = new Comment({
    user: user._id,
    post: post._id,
    ...req.body,
  });
  const comment = await newComment.save();
  console.log("Comment posted successfully"+ comment);
  
  res.status(200).json(comment);
};
