const express = require("express");
const {
  createNewRecipes,
  findAllRecipes,
  editRecipeById,
  dropRecipeById,
} = require("./controller");
const upload = require("../../shared/middlewares/upload/upload");
const { authJwt, authorizeRole } = require("../auth/jwtAuth");
const routerRecipes = express.Router();

routerRecipes.post(
  "/",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  upload.single("url"),
  createNewRecipes,
);
routerRecipes.get(
  "/",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  findAllRecipes,
);
routerRecipes.patch(
  "/:id",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  upload.single("url"),
  editRecipeById,
);
routerRecipes.delete(
  "/:id",
  authJwt,
  authorizeRole("pelanggan", "admin"),
  dropRecipeById,
);

module.exports = routerRecipes;
