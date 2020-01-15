import { RequestHandler } from "express";

export const privateRoute: RequestHandler = (_req, res) => res.status(200).send("Access to private route");
