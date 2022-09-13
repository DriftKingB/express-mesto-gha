const errorMessageTranslations = require('./errorMessageTranslations');

class ErrorHandler {
  constructor() {
    this._errorMessage = '';
  }

  _sendResponse(res) {
    res.status(this._statusCode).send({ message: this._errorMessage });

    this._errorMessage = '';
    this._statusCode = null;
  }

  handleValidationError(err, res) {
    this._statusCode = 400;

    Object.values(err.errors).forEach((error) => {
      if (errorMessageTranslations[error.kind]) {
        this._errorMessage = `${this._errorMessage}${error.path}: ${errorMessageTranslations[error.kind]}; `;
        return;
      }
      this._errorMessage[error.path] = 'Неизвестная ошибка валидации';
    });

    this._sendResponse(res);
  }

  handleCastError(res) {
    this._statusCode = 400;
    this._errorMessage = 'Указан некорректный id';

    this._sendResponse(res);
  }

  handleNotFoundError(res, errorMessage) {
    this._statusCode = 404;
    this._errorMessage = errorMessage;

    this._sendResponse(res);
  }

  handleUnknownError(res) {
    this._statusCode = 500;
    this._errorMessage = 'Неизвестная ошибка';

    this._sendResponse(res);
  }
}

module.exports = new ErrorHandler();
