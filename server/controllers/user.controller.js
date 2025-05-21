import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const savePostToUser = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json("Post not found!");
    }

    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated");
    }

    const user = await User.findOne({ clerkUserId }); // ✅ fix: proper query object

    if (!user) {
      return res.status(401).json("User not found!");
    }

    const alreadySaved = user.savedPosts.some((savedId) =>
      savedId.toString() === post._id.toString()
    ); // ✅ fix: correct check for existing post

    if (alreadySaved) {
      console.log("post exists");
      return res.status(409).send("Already saved"); // ✅ fix: proper status code
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      { $addToSet: { savedPosts: post._id } }, // avoids duplicates
      { new: true }
    );

    console.log("post saved");

    return res.status(200).json({ message: "Post saved", savedPosts: updatedUser.savedPosts });
  } catch (err) {
    console.error("Error saving post:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




export const getSavedPosts = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ clerkUserId }).populate("savedPosts");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ savedPosts: user.savedPosts });
  } catch (err) {
    console.error("Error fetching saved posts:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
