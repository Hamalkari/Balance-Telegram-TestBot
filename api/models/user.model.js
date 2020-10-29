const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  telegram_id: {
    type: Number,
    unique: true,
    required: true,
  },
  is_bot: {
    type: Boolean,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  language_code: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
