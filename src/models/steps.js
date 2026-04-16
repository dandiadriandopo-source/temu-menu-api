"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Steps.belongsTo(models.Recipes, {
        foreignKey: "recipes_id",
        as: "recipes",
      });
    }
  }
  Steps.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      recipes_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
      },
      step_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      step_image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Steps",
      tableName: "steps",
    },
  );
  return Steps;
};
