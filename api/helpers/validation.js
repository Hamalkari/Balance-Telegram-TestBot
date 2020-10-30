const Joi = require("joi");

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message(
      '"{{#label}}" должно быть валидным mongodbId значением'
    );
  }
  return value;
};

const GET_USER = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const INCREASE_USER_BALANCE = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required().greater(0),
  }),
};

module.exports = {
  INCREASE_USER_BALANCE,
  GET_USER,
};
