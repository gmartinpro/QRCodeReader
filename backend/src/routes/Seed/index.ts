import express, { Request, Response } from "express";
import { seedControllers } from './seedControllers';

export function seedRouter() {
  const router = express.Router();

  router.get("/import", async (req, res, next) => await seedControllers(req, res, next));

  return router;
}
