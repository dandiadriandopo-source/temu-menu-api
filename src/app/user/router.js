const express = require("express");
const {
  regUser,
  findAllUser,
  editUserById,
  dropUserById,
} = require("./controller");
const upload = require("../../shared/middlewares/upload/upload");
const routerUser = express.Router();

routerUser.post("/", upload.single("profil"), regUser);
routerUser.get("/", findAllUser);
routerUser.patch("/:id", upload.single("profil"), editUserById);
routerUser.delete("/:id", dropUserById);

module.exports = routerUser;
