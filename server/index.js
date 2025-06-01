import express from "express";
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comments.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import webHookRouter from "./routes/webhooks.route.js";
import { clerkMiddleware } from '@clerk/express'
import cors from "cors";

const app=express();
app.use(cors({
  origin: "https://medley-logs-j5xp.vercel.app", 
  credentials: true
}));

 app.use("/webhooks",webHookRouter);
app.use(clerkMiddleware());
app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", 
//     "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.listen(3000,()=>{
  console.log("Up and running");
    connectDB();
})
app.use("/users",userRouter);
app.use("/posts",postRouter);
app.use("/comments",commentRouter);
