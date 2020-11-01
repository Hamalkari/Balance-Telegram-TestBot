const Scene = require("telegraf/scenes/base");
const { printUserBalance } = require("../utils");

const scene = new Scene("check_balance");

scene.enter(async (ctx) => {
  await printUserBalance(ctx);

  ctx.scene.leave();
});

module.exports = scene;
