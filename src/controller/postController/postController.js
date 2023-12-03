import postModel from "../../model/post/post.js";
import userModel from "../../model/user/user.js";

const postController = {
  create: async (req, res) => {
    try {
      const { userId } = req.params;
      const { content } = req.body;

      const post = await postModel.create({
        userId,
        content,
      });

      return res.status(201).json({
        message: "Post created",
        post,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Post not created",
      });
    }
  },

  getAllPost: async (req, res) => {
    try {
      const post = await post.findAll({
        include: [
          {
            model: userModel,
            attributes: ["id", "username"],
            as: "author",
          },
        ],
      });
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await post.findByPk(req.params.postId, {
        include: [
          {
            model: userModel,
            attributes: ["id", "username"],
            as: "author",
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ error: "Post not fouund" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { content } = req.body;

      await post.update(
        { content },
        {
          where: {
            id: req.params.postId,
          },
        }
      );

      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      await post.destroy({
        where: {
          id: req.params.postId,
        },
      });

      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default postController;
