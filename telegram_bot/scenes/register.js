const Scene = require("telegraf/scenes/base");

const User = require("../../api/models/user.model");

const registerScene = new Scene("register");

registerScene.enter(async (ctx) => {
  const { id } = ctx.message.from;

  const isUserExists = await User.exists({ id });

  if (isUserExists) return ctx.scene.leave();

  await ctx.reply(
    "Приветсвую вас.\nДля регистрации введите ваше Имя и Фамилию (через пробел):"
  );
});

registerScene.on("text", async (ctx) => {
  const fullName = ctx.message.text.trim();

  const [firstName, lastName] = fullName.split(" ");

  if (!firstName || !lastName) {
    return ctx.reply("Пожалуйста введите Имя и Фамилию в верном формате: ");
  }
  const from = ctx.message.from;

  const userDoc = {
    ...from,
    first_name: firstName,
    last_name: lastName,
  };

  const user = new User(userDoc);

  await user.save();

  ctx.reply("Вы успешно зарегистрированы !");

  ctx.scene.leave();
});

module.exports = registerScene;
