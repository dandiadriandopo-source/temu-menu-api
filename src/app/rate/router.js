const express = require("express");
const { Addrating, findAllRate } = require("./controller");
const routerRate = express.Router();

routerRate.post("/", Addrating);
routerRate.get("/", findAllRate);

module.exports = routerRate;
