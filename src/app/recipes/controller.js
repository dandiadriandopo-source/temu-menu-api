const path = require("path");
const fs = require("fs");

const { resSuccess, resFailed } = require("../../shared/helpers/payload");
const {
  createRecipes,
  getAllRecipes,
  existRecipesId,
  updateRecipesById,
  deleteRecipesById,
} = require("./service");

const createNewRecipes = async (req, res) => {
  try {
    const { user_id, title, country, category, cook_time, is_premium } =
      req.body;

    let url = null;
    let image = null;
    if (req.file) {
      url = `https://temu-menu-api.onrender.com/uploads/${req.file.path.split("/")[7]}`;
      image = req.file.path.split("/")[7];
    }

    const body = {
      user_id,
      url,
      image,
      title,
      country,
      category,
      cook_time,
      is_premium,
    };

    const data = await createRecipes(body);
    return resSuccess(res, 201, "success", "Resep berhasil diupload", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findAllRecipes = async (req, res) => {
  try {
    const data = await getAllRecipes();
    return resSuccess(
      res,
      200,
      "success",
      "Data resep berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const editRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, title, country, category, cook_time, is_premium } =
      req.body;

    const isRecipesExist = await existRecipesId(id);
    if (!isRecipesExist || isRecipesExist === null) {
      return resFailed(res, 404, "error", "Data resep tidak ditemukan");
    }

    let url = null;
    let image = null;
    if (req.file) {
      url = `https://temu-menu-api.onrender.com/uploads/${req.file.path.split("/")[7]}`;
      image = req.file.path.split("/")[7];
    }

    if (image) {
      if (isRecipesExist.image) {
        const filePath = path.join(
          process.cwd(),
          "src",
          "upload",
          isRecipesExist.image,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } else {
      image = isRecipesExist.image;
      url = isRecipesExist.url;
    }

    const body = {
      user_id,
      url,
      image,
      title,
      country,
      category,
      cook_time,
      is_premium,
    };

    const data = await updateRecipesById(id, body);
    return resSuccess(
      res,
      200,
      "success",
      "Data resep berhasil diupdate",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const dropRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const isRecipesExist = await existRecipesId(id);

    if (!isRecipesExist || isRecipesExist === null) {
      return resFailed(res, 404, "error", "Data resep tidak ditemukan");
    }

    if (isRecipesExist.image) {
      const filePath = path.join(
        process.cwd(),
        "src",
        "upload",
        isRecipesExist.image,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const data = await deleteRecipesById(id);
    return resSuccess(res, 200, "success", "Resep berhasil dihapus", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  createNewRecipes,
  findAllRecipes,
  editRecipeById,
  dropRecipeById,
};
