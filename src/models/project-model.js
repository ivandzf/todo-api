const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Project = sequelize.define(
	'project',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		order: {
			type: Sequelize.INTEGER
		},
		isClose: {
			type: Sequelize.BOOLEAN,
			field: 'isclose'
		}
	},
	{
		tableName: 'project',
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Project;
