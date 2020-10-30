const express = require("express");
const router = express.Router();

const {} = require("../helpers/validation");
const { validate } = require("../helpers/middlewares");

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

module.exports = router;
