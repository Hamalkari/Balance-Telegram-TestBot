const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    telegram_id: {
      type: Number,
      required: true,
      unique: true,
    },
    is_bot: {
      type: Boolean,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    language_code: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.methods.isEnoughBalanceToWithdraw = function (amount) {
  const user = this;

  return user.balance >= amount;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
