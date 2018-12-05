const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const dateFormat = require('../helper/date-format');
const Projects = sequelize.define(
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
        position: {
            type: Sequelize.INTEGER,
            field: 'position'
        },
        isClosed: {
            type: Sequelize.BOOLEAN,
            field: 'isclosed'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at',
            get: function() {
                const date = this.getDataValue('updatedAt');
                return dateFormat.humanFormat(date);
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at',
            get: function() {
                const date = this.getDataValue('createdAt');
                return dateFormat.humanFormat(date);
            }
        }
    },
    {
        tableName: 'project',
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = Projects;
