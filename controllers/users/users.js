const User = require('../../models/userModel');
const errorHandler = require('../../utils/errorHandler');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => errorHandler.handleUnknownError(res));
}

function getUserById(req, res) {
  User.findById(req.params.usersId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        errorHandler.handleNotFoundError(res, 'Запрашиваемый пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler.handleCastError(res);
      } else {
        errorHandler.handleUnknownError(res);
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorHandler.handleValidationError(err, res);
      } else {
        errorHandler.handleUnknownError(res);
      }
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        errorHandler.handleNotFoundError(res, 'Запрашиваемый пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler.handleCastError(res);
      } else if (err.name === 'ValidationError') {
        errorHandler.handleValidationError(err, res);
      } else {
        errorHandler.handleUnknownError(res);
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        errorHandler.handleNotFoundError(res, 'Запрашиваемый пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler.handleCastError(res);
      } else {
        errorHandler.handleUnknownError(res);
      }
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
