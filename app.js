const express = require("express");
const logger = require("morgan");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

const ApiError = require("./api/helpers/ApiError");
const { errorConverter, errorHandler } = require("./api/helpers/middlewares");
const apiRoutes = require("./api/routes");

const { port, mongo_uri } = require("./config");

require("./telegram_bot");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb successfully connected");
  })
  .catch((err) => {
    console.log("Can't connect to MongoDb. Reason - " + err.message);
  });

app.use("/api", apiRoutes);

// Errors hanlder
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening server on port - ${port}`);
});
