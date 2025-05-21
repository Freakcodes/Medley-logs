import express from "express"
import { getSavedPosts, savePostToUser } from "../controllers/user.controller.js";

const router =express.Router()

router.post("/save-post/:slug",savePostToUser);
router.get("/get-saved-posts",getSavedPosts);
export default router;