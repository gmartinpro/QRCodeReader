import express, { Request, Response } from "express";
import { productRouter } from './Product';
import { promotionRouter } from './Promotion';
import { qrcodeRouter } from './QRCode';
import { seedRouter } from './Seed';
import { userRouter } from "./User";

export function mainRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) => res.status(200).send("Flying ! 🚀"));
  router.use("/qrcode", qrcodeRouter());
  router.use("/user", userRouter());
  router.use("/seed", seedRouter());
  router.use("/promotion", promotionRouter());
  router.use("/product", productRouter());

  return router;
}
