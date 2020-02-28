const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("./auth/restricted-middleware.js");
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const recRouter = require("./recommendations/rec-router.js")

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/recommendations", authenticate, recRouter);

module.exports = server;
