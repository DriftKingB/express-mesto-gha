const User = require('../../models/userModel');
const errorHandler = require('../../utils/errorHandler');
const NotFoundError = require('../../Errors/NotFoundError');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorHandler(err, res));
}

function getUserById(req, res) {
  User.findById(req.params.usersId)
    .then((user) => new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      }
      reject(new NotFoundError('Запрашиваемый пользователь не найден'));
    }))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => errorHandler(err, res));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
}

function updateUser(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
