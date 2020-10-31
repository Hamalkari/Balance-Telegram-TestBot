const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: {
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
    username: {
      type: String,
      required: true,
      unique: true,
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

  return user.balance > amount;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
