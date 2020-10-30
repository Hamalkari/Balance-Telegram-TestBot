const httpStatus = require("http-status");
const ApiError = require("../helpers/ApiError");
const User = require("../models/user.model");

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});

    res.status(httpStatus.OK).send(users);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Пользователя с таким id не найдено"
      );
    }

    res.status(httpStatus.OK).send(user);
  } catch (error) {
    next(error);
  }
}

async function increaseUserBalance(req, res, next) {
  try {
    const id = req.params.id;
    const { amount } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Пользователя с таким id не найдено"
      );
    }

    user.balance += amount;

    await user.save();

    res.status(httpStatus.OK).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  increaseUserBalance,
};
