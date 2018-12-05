const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const dateFormat = require('../helper/date-format');
const Projects = sequelize.define(
    'tasks',
    {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            field: 'iscompleted'
        },
        position: {
            type: Sequelize.INTEGER,
        },
        projectId: {
            type: Sequelize.INTEGER,
            field: 'project_id'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
            get: function () {
                const date = this.getDataValue('updatedAt');
                return dateFormat.humanFormat(date);
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
            get: function () {
                const date = this.getDataValue('createdAt');
                return dateFormat.humanFormat(date);
            }
        }
    },
    {
        tableName: 'tasks',
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = Projects;
