import { DataTypes } from "sequelize";
import Sequelize from "../../database/config.js";
import userModel from "../user/user.js";
import postModel from "../post/post.js";

const likeModel = Sequelize.define("Like", {});

likeModel.belongsTo(userModel, { foreignKey: "userId" });
userModel.hasMany(likeModel);

likeModel.belongsToMany(postModel, { foreignKey: "postId" });
postModel.hasMany(likeModel);

export default likeModel;
