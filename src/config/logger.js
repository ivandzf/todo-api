const winston = require('winston');
const { combine, label, printf } = winston.format;
const dateFormat = require('../helper/date-format');

const myFormat = printf(info => {
  let level = info.level.toUpperCase();
  return `${dateFormat.humanFormat(new Date())} [${level}] ${info.message}`;
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(myFormat),
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' }),
    new winston.transports.Console()
  ]
});

module.exports = { logger, winston };
