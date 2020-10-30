const httpStatus = require("http-status");
const ApiError = require("../helpers/ApiError");
const mongoose = require("mongoose");
const User = require("../models/user.model");

async function getUsers(req, res) {
  const users = await User.find({});

  res.status(httpStatus.OK).send(users);
}

async function getUser(req, res, next) {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidId) {
    return next(new ApiError(httpStatus.BAD_REQUEST, "Инвалидное значение id"));
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Пользователя с таким id не найдено"
    );
  }

  res.status(httpStatus.OK).send(user);
}

module.exports = {
  getUsers,
  getUser,
};
