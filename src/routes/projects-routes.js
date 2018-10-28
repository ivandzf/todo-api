const express = require('express');
const router = express.Router();
const ProjectController = require('../controller/projects-controller');
const projectsPath = '/api/v1/projects';

router.get(projectsPath, ProjectController.findPagination);

router.get(projectsPath + '/:id', ProjectController.findById);

router.post(projectsPath, ProjectController.save);

router.post(projectsPath + '/:id', ProjectController.update);

router.delete(projectsPath + '/:id', ProjectController.delete);

module.exports = router;
