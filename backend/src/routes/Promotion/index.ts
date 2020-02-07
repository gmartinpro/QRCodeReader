import express, { Request, Response } from "express";
import { debugPromotionController } from "./_debug";

export function promotionRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) =>
    res.status(200).send("Promotion routes ! 🚀")
  );
  router.get(
    "/promotions",
    async (req, res, next) => await debugPromotionController(req, res, next)
  );

  return router;
}
