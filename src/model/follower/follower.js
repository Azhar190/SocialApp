import { DataTypes } from "sequelize";
import Sequelize from "../../database/config.js";
import userModel from "../user/user.js";

const followerModel = Sequelize.define("follower", {
  followerId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
    followingId: {
      type: DataTypes.INTEGER,
      references: {
        model: userModel,
        key: "id",
      },
    },
  },
});

followerModel.belongsTo(userModel, {
  foreignKey: "followerId",
  as: "followerId",
});
userModel.hasMany(followerModel, {
  foreignKey: "followerId",
  as: "followerId",
});

followerModel.belongsTo(userModel, {
  foreignKey: "followingId",
  as: "followingId",
});
userModel.hasMany(followerModel, {
  foreignKey: "followingId",
  as: "followingId",
});
export default followerModel;
