import commentModel from "../../model/comment/comment.js";
import postModel from "../../model/post/post.js";
import userModel from "../../model/user/user.js";

const commentController = {
  create: async (req, res) => {
    try {
      const { userId, postId } = req.params;
      const { content } = req.body;

      const user = await postModel.findByPk(userId);
      {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
      }

      const post = await postModel.findByPk(postId);

      if (!post) {
        return res.status(404).json({ mesage: "Post not found" });
      }
      const comment = await commentModel.create({
        content,
        author: user.name,
        userId,
        postId,
      });

      return res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "comment not created",
      });
    }
  },

  getAllPost: async (req, res) => {
    try {
      const comments = await commentModel.findAll({
        include: [
          {
            model: [userModel, postModel],
            attributes: ["id", "author"],
          },
        ],
      });
      res.json(comments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getcommentById: async (req, res) => {
    try {
      const { userId, postId, commentId } = req.params;
      const comment = await commentModel.findByPk({
        where: {
          id: commentId,
          postId,
          userId,
        },
      });

      if (!comment) {
        return res.status(404).json({ error: "comment not fouund" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatecomment: async (req, res) => {
    try {
      const { userId, postId, commentId } = req.params;
      const { content } = req.body;

      const comment = await commentModel.findOne({
        where: {
          id: commentId,
          userId,
          postId,
        },
      });
      if (!comment) {
        return res.status(404).json({ error: "No comment found" });
      }
      const commentUpdate = await commentModel.update({
        content,
        where: {
          id: commentId,
        },
      });

      res.json(updatecomment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletecomment: async (req, res) => {
    try {
      const { postId } = req.params;

      const commentDeleted = await commentModel.delete({
        where: {
          id: postId,
        },
      });

      res.json(commentDeleted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default commentController;
