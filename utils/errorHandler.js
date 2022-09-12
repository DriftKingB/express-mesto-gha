const errorMessageTranslations = require('./errorMessageTranslations');

module.exports = function errorHandler(err, res) {
  let ERROR_CODE = 500;
  let errorMessage = 'Неизвестная ошибка';

  if (err.name === 'ValidationError') {
    ERROR_CODE = 400;
    errorMessage = '';

    Object.values(err.errors).forEach((error) => {
      if (errorMessageTranslations[error.kind]) {
        errorMessage = `${errorMessage}${error.path}: ${errorMessageTranslations[error.kind]}; `;
        return;
      }
      errorMessage[error.path] = 'Неизвестная ошибка валидации';
    });
  } else if (err.name === 'NotFoundError') {
    ERROR_CODE = err.statusCode;
    errorMessage = err.message;
  } else if (err.name === 'CastError') {
    ERROR_CODE = 400;
    errorMessage = 'Указан некорректный id';
  }

  res.status(ERROR_CODE).send({ message: errorMessage });
};
