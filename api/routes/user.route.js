const express = require("express");
const router = express.Router();

const { INCREASE_USER_BALANCE, GET_USER } = require("../helpers/validation");
const { validate } = require("../helpers/middlewares");

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:id", validate(GET_USER), userController.getUser);

router.post(
  "/:id/balance/increase",
  validate(INCREASE_USER_BALANCE),
  userController.increaseUserBalance
);

module.exports = router;
