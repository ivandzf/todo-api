const sequelize = require("../config/database");
const UserModel = require("../models/project-model");
const uuid = require("uuid/v1");

exports.findAll = (req, res) => {
  UserModel.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(e => {
      res.status(500).send({
        message: "Error retrieving all projects"
      });
    });
};

exports.save = (req, res) => {
  let badRequest = [];

  if (!req.body.name) {
    badRequest.push({
      column: "name",
      message: "Name cannot be empty"
    });
  }
  if (!req.body.order) {
    badRequest.push({
      column: "Order",
      message: "Order cannot be empty"
    });
  }
  if (!req.body.indent) {
    badRequest.push({
      column: "Indent",
      message: "Indent cannot be empty"
    });
  }

  if (badRequest.length > 0) {
    return res.status(400).send(badRequest);
  }

  sequelize.transaction(t => {
    return UserModel.create(
      {
        id: uuid(),
        name: req.body.name,
        order: req.body.order,
        indent: req.body.indent
      },
      { transaction: t }
    )
      .then(user => {
        res.status(201).send();
      })
      .catch(err => {
          console.log(err)
        res.status(500).send({
          message: "Cannot save project"
        });
      });
  });
};
