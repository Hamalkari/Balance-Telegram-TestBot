require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  botToken: process.env.BOT_TOKEN,
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI,
};
