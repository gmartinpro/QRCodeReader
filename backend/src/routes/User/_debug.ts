import { RequestHandler } from "express";
import { User } from "@models/User";
import { Models } from "@models/";

export const debugUserController: RequestHandler = async (_req, res) => {
  const users = await User.findAll({ include: [Models.User_Promotion] });
  return res.status(200).json({ users });
};
