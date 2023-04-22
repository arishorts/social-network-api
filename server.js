const mongoose = require("mongoose");
const express = require("express");
const routes = require("./controller");
const morgan = require("morgan");

const app = express();

app.use(routes);
app.use(express.json());
app.use(morgan("combined"));

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(console.log("connected to MongoDB"))
  .catch((err) => {
    console.log("Error: ", err);
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
