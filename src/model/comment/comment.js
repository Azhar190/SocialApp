import { DataTypes } from "sequelize";
import Sequelize from "../../database/config.js";
import userModel from "../user/user.js";
import postModel from "../post/post.js";

const commentModel = Sequelize.define("comment", {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

userModel.hasMany(postModel);
postModel.belongsTo(userModel);
postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);

export default commentModel;
