const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Project = sequelize.define(
	'project',
	{
		id: {
			primaryKey: true,
			type: Sequelize.UUID
		},
		name: {
			type: Sequelize.STRING
		},
		order: {
			type: Sequelize.INTEGER
		}
	},
	{
		tableName: 'project',
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Project;
