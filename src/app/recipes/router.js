const express = require("express");
const {
  createNewRecipes,
  findAllRecipes,
  editRecipeById,
  dropRecipeById,
} = require("./controller");
const upload = require("../../shared/middlewares/upload/upload");
const routerRecipes = express.Router();

routerRecipes.post("/", upload.single("url"), createNewRecipes);
routerRecipes.get("/", findAllRecipes);
routerRecipes.patch("/:id", upload.single("url"), editRecipeById);
routerRecipes.delete("/:id", dropRecipeById);

module.exports = routerRecipes;
