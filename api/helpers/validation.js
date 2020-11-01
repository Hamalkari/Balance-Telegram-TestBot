const Joi = require("joi");

const GET_USER = {
  params: Joi.object().keys({
    telegramId: Joi.string().required(),
  }),
};

const INCREASE_USER_BALANCE = {
  params: Joi.object().keys({
    telegramId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required().greater(0),
  }),
};

const DECREASE_USER_BALANCE = {
  params: Joi.object().keys({
    telegramId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required().greater(0),
  }),
};

module.exports = {
  INCREASE_USER_BALANCE,
  DECREASE_USER_BALANCE,
  GET_USER,
};
