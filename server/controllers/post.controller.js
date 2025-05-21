import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";


export const getPosts=async (req,res)=>{
    const posts=await Post.find();
    res.status(200).json(posts);
}
export const getUserPosts = async (req, res) => {
  try {
    // Clerk injects `req.auth` only if Clerk middleware is active and token is valid
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Unauthorized. Clerk user ID not found." });
    }

    // Find the user in our DB using clerkUserId
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found in database." });
    }

    // Get posts created by this user
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPost=async(req,res)=>{
    const post=await Post.findOne({slug:req.params.slug});
    res.status(200).json(post);
}

export const createPost=async(req,res)=>{
    const clerkUserId=req.auth.userId;
    console.log(clerkUserId);
    
    if(!clerkUserId){
        return res.status(401).json("Not authenticated");
    }
    const user= await User.findOne({clerkUserId});
    if(!user){
        return res.status().json("User not found!");
    }
    // const createdBy=await Post.find().populate("user","username email ")
    // console.log(createdBy);
    
    const newPost=new Post({user:user._id,createdBy:user.username,...req.body});
    const post=await newPost.save();
    res.status(200).json(post);
}

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
    console.log(clerkUserId);
    
//   if (!clerkUserId) {
//     return res.status(401).json("Not authenticated");
//   }

  try {
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const deletedPost = await Post.findOneAndDelete({
      slug: req.params.slug,
      user: user._id,
    });

    if (!deletedPost) {
      return res.status(403).json("Post not deleted due to some error");
    }

    res.status(200).json("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json("Internal server error");
  }
};


const imagekit=new ImageKit({
    urlEndpoint:process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey:process.env.IK_PRIVATE_KEY
})
export const uploadAuth=async(req,res)=>
{
    var results=imagekit.getAuthenticationParameters();
    res.send(results);
}