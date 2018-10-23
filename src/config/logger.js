const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(info => {
	let level = info.level.toUpperCase();
	return `${info.timestamp} [${level}] ${info.message}`;
});

const logger = winston.createLogger({
	levels: winston.config.syslog.levels,
	format: combine(timestamp(), myFormat),
	transports: [
		new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'log/combined.log' }),
		new winston.transports.Console()
	]
});

module.exports = { logger, winston };
