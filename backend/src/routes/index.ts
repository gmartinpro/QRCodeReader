import express, { Request, Response } from "express";
import { userRouter } from "./User";
import { seedRouter } from './Seed';

export function mainRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) => res.status(200).send("Flying ! 🚀"));
  router.use("/user", userRouter());
  router.use("/seed", seedRouter());

  return router;
}
