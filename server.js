const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/connection");
const routes = require("./controller");
const morgan = require("morgan");

const app = express();

app.use(routes);
app.use(express.json());
app.use(morgan("combined"));

const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}!`);
  });
});
