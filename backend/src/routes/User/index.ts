import express from "express";
import { register } from "./Register";
import { login } from "./Login";

export function userRouter() {
  const router = express.Router();

  router.post("/register", register);
  router.post("/login", login);

  return router;
}
