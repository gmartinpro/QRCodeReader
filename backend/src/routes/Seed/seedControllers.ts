import { RequestHandler } from "express";

import { sequelize } from "@config/";
import { asyncForEach } from "@helpers/";
import path from "path";
import fs from "fs";

export function parseAndExecute() {
    const seedersPath = path.normalize(
      path.join(__dirname, "..", "..", "seeders")
    );

    const queryInterface = sequelize.getQueryInterface();
    fs.readdir(seedersPath, function(err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      //listing all files using forEach
      asyncForEach(files, async function(file) {
        // Do whatever you want to do with the file
        if (file.endsWith(".ts")) {
          console.log("\x1b[32m", "Seed of ", file, "\x1b[0m");
          try {
            const { up } = require(path.normalize(
              path.join(seedersPath, file)
            ));
            await up(queryInterface);
          console.log("\x1b[32m", "End of ", file, "\x1b[0m");
          } catch (error) {
            console.error(
              "\x1b[31m",
              `${error.parent.code}: ${error.message}`,
              "\x1b[0m"
            );
          }
        } else {
          console.log("Skip ", file);
        }
      });
    });
}

export const seedControllers: RequestHandler = async (_req, res) => {

  await parseAndExecute()
  res.status(200).send("Seeds ! 🚀")
};
