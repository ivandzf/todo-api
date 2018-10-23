const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	process.env.NODE_ENV == 'production' ? 'kqwjvoyv' : 'todos',
	process.env.NODE_ENV == 'production' ? 'kqwjvoyv' : '',
	process.env.NODE_ENV == 'production'
		? 'yMsmCDMj4Lx8aD80psg215kgpdGpcRbp'
		: '',
	{
		host: process.env.NODE_ENV == 'production' ? 'elmer.db.elephantsql.com' : 'localhost',
		dialect: 'postgres',
		operatorsAliases: false,
		logging: false,
		define: {
			rejectOnEmpty: true
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	}
);

module.exports = sequelize;
