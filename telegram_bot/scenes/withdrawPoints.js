const Scene = require("telegraf/scenes/base");
const User = require("../../models/user.model");

const { printUserBalance } = require("../utils");

const scene = new Scene("withdraw_points");

const menu = {
  "Проверить баланс": "check_balance",
  "Снять баллы со счета": "withdraw_points",
};

scene.enter(async (ctx) => {
  await printUserBalance(ctx);

  ctx.reply("Сколько баллов вы хотите снять ? ");
});

scene.on("message", async (ctx) => {
  const text = ctx.message.text;

  if (!text) {
    return ctx.replyWithMarkdown("*Ошибка !* Введите число больше нуля");
  }

  if (Object.keys(menu).includes(text)) {
    return ctx.scene.enter(menu[text]);
  }

  const amount = Number(text);

  if (isNaN(amount) || amount < 0) {
    return ctx.replyWithMarkdown("*Ошибка !* Введите число больше нуля.");
  }

  const user = await User.findOne({ telegram_id: ctx.message.from.id });

  if (!user.isEnoughBalanceToWithdraw(amount)) {
    await ctx.reply("У вас недостаточно средств для снятия !");

    return ctx.scene.leave();
  }

  user.balance -= amount;

  await user.save();

  await printUserBalance(ctx);

  ctx.scene.leave();
});

module.exports = scene;
