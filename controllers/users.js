// Вы писали, что нужно добавить валидацию в контроллеры,
// но зачем это делать, если данные уже валидируются с помощью celebrate?
// (в чеклисте такой пункт есть)

const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const NotFoundError = require('../errors/NotFoundError');
const KeyDublicateError = require('../errors/KeyDublicateError');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 16)
    .then((hash) => User.create({
      name, about, avatar, password: hash, email,
    })
      .then((user) => {
        const usr = user.toObject({ useProjection: true });

        res.send({ data: usr });
      })
      .catch((err) => {
        if (err.name === 'MongoServerError') {
          next(new KeyDublicateError('Пользователь с таким email уже существует'));
          return;
        }
        next(err);
      }));
}

function updateUser(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
};
