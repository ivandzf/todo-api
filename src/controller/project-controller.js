const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const ProjectModel = require('../models/project-model');
const logger = require('../config/logger').logger;

exports.findPagination = (req, res) => {
    const limit = 10;
    let offset = req.query.page == undefined ? 0 : (req.query.page - 1) * limit;
    if (!/^\d+$/.test(offset)) {
        return res.boom.badRequest('Page is not valid').send;
    }

    ProjectModel.findAndCountAll({
        attributes: [
            'id',
            'name',
            'order',
            'isClosed',
            'createdAt',
            'updatedAt'
        ],
        order: [['order', 'ASC']],
        limit: limit,
        offset: offset
    })
        .then(projects => {
            return res.json({
                data: projects.rows,
                meta: {
                    current: offset === 0 ? 'page=1' : 'page=' + req.query.page,
                    prev:
                        offset === 0
                            ? ''
                            : 'page=' + (parseInt(req.query.page) - 1),
                    next:
                        offset + limit > projects.count
                            ? ''
                            : 'page=' +
                              (offset === 0 ? 2 : parseInt(req.query.page) + 1)
                }
            });
        })
        .catch(Sequelize.EmptyResultError, err => {
            return res.json([]);
        })
        .catch(err => {
            logger.error(err);
            return res.boom.internal();
        });
};

exports.save = (req, res) => {
    let fields = [];

    if (!req.body.name) {
        fields.push({
            column: 'name',
            message: 'Name cannot be empty'
        });
    }

    if (fields.length > 0) {
        return res.boom.badRequest('Bad Request', { attribute: fields });
    }

    ProjectModel.count().then(count => {
        sequelize.transaction(t => {
            return ProjectModel.create(
                {
                    name: req.body.name,
                    order: count + 1
                },
                { transaction: t }
            )
                .then(project => {
                    return res.status(201).json(project);
                })
                .catch(err => {
                    logger.error(err);
                    return res.boom.internal();
                });
        });
    });
};

exports.update = (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
        return res.boom.badRequest('Id must valid');
    }

    ProjectModel.findOne({
        where: { id: req.params.id },
        rejectOnEmpty: true
    })
        .then(project => {
            sequelize.transaction(t => {
                return ProjectModel.update(
                    { name: req.body.name, isClosed: req.body.isClosed },
                    { where: { id: req.params.id }, transaction: t }
                )
                    .then(() => {
                        return res.status(204).send();
                    })
                    .catch(err => {
                        logger.error(err);
                        return res.boom.internal();
                    });
            });
        })
        .catch(Sequelize.EmptyResultError, err => {
            return res.boom.notFound('Resource Not Found');
        })
        .catch(err => {
            logger.error(err);
            return res.boom.internal();
        });
};

exports.delete = (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
        return res.boom.badRequest('Id must valid');
    }

    ProjectModel.findOne({
        where: { id: req.params.id },
        rejectOnEmpty: true
    })
        .then(project => {
            sequelize.transaction(t => {
                return ProjectModel.destroy({
                    where: { id: req.params.id },
                    transaction: t
                })
                    .then(() => {
                        return res.status(204).send();
                    })
                    .catch(err => {
                        logger.error(err);
                        return res.boom.internal();
                    });
            });
        })
        .catch(Sequelize.EmptyResultError, err => {
            return res.boom.notFound('Resource Not Found');
        })
        .catch(err => {
            logger.error(err);
            return res.boom.internal();
        });
};
