const WizardScene = require("telegraf/scenes/wizard");
const Markup = require("telegraf/markup");

const User = require("../../models/user.model");

const menu = Markup.keyboard(["Проверить баланс", "Снять баллы со счета"])
  .resize()
  .extra();

const scene = new WizardScene(
  "register",
  async (ctx) => {
    const { id } = ctx.message.from;

    await User.findOneAndDelete({ telegram_id: id });

    await ctx.reply(
      "Добро пожаловать ✋\nКакого ваше Имя ?",
      Markup.removeKeyboard().extra()
    );

    return ctx.wizard.next();
  },
  async (ctx) => {
    const text = ctx.message.text;

    if (!text) return ctx.reply("Вы ввели не текст !");

    ctx.wizard.state.firstName = text.trim();

    await ctx.reply("Какая у вас фамилия ?");

    return ctx.wizard.next();
  },
  async (ctx) => {
    const text = ctx.message.text;

    if (!text) return ctx.reply("Вы ввели не текст !");

    ctx.wizard.state.lastName = text.trim();

    const { firstName, lastName } = ctx.wizard.state;
    const telegramInfo = ctx.message.from;

    const userDoc = {
      telegram_id: telegramInfo["id"],
      is_bot: telegramInfo["is_bot"],
      first_name: firstName,
      last_name: lastName,
      username: telegramInfo["username"],
      language_code: telegramInfo["language_code"],
    };

    const user = new User(userDoc);
    await user.save();

    await ctx.replyWithMarkdown(
      `Регистрация завершена !\n\nВаше имя: *${firstName}*\nВаша фамилия: *${lastName}*`,
      menu
    );

    return ctx.scene.leave();
  }
);

module.exports = scene;
