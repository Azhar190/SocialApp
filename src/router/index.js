import { Router } from "express";
import userRouter from "./user/user.js";
import postRouter from "./post/post.js";
import likeRouter from "./like/like.js";

const allRoutes = Router();

allRoutes.use("/user", userRouter);
allRoutes.use("/post", postRouter);
allRoutes.use("/post", likeRouter);

export default allRoutes;
