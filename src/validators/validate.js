import Joi from "joi";

const UserValidator = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().max(50).required(),
        password: Joi.string().min(6).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({
          message: "Invalid data",
          error,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        error,
        message: "Something Wrong",
      });
    }
  },
  signin: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        email: Joi.string().email().max(50).required(),
        password: Joi.string().min(6).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({
          message: "Invalid data",
          error,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        error,
        message: "Something Wrong",
      });
    }
  },
};

export default UserValidator;
