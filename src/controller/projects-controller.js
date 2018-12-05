const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const Projects = require('../models/projects-model');
const logger = require('../config/logger').logger;

exports.findPagination = (req, res) => {
    const limit = 10;
    let offset = req.query.page == undefined ? 0 : (req.query.page - 1) * limit;
    if (!/^\d+$/.test(offset)) {
        return res.boom.badRequest('Page is not valid').send;
    }

    Projects.findAndCountAll({
        attributes: [
            'id',
            'name',
            'position',
            'isClosed',
            'createdAt',
            'updatedAt'
        ],
        order: [['position', 'ASC']],
        limit: limit,
        offset: offset
    })
        .then(project => {
            return res.json({
                data: project.rows,
                meta: {
                    totalRow: project.count,
                    current: offset === 0 ? 'page=1' : 'page=' + req.query.page,
                    prev:
                        offset === 0
                            ? ''
                            : 'page=' + (parseInt(req.query.page) - 1),
                    next:
                        offset + limit > project.count
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

exports.findById = (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
        return res.boom.badRequest('Id must valid');
    }

    Projects.findByPk(req.params.id)
        .then(project => {
            return res.json(project);
        })
        .catch(Sequelize.EmptyResultError, err => {
            return res.boom.notFound('Resource Not Found');
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

    if (!req.body.position) {
        fields.push({
            column: 'position',
            message: 'Position cannot be empty'
        });
    }

    if (fields.length > 0) {
        return res.boom.badRequest('Bad Request', { attribute: fields });
    }

    Projects.count().then(count => {
        sequelize.transaction(t => {
            return Projects.create(
                {
                    name: req.body.name,
                    position: count + 1
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

    Projects.findOne({
        where: { id: req.params.id },
        rejectOnEmpty: true
    })
        .then(project => {
            sequelize.transaction(t => {
                return Projects.update(
                    { name: req.body.name, isClosed: req.body.isClosed },
                    {
                        where: { id: req.params.id },
                        plain: true,
                        returning: true,
                        transaction: t
                    }
                )
                    .then(p => {
                        return res.json(p[1]);
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

    Projects.findOne({
        where: { id: req.params.id },
        rejectOnEmpty: true
    })
        .then(project => {
            sequelize.transaction(t => {
                return Projects.destroy({
                    where: { id: req.params.id },
                    transaction: t
                })
                    .then(() => {
                        return res.json(project);
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
