const { Rate } = require("../../models");

const createRate = async (body) => {
  return await Rate.create(body);
};

const getAllRate = async () => {
  return await Rate.findAll();
};

const existRateId = async (id) => {
  return await Rate.findByPk(id);
};

module.exports = {
  createRate,
  getAllRate,
  existRateId,
};
