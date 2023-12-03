import { DataTypes } from "sequelize";
import Sequelize from "../../database/config.js";
import postModel from "../post/post.js";

const userModel = Sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

userModel.hasMany(postModel);
postModel.belongsTo(userModel);

export default userModel;
