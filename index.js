const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode).send(err);
  } else {
    next();
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;