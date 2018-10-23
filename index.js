const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();
const ProjectRoutes = require("./src/routes/project-routes");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(logger("dev"));

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode).send(err);
  } else {
    next();
  }
});

app.use("/api/v1", ProjectRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
