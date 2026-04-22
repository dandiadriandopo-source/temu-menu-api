const express = require("express");
const { likeAct, saveAct, getAllActByUserId } = require("./controller");
const { authJwt, authorizeRole } = require("../auth/jwtAuth");
const routerAct = express.Router();

routerAct.get(
  "/",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  getAllActByUserId,
);
routerAct.post("/:id/like", authJwt, authorizeRole("pelanggan"), likeAct);
routerAct.post("/:id/save", authJwt, authorizeRole("pelanggan"), saveAct);

module.exports = routerAct;
