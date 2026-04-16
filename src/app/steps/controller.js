const path = require("path");
const fs = require("fs");

const { resSuccess, resFailed } = require("../../shared/helpers/payload");
const {
  createSteps,
  getAllSteps,
  existStepsId,
  updateStepsById,
  deleteStepsById,
} = require("./service");

const createNewSteps = async (req, res) => {
  try {
    const { recipes_id, step_number, instruction } = req.body;

    let step_image = null;
    if (req.file) {
      step_image = req.file.path.split("/")[10];
    }

    const body = {
      recipes_id,
      step_number,
      instruction,
      step_image,
    };

    const data = await createSteps(body);
    return resSuccess(res, 201, "success", "Step berhasil diupload", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const findAllSteps = async (req, res) => {
  try {
    const data = await getAllSteps();
    return resSuccess(
      res,
      200,
      "success",
      "Data step berhasil didapatkan",
      data,
    );
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const editStepById = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipes_id, step_number, instruction } = req.body;

    let step_image = null;
    if (req.file) {
      step_image = req.file.path.split("/")[10];
    }

    const isStepsExist = await existStepsId(id);
    if (!isStepsExist || isStepsExist === null) {
      return resFailed(res, 404, "error", "Data resep tidak ditemukan");
    }

    if (step_image) {
      if (isStepsExist.step_image) {
        const filePath = path.join(
          process.cwd(),
          "src",
          "upload",
          isStepsExist.step_image,
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } else {
      step_image = isStepsExist.step_image;
    }

    const body = {
      recipes_id,
      step_number,
      instruction,
      step_image,
    };

    const data = await updateStepsById(id, body);
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

const dropStepById = async (req, res) => {
  try {
    const { id } = req.params;

    const isStepsExist = await existStepsId(id);

    if (!isStepsExist || isStepsExist === null) {
      return resFailed(res, 404, "error", "Data resep tidak ditemukan");
    }

    if (isStepsExist.step_image) {
      const filePath = path.join(
        process.cwd(),
        "src",
        "upload",
        isStepsExist.step_image,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const data = await deleteStepsById(id);
    return resSuccess(res, 200, "success", "Step berhasil dihapus", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  createNewSteps,
  findAllSteps,
  editStepById,
  dropStepById,
};
