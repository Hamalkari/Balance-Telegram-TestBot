const plural = require("plural-ru");
const httpStatus = require("http-status");
const ApiError = require("../helpers/ApiError");
const User = require("../../models/user.model");
const catchAsync = require("../helpers/catchAsync");

const bot = require("../../telegram_bot/index");

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find({});

  res.status(httpStatus.OK).send(users);
});

const getUser = catchAsync(async (req, res) => {
  const { telegramId } = req.params;

  const user = await User.findOne({ telegram_id: telegramId });

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Пользователя с таким id не найдено"
    );
  }

  res.status(httpStatus.OK).send(user);
});

const increaseUserBalance = catchAsync(async (req, res) => {
  const { telegramId } = req.params;
  const { amount } = req.body;

  const user = await User.findOne({ telegram_id: telegramId });

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Пользователя с таким id не найдено"
    );
  }

  user.balance += amount;

  await user.save();

  bot.telegram.sendMessage(
    telegramId,
    `Ваш баланс был пополнен на *${plural(
      amount,
      "%d балл",
      "%d балла",
      "%d баллов"
    )}*`,
    {
      parse_mode: "Markdown",
    }
  );

  res.status(httpStatus.OK).send();
});

const decreaseUserBalance = catchAsync(async (req, res) => {
  const { telegramId } = req.params;

  const { amount } = req.body;

  const user = await User.findOne({ telegram_id: telegramId });

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Пользователя с таким id не найдено"
    );
  }

  if (!user.isEnoughBalanceToWithdraw(amount)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Недостаточно средств на балансе для снятия баллов со счета"
    );
  }

  user.balance -= amount;

  await user.save();

  bot.telegram.sendMessage(
    telegramId,
    `Ваш баланс был уменьшен на *${plural(
      amount,
      "%d балл",
      "%d балла",
      "%d баллов"
    )}*`,
    {
      parse_mode: "Markdown",
    }
  );

  res.status(httpStatus.OK).send();
});

module.exports = {
  getUsers,
  getUser,
  increaseUserBalance,
  decreaseUserBalance,
};
