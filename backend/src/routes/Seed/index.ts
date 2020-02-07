import express, { Request, Response } from "express";
import { seedControllers, seedFlush } from './seedControllers';

export function seedRouter() {
  const router = express.Router();

  router.get("/import", async (req, res, next) => await seedControllers(req, res, next));
  router.get(
    "/flush",
    async (req, res, next) => await seedFlush(req, res, next)
  );

  return router;
}
