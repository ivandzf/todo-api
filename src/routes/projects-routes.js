const express = require('express');
const router = express.Router();
const ProjectController = require('../controller/projects-controller');
const path = '/api/v1/projects';

router.get(path, ProjectController.findPagination);

router.get(path + '/:id', ProjectController.findById);

router.post(path, ProjectController.save);

router.post(path + '/:id', ProjectController.update);

router.delete(path + '/:id', ProjectController.delete);

module.exports = router;
