import express, { Request, Response } from "express";
import { userRouter } from "./User";
import { privateRouter } from "./Private";

export function mainRouter() {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) => res.status(200).send("Flying ! 🚀"));
  router.use("/user", userRouter());
  router.use("/private", privateRouter());

  return router;
}
