const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectTimeout: 10000,
  },
  logging: false,
});

console.log("MYSQL_URL:", process.env.MYSQL_URL);
module.exports = sequelize;
