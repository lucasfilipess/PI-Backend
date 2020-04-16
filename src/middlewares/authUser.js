const { Joi } = require('celebrate');

module.exports = {
  registerSchema: Joi.object().keys({
    address: Joi.string().required(),
    cep: Joi.string().required(),
    city: Joi.string().required(),
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    neighborhood: Joi.string().required(),
    password: Joi.string().required().min(1),
    uf: Joi.string().required().length(2),
    whatsapp: Joi.string().required().min(10).max(11),
  }),

  loginSchema: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),
};
