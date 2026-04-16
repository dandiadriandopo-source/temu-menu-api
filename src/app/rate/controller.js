const { resSuccess, resFailed } = require("../../shared/helpers/payload");
const { createRate, getAllRate } = require("./service");

const Addrating = async (req, res) => {
  try {
    const { user_id, recipes_id, score } = req.body;
    const body = { user_id, recipes_id, score };

    const data = await createRate(body);
    return resSuccess(res, 201, "success", "Berhasil memberikan rate", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findAllRate = async (req, res) => {
  try {
    const data = await getAllRate();
    return resSuccess(
      res,
      200,
      "success",
      "Data rate berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  Addrating,
  findAllRate,
};
