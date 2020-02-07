import { RequestHandler } from "express";
import { QRCode } from "@models/QRCode";
import { Models } from '@models/';

export const debugQRCodeController: RequestHandler = async (_req, res) => {
  const users = await QRCode.findAll({ include: [Models.Promotion]});
  return res.status(200).json(users);
};
