import userModel from "../model/user/user.js";
import postModel from "../model/post/post.js";

const dbInt = async () => {
  await userModel.sync({
    alert: true,
    force: false,
  });
  await postModel.sync({
    alert: true,
    force: false,
  });
};

export default dbInt;
