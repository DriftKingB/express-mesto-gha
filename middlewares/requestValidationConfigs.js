const { celebrate, Joi } = require('celebrate');

const validationConfig = {
  abortEarly: false,
  errors: { wrap: { label: false } },
  messages: {
    'any.required': '{#label}: поле - обязательно',
    'string.empty': '{#label}: поле не может быть пустым',
    'string.pattern.base': '{#label}: некорректный формат',
    'string.min': '{#label}: поле слишком короткое (минимум - {#limit} символа)',
    'string.max': '{#label}: поле слишком длинное (максимум - {#limit} символов)',
    'string.email': '{#label}: некорректный формат почты',
  },
};

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(w{3}.)?[\w\W]{1,}#?$/),
  }),
}, validationConfig);

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30)
      .default('Исследователь'),
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}.)?[\w\W]{1,}#?$/)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, validationConfig);

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}.)?[\w\W]{1,}#?$/),
  }),
}, validationConfig);

const validateCardParams = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}, {
  messages: { '*': 'Указан некорректный id' },
});

const validateUserParams = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}, {
  messages: { '*': 'Указан некорректный id' },
});

module.exports = {
  validateCard,
  validateUser,
  validateUserInfo,
  validateCardParams,
  validateUserParams,
};
