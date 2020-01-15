import bcrypt from "bcryptjs";
import { User } from "@models/";
import { validateRegisterInput } from "@validator/index";
import { RequestHandler } from "express";

const register: RequestHandler = async (req, res) => {
  const { body } = req;
  const { errors, isValid } = validateRegisterInput(body);
  if (!isValid) {
    return res.status(412).json(errors);
  }

  const userFound = await User.findOne({
    email: body.email,
  });
  if (userFound) {
    return res.status(409).json({
      code: 409,
      message: "Email already used",
    });
  }

  const birthDate = new Date(body.birthDate);
  const user = new User({
    email: body.email,
    password: body.password,
    birthDate,
    roles: ["User"],
  });
  // hash pass
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    const result = await user.save();
    if (!result) {
      return res.status(500).json({
        code: 500,
        message: "Internal error",
      });
    }

    return res.status(200).json({
      token: `Bearer ${user.getToken()}`,
      refreshToken: `Bearer ${user.getToken("Refresh")}`,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { register };
