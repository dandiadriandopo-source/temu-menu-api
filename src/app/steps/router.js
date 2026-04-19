const express = require("express");
const {
  createNewSteps,
  findAllSteps,
  editStepById,
  dropStepById,
} = require("./controller");
const upload = require("../../shared/middlewares/upload/upload");
const routerSteps = express.Router();

routerSteps.post(
  "/",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  upload.single("step_image"),
  createNewSteps,
);
routerSteps.get(
  "/",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  findAllSteps,
);
routerSteps.patch(
  "/:id",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  upload.single("step_image"),
  editStepById,
);
routerSteps.delete(
  "/:id",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  dropStepById,
);

module.exports = routerSteps;
