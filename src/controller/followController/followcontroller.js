import followerModel from "../../model/follower/follower.js";
import userModel from "../../model/user/user.js";

const followerController = {
  followUser: async (req, res) => {
    try {
      const { followerId, followingId } = req.body;
      if (followerId === followingId) {
        return res.status(400).json({
          message: "You cant follow yourself",
        });
      }
      const existingFollower = await followerModel.findOne({
        where: {
          followerId,
          followingId,
        },
      });
      if (existingFollower) {
        return res.status(400).json({
          message: "You are already following this user",
        });
      }
      const follower = await followerModel.create({ followerId, followingId });

      await userModel.increment("followerId", { where: { id: followingId } });
      await userModel.increment("followingId", { where: { id: followerId } });

      res.json(follower);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  unfollowUser: async (req, res) => {
    try {
      const { followerId, followingId } = req.body;

      await followerModel.destroy({
        where: {
          followerId,
          followingId,
        },
      });

      await userModel.decrement("followersCount", {
        where: { id: followingId },
      });
      await userModel.decrement("followingCount", {
        where: { id: followerId },
      });

      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default followerController;
