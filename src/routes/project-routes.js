const express = require('express');
const router = express.Router();
const ProjectController = require('../controller/project-controller');
const routes = require('../config/routes');

router.get(routes.projects, ProjectController.findPagination);

router.post(routes.projects, ProjectController.save);

router.post(routes.projects + '/:id', ProjectController.update);

router.delete(routes.projects + '/:id', ProjectController.delete);

module.exports = router;
