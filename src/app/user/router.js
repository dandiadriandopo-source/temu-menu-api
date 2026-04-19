const express = require("express");
const {
  regUser,
  findAllUser,
  editUserById,
  dropUserById,
} = require("./controller");
const upload = require("../../shared/middlewares/upload/upload");
const { authJwt, authorizeRole } = require("../auth/jwtAuth");
const routerUser = express.Router();

routerUser.post(
  "/",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  upload.single("profil"),
  regUser,
);
routerUser.get("/", authJwt, authorizeRole("pelanggan", "admin"), findAllUser);
routerUser.patch(
  "/:id",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  upload.single("profil"),
  editUserById,
);
routerUser.delete("/:id", authJwt, authorizeRole("admin"), dropUserById);

module.exports = routerUser;
