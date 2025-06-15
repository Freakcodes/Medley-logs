import express from "express";
import { createPost, deletePost, getPost, getPosts,getUserPosts,updatePost,uploadAuth } from "../controllers/post.controller.js";
const router=express.Router();

router.get("/upload-auth",uploadAuth)
router.get("/myposts",getUserPosts);
router.get("/",getPosts);
router.get("/:slug",getPost);
router.post("/",createPost);
router.delete("/:slug",deletePost);
router.patch("/:slug",updatePost);

export default router;