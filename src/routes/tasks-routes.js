const express = require('express');
const router = express.Router();
const TasksController = require('../controller/tasks-controller');
const path = '/api/v1/tasks';

router.get(path, TasksController.findPagination);

router.post(path, TasksController.save);

module.exports = router;
