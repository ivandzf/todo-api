const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = sequelize.define(
  "project",
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING
    },
    order: {
      type: Sequelize.INTEGER
    },
    indent: {
      type: Sequelize.INTEGER
    }
  },
  {
    projectName: "project",
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = User;
