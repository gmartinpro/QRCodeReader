import mongoose from "mongoose";
import { Role } from "@models/index";

const MONGO_PORT = process.env.MONGO_PORT || "";
const MONGO_SERVER = process.env.MONGO_SERVER || "";

export function connectMongoose() {
  return mongoose
    .connect(`mongodb://${MONGO_SERVER}:${MONGO_PORT}/db`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      await Role.initializeDatabase();
      console.log("\x1b[32m", "Mongodb connected and roles are initialized", "\x1b[0m");
    })
    .catch(error => {
      console.log(`Error while DB connecting to '${MONGO_SERVER}'`);
      console.error("\x1b[31m", error.message, "\x1b[0m");
      console.log("Retrying");
      setTimeout(connectMongoose, 5000);
    });
}
