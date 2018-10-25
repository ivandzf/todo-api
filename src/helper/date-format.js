const moment = require('moment-timezone');
const timezone = 'Asia/Jakarta';

humanFormat = date => {
  return moment
    .utc(date)
    .tz(timezone)
    .format('DD/MM/YYYY HH:mm:ss');
};

module.exports = { timezone, humanFormat };
