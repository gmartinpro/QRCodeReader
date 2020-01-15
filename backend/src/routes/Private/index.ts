import express from "express";
import { privateRoute } from "./Private";
import { permissionRoutes, HttpMethod, PermissionNames, PermissionActions } from "@middleware/strategy";

export function privateRouter() {
  const router = express.Router();

  permissionRoutes(router, "/", HttpMethod.Get, [{ name: PermissionNames.User, action: PermissionActions.Read }], privateRoute);
  permissionRoutes(
    router,
    "/private",
    HttpMethod.Get,
    [{ name: PermissionNames.Private, action: PermissionActions.Read }],
    privateRoute,
  );

  return router;
}
