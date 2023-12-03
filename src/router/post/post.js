import { Router } from "express";
import postController from "../../controller/postController/postController.js";

const postRouter = Router();

postRouter.post("/:userId", postController.create);

postRouter.get("/", postController.getAllPost);

postRouter.get("/:postId", postController.getPostById);

postRouter.put("/user/:userId/update_post/:postId", postController.updatePost);

postRouter.delete(
  "/user/:userId/delete_post/:postId",
  postController.deletePost
);

export default postRouter;
