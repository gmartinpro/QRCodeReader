import { RequestHandler } from "express";
import { User } from '@models/User';

export const debugUserController: RequestHandler = async (_req, res) => {
  const users = await User.findAll()
  return res.status(200).json(users)
}
