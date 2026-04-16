"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipes.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Recipes.hasMany(models.Steps, {
        foreignKey: "recipes_id",
        as: "steps",
      });
    }
  }
  Recipes.init(
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
      title: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("eropa", "asia", "timur", "amerika"),
      },
      cook_time: {
        type: DataTypes.INTEGER,
      },
      is_premium: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Recipes",
      tableName: "recipes",
    },
  );
  return Recipes;
};
