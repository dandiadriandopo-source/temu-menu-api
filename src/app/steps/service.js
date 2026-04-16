const { Steps } = require("../../models");

// =================================================================
// ----------------------------C-R-U-D------------------------------
// =================================================================

const createSteps = async (body) => {
  return await Steps.create(body);
};

const getAllSteps = async () => {
  return await Steps.findAll();
};

const updateStepsById = async (id, body) => {
  const data = await Steps.findByPk(id);
  return data.update(body);
};

const deleteStepsById = async (id) => {
  return await Steps.destroy({ where: { id } });
};

// =================================================================
// ---------------------------H-E-L-P-E-R---------------------------
// =================================================================

const existStepsId = async (id) => {
  return await Steps.findByPk(id);
};

module.exports = {
  createSteps,
  getAllSteps,
  updateStepsById,
  deleteStepsById,
  existStepsId,
};
