"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rate.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Rate.belongsTo(models.Recipes, {
        foreignKey: "recipes_id",
        as: "recipes",
      });
    }
  }
  Rate.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      recipes_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
      },
      score: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Rate",
      tableName: "rate",
    },
  );
  return Rate;
};
