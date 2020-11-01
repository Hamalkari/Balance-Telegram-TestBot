const { Telegraf, session, Stage } = require("telegraf");
const { botToken } = require("../config");

const bot = new Telegraf(botToken);

const registerScene = require("./scenes/register");
const checkBalanceScene = require("./scenes/checkBalance");
const withdrawPointsScene = require("./scenes/withdrawPoints");

const stage = new Stage([
  registerScene,
  checkBalanceScene,
  withdrawPointsScene,
]);

bot.use(Telegraf.log());

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.scene.enter("register");
});

bot.hears("Проверить баланс", (ctx) => ctx.scene.enter("check_balance"));
bot.hears("Снять баллы со счета", (ctx) => ctx.scene.enter("withdraw_points"));

bot.startPolling();

module.exports = bot;
