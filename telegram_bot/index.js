const { Telegraf, session, Stage } = require("telegraf");
const { botToken } = require("../config");

const bot = new Telegraf(botToken);

const registerScene = require("./scenes/register");

const stage = new Stage([registerScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter("register"));

bot.launch();

module.exports = bot;
