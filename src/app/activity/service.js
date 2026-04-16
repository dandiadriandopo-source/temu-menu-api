const { where } = require("sequelize");
const { Activity, Recipes, User } = require("../../models");

const createActivity = async (body) => {
  return await Activity.create(body);
};

const findByUserId = async (user_id) => {
  return await Activity.findAll({
    where: { user_id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Recipes,
        as: "recipes",
      },
    ],
  });
};

const findActByUserAndRecipes = async (user_id, recipes_id, type) => {
  return await Activity.findOne({
    where: {
      user_id,
      recipes_id,
      type,
    },
  });
};

module.exports = {
  createActivity,
  findByUserId,
  findActByUserAndRecipes,
};
