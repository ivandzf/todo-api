const express = require("express");
const router = express.Router();
const ProjectController = require("../controller/project-controller");
const path = "/project";

router.get(path, ProjectController.findAll);

router.post(path, ProjectController.save);

module.exports = router;
