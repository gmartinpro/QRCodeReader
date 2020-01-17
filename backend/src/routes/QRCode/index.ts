import express, { Request, Response } from "express";
import { debugQRCodeController } from "./_debug";

export function qrcodeRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) =>
    res.status(200).send("QRCode routes ! 🚀")
  );
  router.get(
    "/qrcodes",
    async (req, res, next) => await debugQRCodeController(req, res, next)
  );

  return router;
}
