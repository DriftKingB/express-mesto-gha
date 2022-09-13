const errorMessageTranslations = require('./errorMessageTranslations');

class ErrorHandler {
  constructor() {
    this.errorMessage = '';
  }

  sendResponse(res) {
    res.status(this.statusCode).send({ message: this.errorMessage });

    this.errorMessage = '';
    this.statusCode = null;
  }

  handleValidationError(err, res) {
    this.statusCode = 400;

    Object.values(err.errors).forEach((error) => {
      if (errorMessageTranslations[error.kind]) {
        this.errorMessage = `${this.errorMessage}${error.path}: ${errorMessageTranslations[error.kind]}; `;
        return;
      }
      this.errorMessage[error.path] = 'Неизвестная ошибка валидации';
    });

    this.sendResponse(res);
  }

  handleCastError(res) {
    this.statusCode = 400;
    this.errorMessage = 'Указан некорректный id';

    this.sendResponse(res);
  }

  handleNotFoundError(res, errorMessage) {
    this.statusCode = 404;
    this.errorMessage = errorMessage;

    this.sendResponse(res);
  }

  handleUnknownError(res) {
    this.statusCode = 500;
    this.errorMessage = 'Неизвестная ошибка';

    this.sendResponse(res);
  }
}

module.exports = new ErrorHandler();
