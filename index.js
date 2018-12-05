const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ProjectRoutes = require('./src/routes/projects-routes');
const TasksRoutes = require('./src/routes/tasks-routes');
const boom = require('express-boom');
const { logger } = require('./src/config/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(boom());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(ProjectRoutes);
app.use(TasksRoutes);

app.disable('x-powered-by');

app.use((req, res, next) => {
    return res.boom.notFound('Route Not found');
});

app.use(function(err, req, res, next) {
    logger.error(err.message);
    return res.boom.internal();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

module.exports = app;
