const express = require("express");
const router = express.Router();

const {
  INCREASE_USER_BALANCE,
  DECREASE_USER_BALANCE,
  GET_USER,
} = require("../helpers/validation");
const { validate } = require("../helpers/middlewares");

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:telegramId", validate(GET_USER), userController.getUser);

router.post(
  "/:telegramId/balance/increase",
  validate(INCREASE_USER_BALANCE),
  userController.increaseUserBalance
);
router.post(
  "/:telegramId/balance/decrease",
  validate(DECREASE_USER_BALANCE),
  userController.decreaseUserBalance
);

module.exports = router;
