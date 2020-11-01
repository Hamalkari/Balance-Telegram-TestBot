const plural = require("plural-ru");
const User = require("../models/user.model");

async function printUserBalance(ctx) {
  const { id: telegramId } = ctx.message.from;

  const { balance } = await User.findOne({ telegram_id: telegramId });

  await ctx.replyWithMarkdown(
    `Ваш текущий баланс: *${plural(
      balance,
      "%d балл",
      "%d балла",
      "%d баллов"
    )}*`
  );
}

module.exports = {
  printUserBalance,
};
