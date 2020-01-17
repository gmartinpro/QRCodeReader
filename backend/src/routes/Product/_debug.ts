import { RequestHandler } from "express";
import { Product } from "@models/Product";

export const debugProductController: RequestHandler = async (_req, res) => {
  const users = await Product.findAll();
  return res.status(200).json(users);
};
