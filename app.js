const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const apiRoutes = require("./api/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRoutes);

module.exports = app;
