import express from "express";
import { getComments, postComments } from "../controllers/comment.controller.js";
const router=express.Router()
router.get("/:slug",getComments)
router.post("/:slug",postComments);
export default router