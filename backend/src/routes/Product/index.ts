import express, { Request, Response } from "express";
import { debugProductController } from "./_debug";

export function productRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) =>
    res.status(200).send("Product routes ! 🚀")
  );
  router.get(
    "/products",
    async (req, res, next) => await debugProductController(req, res, next)
  );

  return router;
}
