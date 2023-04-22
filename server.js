const express = require("express");
const db = require("./config/connection");
const routes = require("./controller");
const morgan = require("morgan");

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(logger);
app.use(express.json());
app.use(morgan("combined"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});
