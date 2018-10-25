const config = require('../../config');
const Sequelize = require('sequelize');
const dateFormat = require('../helper/date-format');
const sequelize = new Sequelize(
    config.get('db.name'),
    config.get('db.username'),
    config.get('db.password'),
    {
        host: config.get('db.host'),
        dialect: 'postgres',
        operatorsAliases: false,
        logging: false,
        omitNull: true,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: true
        },
        timezone: dateFormat.timezone,
        define: {
            rejectOnEmpty: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        benchmark: true
    }
);

module.exports = sequelize;
