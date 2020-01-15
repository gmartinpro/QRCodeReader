import mongoose, { Document, Model, Schema } from "mongoose";
import { RoleType, PermissionNames, PermissionActions, RoleName } from "@middleware/strategy";
import { asyncForEach } from "@helpers/index";

export interface Role extends Document {
  name: string;
  authorizations: RoleType["authorizations"];
}

interface RoleStatics extends Model<Role> {
  initializeDatabase(): Promise<void>;
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    authorizations: [
      {
        name: {
          type: String,
        },
        actions: {
          type: [String],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface AuthorizationMapping {
  [RoleName.SuperAdmin]: {
    authorizations: {
      [action: string]: PermissionActions[];
    };
  };
  [RoleName.User]: {
    authorizations: {
      [action: string]: PermissionActions[];
    };
  };
}

const authorizations: AuthorizationMapping = {
  [RoleName.SuperAdmin]: {
    authorizations: {
      [PermissionNames.Private]: [PermissionActions.Create, PermissionActions.Read, PermissionActions.Update, PermissionActions.Delete],
      [PermissionNames.User]: [PermissionActions.Create, PermissionActions.Read, PermissionActions.Update, PermissionActions.Delete],
    },
  },
  [RoleName.User]: {
    authorizations: {
      [PermissionNames.Private]: [],
      [PermissionNames.User]: [PermissionActions.Create, PermissionActions.Read, PermissionActions.Update, PermissionActions.Delete],
    },
  },
};

RoleSchema.statics = {
  async initializeDatabase() {
    await asyncForEach(Object.keys(authorizations), async (name: string) => {
      let role: Role = await this.findOne({ name });

      const newAuthorizations: any[] = [];
      const roleDesc = authorizations[name as RoleName].authorizations;
      Object.keys(roleDesc).forEach(authName => {
        newAuthorizations.push({
          name: authName,
          actions: roleDesc[authName],
        });
      });

      if (!role) {
        role = new this({
          name: name,
          authorizations: newAuthorizations,
        });
        await role.save();
      } else {
        await this.findOneAndUpdate(
          {
            name: name,
          },
          {
            authorizations: [...newAuthorizations],
          },
        );
      }
    });
  },
};

export default mongoose.model<Role, RoleStatics>("Role", RoleSchema);
