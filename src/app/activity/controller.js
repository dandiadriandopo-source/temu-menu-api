const { resSuccess, resFailed } = require("../../shared/helpers/payload");
const {
  findActByUserAndRecipes,
  createActivity,
  findByUserId,
} = require("./service");

const likeAct = async (req, res) => {
  try {
    const recipesId = req.params.id;
    const userId = req.user.id;

    const checkAct = await findActByUserAndRecipes(userId, recipesId, "like");

    if (checkAct) {
      await checkAct.destroy();
      return resSuccess(res, 200, "success", "unlike");
    }

    const body = {
      user_id: userId,
      recipes_id: recipesId,
      type: "like",
    };
    const data = await createActivity(body);
    return resSuccess(res, 201, "success", "like", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const saveAct = async (req, res) => {
  try {
    const recipesId = req.params.id;
    const userId = req.user.id;

    const checkAct = await findActByUserAndRecipes(userId, recipesId, "save");

    if (checkAct) {
      await checkAct.destroy();
      return resSuccess(res, 200, "success", "unsave");
    }

    const body = {
      user_id: userId,
      recipes_id: recipesId,
      type: "save",
    };
    const data = await createActivity(body);
    return resSuccess(res, 201, "success", "like", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const getAllActByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await findByUserId(userId);
    return resSuccess(res, 200, "success", "Data aktivitas ditemukan", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  likeAct,
  saveAct,
  getAllActByUserId,
};
