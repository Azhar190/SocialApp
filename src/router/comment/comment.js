import commentController from "../../controller/commentController/commentController.js";
import { Router } from "express";

const commentRouter = Router();

commentRouter.post("/user/:userId/post/:postId", commentController.create);
commentRouter.get("/", commentController.getAllPost);
commentRouter.get(
  "/user/:userId/post/:postId/comment/:commentId",
  commentController.getcommentById
);
commentRouter.put(
  "/user/:userId/post/:postId/update_comment/:commentId",
  commentController.updatecomment
);
commentRouter.put(
  "/user/:userId/post/:postId/delete_comment/:commentId",
  commentController.deletecomment
);

export default commentRouter;
