const { celebrate, Joi } = require('celebrate');

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(w{3}.)?[\w\W]{1,}#?$/),
  }),
}, {
  abortEarly: false,
  messages: {
    'any.required': '{#label}: поле - обязательно',
    'string.empty': '{#label}: поле не может быть пустым',
    'string.pattern.base': '{#label}: некорректный формат',
    'string.min': '{#label}: поле слишком короткое (минимум - {#limit} символа)',
    'string.max': '{#label}: поле слишком длинное (максимум - {#limit} символов)',
    '*': '{#label}: поле - лишнее',
  },
  errors: {
    wrap: { label: false },
  },
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30)
      .default('Исследователь океана'),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.min': '{#label}: поле слишком короткое (минимум - {#limit} символа)',
    'string.max': '{#label}: поле слишком длинное (максимум - {#limit} символов)',
    'string.empty': '{#label}: поле не может быть пустым',
    '*': '{#label}: поле - лишнее',
  },
  errors: {
    wrap: { label: false },
  },
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}.)?[\w\W]{1,}#?$/)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.pattern.base': '{#label}: некорректный формат',
    'string.empty': '{#label}: поле не может быть пустым',
    '*': '{#label}: поле - лишнее',
  },
  errors: {
    wrap: { label: false },
  },
});

const validateUserCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, {
  abortEarly: false,
  messages: {
    'any.required': '{#label}: поле - обязательно',
    'string.empty': '{#label}: поле не может быть пустым',
    'string.email': '{#label}: некорректный формат почты',
    '*': '{#label}: поле - лишнее',
  },
  errors: {
    wrap: { label: false },
  },
});

const validateCardParams = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}, {
  messages: {
    '*': 'Указан некорректный id',
  },
});

const validateUserParams = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}, {
  messages: {
    '*': 'Указан некорректный id',
  },
});

module.exports = {
  validateCard,
  validateUserInfo,
  validateUserAvatar,
  validateUserCredentials,
  validateCardParams,
  validateUserParams,
};
