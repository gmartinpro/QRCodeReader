import http from "http";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "morgan";
import { InitializeSequelizeConnection } from "@config/";
import { AddressInfo } from "net";
import { mainRouter } from "@routes/";
import { User } from "@models/User";
import { QRCode } from "@models/QRCode";
import { Promotion } from "@models/Promotion";
import { Product } from "@models/Product";
import { UserPromotion, PromotionProduct } from "@models/Associations";
import { parseAndExecute } from "@routes/Seed/seedControllers";

// Enebale .env
dotenv.config();

// Constants
const PORT = process.env.API_PORT || 3001;

// Create server
const app = express();
const server = http.createServer(app);

// Loger
if (process.env.ENV === "dev") {
  app.use(logger("dev"));
}

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Init route and port
app.use("/", mainRouter());
app.use("/public", express.static("public"));
app.set("port", PORT);

InitializeSequelizeConnection().then(async () => {
  await User.sync({ force: true });
  await QRCode.sync({ force: true });
  await Promotion.sync({ force: true });
  await Product.sync({ force: true });
  await UserPromotion.sync({ force: true });
  await PromotionProduct.sync({ force: true });

  await parseAndExecute();

  server.listen(PORT);
});

server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr: AddressInfo | string | null = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr!.port}`;

  console.log(`🚀 Ts express server is running on ${bind}! 🚀`);
});
