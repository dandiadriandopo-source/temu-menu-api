const express = require("express");
const {
  createNewSteps,
  findAllSteps,
  editStepById,
  dropStepById,
} = require("./controller");
const upload = require("../../shared/middlewares/upload/upload");
const routerSteps = express.Router();

routerSteps.post("/", upload.single("step_image"), createNewSteps);
routerSteps.get("/", findAllSteps);
routerSteps.patch("/:id", upload.single("step_image"), editStepById);
routerSteps.delete("/:id", dropStepById);

module.exports = routerSteps;
