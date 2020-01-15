import http from "http";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "morgan";
import { connectMongoose } from "@config/";
import { AddressInfo } from "net";
import { mainRouter } from "@routes/";
import passport from "passport";
import { jwt } from "@middleware/strategy";

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

// Init passport security and jwt middleware
app.use(passport.initialize());
jwt(passport);

// Init route and port
app.use("/", mainRouter());
app.use("/public", express.static("public"));
app.set("port", PORT);

// TODO refacto mongoose
// connectMongoose().then(() => server.listen(PORT));
server.listen(PORT);

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
