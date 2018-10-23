const sequelize = require('../config/database');
const ProjectModel = require('../models/project-model');
const uuid = require('uuid/v1');
const logger = require('../config/logger').logger;

exports.findAll = (req, res) => {
	ProjectModel.findAll()
		.then(projects => {
			res.json(projects);
		})
		.catch(err => {
			logger.error(err.message);
			res.boom.internal();
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
	if (!req.body.order) {
		fields.push({
			column: 'Order',
			message: 'Order cannot be empty'
		});
	}

	if (fields.length > 0) {
		return res.boom.badRequest('Bad Request', { info: fields });
	}

	sequelize.transaction(t => {
		return ProjectModel.create(
			{
				id: uuid(),
				name: req.body.name,
				order: req.body.order
			},
			{
				transaction: t
			}
		)
			.then(project => {
				res.status(201).send();
			})
			.catch(err => {
				logger.error(err.message);
				res.boom.internal();
			});
	});
};

exports.update = (req, res) => {
	if (!req.params.id) {
		res.status(400).send({
			column: 'name',
			message: 'Id cannot be empty'
		});
	}

	ProjectModel.findOne({
		where: { id: req.params.id }
	}).then(project => {
		logger.error(err.message);
		res.json(project);
	});
};
