const express = require("express");
const { Addrating, findAllRate } = require("./controller");
const { authorizeRole, authJwt } = require("../auth/jwtAuth");
const routerRate = express.Router();

routerRate.post("/", authJwt, authorizeRole("admin"), Addrating);
routerRate.get("/", authJwt, authorizeRole("admin"), findAllRate);

module.exports = routerRate;
