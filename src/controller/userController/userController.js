import { compare, hash } from "bcrypt";
import userModel from "../../model/user/user.js";
import Jwt from "jsonwebtoken";

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userCheck = await userModel.findOne({
        where: {
          email,
        },
      });

      if (userCheck) {
        return res.status(400).json({
          message: `This ${email} is already exist`,
        });
      }
      const hPassword = await hash(password, 10);
      await userModel.create({
        name,
        email,
        password: hPassword,
      });

      return res.status(201).json({
        message: "User created",
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "User not created",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const user = await userModel.findAll({});
      res.json({
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: "Something Wrong" });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User Not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something Wrong",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      const user = await userModel.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userData = await userModel.update({
        username,
        email,
        password,
        where: {
          id: id,
        },
      });
      res.json({
        message: "User updated",
        userData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something Wrong",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByPk(id);
      if (!user) {
        return res.json(404).json({
          message: "User not found",
        });
      }

      await user.destroy();
      res.json({
        message: "User deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something Wrong",
      });
    }
  },
};

export default userController;
