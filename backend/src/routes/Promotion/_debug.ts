import { RequestHandler } from "express";
import { Promotion } from "@models/Promotion";
import { Models } from '@models/';

export const debugPromotionController: RequestHandler = async (_req, res) => {
  const users = await Promotion.findAll({ include: [Models.User_Promotion]});
  return res.status(200).json(users);
};
