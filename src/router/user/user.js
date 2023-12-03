import { Router } from "express";
import userController from "../../controller/userController/userController.js";

const userRouter = Router();

userRouter.post("/", userController.create);

userRouter.get("/", userController.getAll);

userRouter.get("/:postId", userController.getOne);

userRouter.put("/:postId", userController.update);

userRouter.delete("/:postId", userController.delete);

export default userRouter;
