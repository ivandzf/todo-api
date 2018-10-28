const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const dateFormat = require('../helper/date-format');
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

module.exports = Project;
