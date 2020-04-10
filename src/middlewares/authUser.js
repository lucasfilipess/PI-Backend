const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  registerSchema:
    Joi.object().keys({
      address: Joi.string().required(),
      cep: Joi.string().required(),
      city: Joi.string().required(),
      description: Joi.string(),
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      neighborhood: Joi.string().required(),
      password: Joi.string().required().min(1),
      uf: Joi.string().required().length(2),
      whatsapp: Joi.string().required().min(11).max(16)
    }),

  loginSchema:
    Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(1),
    })
}







