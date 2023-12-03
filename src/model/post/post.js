import { DataTypes } from "sequelize";
import Sequelize from "../../database/config.js";

const postModel = Sequelize.define("post", {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default postModel;
