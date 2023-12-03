import likeModel from "../../model/likes/likes.js";
import userModel from "../../model/user/user.js";
import postModel from "../../model/post/post.js";

const likeController = {
  likePost: async (req, res) => {
    try {
      const { userId, postId } = req.body;

      const existingLike = await likeModel.findOne({
        where: {
          userId,
          postId,
        },
      });
      if (existingLike) {
        return res.status(400).json({
          error: "You have already liked this post",
        });
      }

      const like = await likeModel.create({ userId, postId });

      await postModel.increment("likes", {
        where: {
          id: postId,
        },
      });
      res.json(like);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  unlikePost: async (req, res) => {
    try {
      const { userId, postId } = req.body;

      const existingLike = await likeModel.findOne({
        where: {
          postId,
          userId,
        },
      });
      if (!existingLike) {
        return res.status(400).json({
          error: "You have not like this post",
        });
      }
      await likeModel.destroy({
        where: { postId, userId },
      });

      await postModel.decrement("likes", {
        where: {
          id: postId,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  getLikedPosts: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await userModel.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const likedPosts = await user.getLikedPosts();

      res.json(likedPosts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default likeController;
