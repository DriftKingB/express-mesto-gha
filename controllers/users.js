const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const NotFoundError = require('../errors/notFoundError');
const KeyDublicateError = require('../errors/keyDublicateError');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      throw new NotFoundError('Запрашиваемый пользователь не найден');
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
    name, about, avatar, password, email,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => User.create({
      name, about, avatar, password: hash, email,
    })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'MongoServerError') {
          throw new KeyDublicateError('Пользователь с таким email уже существует');
        }
        return err;
      })
      .catch(next));
}

function updateUser(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      throw new NotFoundError('Запрашиваемый пользователь не найден');
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
