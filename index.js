const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const ProjectRoutes = require('./src/routes/project-routes');
const boom = require('express-boom');
const { logger } = require('./src/config/logger');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(boom());
app.use('/api/v1', ProjectRoutes);

app.use((req, res, next) => {
	return res.boom.notFound('Route ' + req.url + ' Not found.');
});

app.use(function(err, req, res, next) {
	logger.error(err.message);
	return res.boom.internal();
});

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

module.exports = app;
