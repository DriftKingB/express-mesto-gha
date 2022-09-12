const errorMessageTranslations = require('./errorMessageTranslations');

module.exports = function errorHandler(err, res) {
  let ERROR_CODE = 500;
  let errorMessage = 'Неизвестная ошибка';

  if (err.name === 'ValidationErrors') {
    ERROR_CODE = 400;
    errorMessage = {};

    Object.values(err.errors).forEach((error) => {
      if (errorMessageTranslations[error.kind]) {
        errorMessage[error.path] = errorMessageTranslations[error.kind];
        return;
      }
      errorMessage[error.path] = 'Неизвестная ошибка валидации';
    });
  } else if (err.name === 'NotFoundError') {
    ERROR_CODE = err.statusCode;
    errorMessage = err.message;
  }

  res.status(ERROR_CODE).send({ message: errorMessage });
};
