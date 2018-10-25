const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const ProjectModel = require('../models/project-model');
const logger = require('../config/logger').logger;

exports.findAll = (req, res) => {
	ProjectModel.findAll({
		attributes: ['id', 'name', 'order', 'isClose', 'createdAt', 'updatedAt'],
		order: [['order', 'ASC']]
	})
		.then(projects => {
			return res.json(projects);
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
					return res.status(201).send();
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
					{ name: req.body.name, isClose: req.body.isClose },
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
