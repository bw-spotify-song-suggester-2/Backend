const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("./auth/restricted-middleware.js");
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const recRouter = require("./recommendations/rec-router.js")
const playlistRouter = require("./playlists/playlist-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/playlists", authenticate, playlistRouter);
server.use("/api/recommendations", authenticate, recRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;
