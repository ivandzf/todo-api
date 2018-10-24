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
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: 'updated_at',
			defaultValue: Sequelize.NOW
		},
		createdAt: {
			type: Sequelize.DATE,
			field: 'created_at',
			defaultValue: Sequelize.NOW
		}
	},
	{
		tableName: 'project',
		freezeTableName: true,
		timestamps: true,
	}
);

module.exports = Project;
