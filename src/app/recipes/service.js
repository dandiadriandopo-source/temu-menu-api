const { Recipes } = require("../../models");

// =================================================================
// ----------------------------C-R-U-D------------------------------
// =================================================================

const createRecipes = async (body) => {
  return await Recipes.create(body);
};

const getAllRecipes = async () => {
  return await Recipes.findAll();
};

const updateRecipesById = async (id, body) => {
  const data = await Recipes.findByPk(id);
  return data.update(body);
};

const deleteRecipesById = async (id) => {
  return await Recipes.destroy({ where: { id } });
};

// =================================================================
// ---------------------------H-E-L-P-E-R---------------------------
// =================================================================

const existRecipesId = async (id) => {
  return await Recipes.findByPk(id);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  updateRecipesById,
  deleteRecipesById,
  existRecipesId,
};
