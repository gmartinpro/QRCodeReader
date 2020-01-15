import { User } from "./src/models";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: User;
}
