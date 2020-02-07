import express, { Request, Response } from "express";
import { debugUserController } from './_debug';

export function userRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) => res.status(200).send("User routes ! 🚀"));
  router.get(
    "/users",
    async (req, res, next) => await debugUserController(req, res, next)
  );

  return router;
}
