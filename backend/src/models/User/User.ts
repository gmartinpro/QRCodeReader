import mongoose, { Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PermissionNames } from "@middleware/strategy";

const { Schema } = mongoose;
type TokenType = "Refresh" | "Authentication";

export interface User extends Document {
  email: string;
  password: string;
  roles: PermissionNames[];
  authenticate: (password: string) => Promise<Boolean>;
  getToken: (type?: TokenType) => string;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods = {
  async authenticate(password: string) {
    return bcrypt.compare(password, this.password);
  },
  getToken(type: TokenType = "Authentication") {
    const payload = {
      id: this.id,
      type,
    };
    let expiresIn;
    switch (type) {
      case "Authentication":
        expiresIn = 36000;
        break;
      case "Refresh":
        expiresIn = "30d";
        break;
      default:
        expiresIn = 36000;
        break;
    }
    return jwt.sign(payload, process.env.SECRETJWT! || "secret", {
      expiresIn,
    });
  },
};

UserSchema.plugin(mongoosePaginate);

export default mongoose.model<User>("User", UserSchema);
