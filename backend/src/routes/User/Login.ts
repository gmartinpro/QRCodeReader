/* @flow */
import { RequestHandler } from "express";
import { User } from "../../models";

const login: RequestHandler = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  if (!email || !password) {
    return res.status(412).json({
      code: 412,
      message: "Missing credentials",
    });
  }

  let user;
  try {
    user = await User.findOne({ email })
      .select(`_id validated email firstName lastName password birthDate roles`)
  } catch (err) {
    console.error("Cannot find user", err);
  }

  if (!user) {
    return res.status(401).json({
      message: "No user found",
    });
  }

  try {
    if (await user.authenticate(password)) {
      const { password, ...userDoc } = user;
      return res.status(200).json({
        token: `Bearer ${user.getToken()}`,
        refreshToken: `Bearer ${user.getToken("Refresh")}`,
        user: userDoc,
      });
    }
  } catch (err) {
    console.error("Cannot authenticate user", err);
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
};

export { login };
