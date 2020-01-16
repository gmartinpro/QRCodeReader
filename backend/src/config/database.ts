import { Sequelize, Options } from "sequelize";
import path from "path";
import { parseAndExecute } from '@routes/Seed/seedControllers';

export const sequelizeConfig: Options = {
  dialect: "sqlite",
  storage: path.normalize(path.join(__dirname, "..", "database", "sqlite.sqlite")),
};

export const sequelize = new Sequelize(sequelizeConfig);

export async function InitializeSequelizeConnection() {
  try {
    await sequelize.authenticate();
    console.log("\x1b[32m", "Sequelize", "\x1b[0m");
    await parseAndExecute();
  } catch (error) {
    console.log(`Error while DB try to connect`);
    console.error("\x1b[31m", error.message, "\x1b[0m");
    console.log("Retrying");
    setTimeout(InitializeSequelizeConnection, 5000);
  }
}
