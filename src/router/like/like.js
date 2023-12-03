import express from "express";
import likeController from "../../controller/likeController/likeController.js";

const likeRouter = Router();

likeRouter.post("/like/:userId/:postId", likeController.likePost);

likeRouter.post("/unlike/:userId/:postId", likeController.unlikePost);

likeRouter.get("/like-posts/:userId", likeController.getLikedPosts);

export default likeRouter;
