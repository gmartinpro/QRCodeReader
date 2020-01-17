import { RequestHandler } from "express";
import { QRCode } from "@models/QRCode";

export const debugQRCodeController: RequestHandler = async (_req, res) => {
  const users = await QRCode.findAll();
  return res.status(200).json(users);
};
