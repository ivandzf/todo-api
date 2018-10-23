const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "kqwjvoyv",
  "kqwjvoyv",
  "yMsmCDMj4Lx8aD80psg215kgpdGpcRbp",
  {
    host: "elmer.db.elephantsql.com",
    dialect: "postgres",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
