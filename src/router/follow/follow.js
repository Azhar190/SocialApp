import express from "express";
import followerController from "../../controller/followController/followcontroller.js";

const followRouter = Router();

followRouter.post("/follow", followerController.followUser);
followRouter.post("/unfollow", followerController.unfollowUser);

export default followRouter;
