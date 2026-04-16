"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Recipes, {
        foreignKey: "user_id",
        as: "recipes",
      });

      User.hasMany(models.Activity, {
        foreignKey: "user_id",
        as: "activity",
      });

      User.hasMany(models.Rate, {
        foreignKey: "user_id",
        as: "rate",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      google_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      profil: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "pelanggan"),
        defaultValue: "pelanggan",
      },
      status_member: {
        type: DataTypes.ENUM("reguler", "premium"),
        defaultValue: "reguler",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    },
  );
  return User;
};
