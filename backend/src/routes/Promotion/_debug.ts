import { RequestHandler } from "express";
import { Promotion } from "@models/Promotion";

export const debugPromotionController: RequestHandler = async (_req, res) => {
  const users = await Promotion.findAll();
  return res.status(200).json(users);
};
