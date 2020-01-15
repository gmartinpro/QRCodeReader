import Express, { Response, NextFunction, Request, RequestHandler } from "express";
import { RequestWithUser } from "../../../index";
import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";

import mongoose from "mongoose";
import passport, { PassportStatic } from "passport";
import { Role } from "@models/index";

const Users = mongoose.model("User");

interface Options {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}

const opts: Options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETJWT! || "secret",
};

interface RoleType {
  authorizations: Array<{ actions: PermissionActions[]; name: PermissionNames }>;
}
enum PermissionNames {
  Private = "Private",
  User = "User",
}
enum RoleName {
  SuperAdmin = "SuperAdmin",
  User = "User",
}
enum PermissionActions {
  Create = "Create",
  Read = "Read",
  Update = "Update",
  Delete = "Delete",
}

type Authorization = {
  action: PermissionActions;
  name: PermissionNames;
};

const permit = (authorizations: Authorization[]) => {
  const isAllowed = (authorization: Authorization, role: RoleType, _params?: Request["params"]) => {
    // 1. Check authorization
    const roleAuthorization = role.authorizations.find(auth => auth.name === authorization.name);

    if (!roleAuthorization) {
      return false;
    }

    // 2. Check action
    let actionRequired: PermissionActions;
    switch (authorization.action) {
      case PermissionActions.Create:
        actionRequired = PermissionActions.Create;
        break;
      case PermissionActions.Read:
        actionRequired = PermissionActions.Read;
        break;
      case PermissionActions.Read:
        actionRequired = PermissionActions.Update;
        break;
      case PermissionActions.Delete:
        actionRequired = PermissionActions.Delete;
        break;
      default:
        actionRequired = authorization.action;
    }

    const actionAuthorized = roleAuthorization.actions.some(it => it === actionRequired);
    return actionAuthorized;
  };

  const isAuthorizationAllowed = (authorization: Authorization, roles: RoleType[], params: Request["params"]) =>
    roles.some((cur: RoleType) => isAllowed(authorization, cur, params));

  // return a middleware
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user) {
      const roleNames = req.user.roles;
      Role.find({ name: { $in: roleNames } })
        .lean()
        .then(roles => {
          const areAllAllowed = authorizations.every((cur: Authorization) => isAuthorizationAllowed(cur, roles, req.params));
          if (areAllAllowed) {
            next(); // role is allowed, so continue on the next middleware
          } else {
            res.status(403).json({ message: "Forbidden" });
          }
        })
        .catch(() => {
          res.status(403).json({ message: "Forbidden" });
        });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

enum HttpMethod {
  Get = "get",
  Post = "post",
  Delete = "delete",
  Patch = "patch",
}

const permissionRoutes = (
  router: Express.Router,
  route: string,
  method: HttpMethod,
  authorizations: Authorization[],
  child: RequestHandler,
) => {
  router.use(
    route,
    passport.authenticate("jwt", {
      session: false,
    }),
  );
  router.use(route, permit(authorizations));
  router[method](route, child);
};

const jwt = (passport: PassportStatic) => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      Users.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, {
              ...user._doc,
              password: undefined,
            });
          }
          return done(null, false);
        })
        .catch(() => done(null, false));
    }),
  );
};

export { jwt, permissionRoutes, PermissionNames, PermissionActions, RoleType, HttpMethod, RoleName };
