const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const Tasks = require('../models/tasks-model');
const logger = require('../config/logger').logger;

exports.findPagination = (req, res) => {
    const limit = 10;
    let offset = req.query.page == undefined ? 0 : (req.query.page - 1) * limit;
    if (!/^\d+$/.test(offset)) {
        return res.boom.badRequest('Page is not valid').send;
    }

    Tasks.findAndCountAll({
        attributes: [
            'id',
            'content',
            'isCompleted',
            'position',
            'projectId',
            'createdAt',
            'updatedAt'
        ],
        order: [['position', 'ASC']]
    })
        .then(tasks => {
            return res.json({
                data: tasks.rows,
                meta: {
                    totalRow: tasks.count,
                    current: offset === 0 ? 'page=1' : 'page=' + req.query.page,
                    prev:
                        offset === 0
                            ? ''
                            : 'page=' + (parseInt(req.query.page) - 1),
                    next:
                        offset + limit > tasks.count
                            ? ''
                            : 'page=' +
                              (offset === 0 ? 2 : parseInt(req.query.page) + 1)
                }
            });
        })
        .catch(Sequelize.EmptyResultError, err => {
            return res.json([]);
        })
        .catch(error => {
            logger.error(err);
            return res.boom.internal();
        });
};

exports.save = (req, res) => {
    let fields = [];

    if (!req.body.content) {
        fields.push({
            column: 'content',
            message: 'Content cannot be empty'
        });
    }

    if (!req.body.projectId) {
        fields.push({
            column: 'projectId',
            message: 'Project Id cannot be empty'
        });
    }

    if (fields.length > 0) {
        return res.boom.badRequest('Bad Request', { attribute: fields });
    }

    Tasks.count().then(count => {
        sequelize.transaction(t => {
            return Tasks.create(
                {
                    content: req.body.content,
                    position: count + 1,
                    projectId: req.body.projectId
                },
                { transaction: t }
            )
                .then(project => {
                    return res.status(201).json(project);
                })
                .catch(Sequelize.ForeignKeyConstraintError, err => {
                    return res.boom.badRequest('Project Id not found');
                })
                .catch(err => {
                    logger.error(err);
                    return res.boom.internal();
                });
        });
    });
};
