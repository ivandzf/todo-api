const convict = require('convict');

const config = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	db: {
		host: {
			doc: 'Database host name/IP',
			format: String,
			default: 'localhost',
			env: 'DB_HOST',
		},
		name: {
			doc: 'Database name',
			format: String,
			default: 'todos',
			env: 'DB_NAME',
		},
		username: {
			doc: 'Database username',
			format: String,
			default: '',
			env: 'DB_USERNAME',
		},
		password: {
			doc: 'Database password',
			format: String,
			default: '',
			env: 'DB_PASSWORD',
		}
	}
});

const env = config.get('env');
config.loadFile('./src/config/env/'+env+'.json');

config.validate({ allowed: 'strict' });

module.exports = config;
