const Card = require('../../models/cardModel');
const errorHandler = require('../../utils/errorHandler');
const NotFoundError = require('../../Errors/NotFoundError');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorHandler(err, res));
}

function createCard(req, res) {
  const owner = req.user;
  const {
    name, link, likes, createdAt,
  } = req.body;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
}

function removeCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => new Promise((resolve, reject) => {
      if (card) {
        resolve(card);
      }
      reject(new NotFoundError('Запрашиваемая карточка не найдена'));
    }))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => errorHandler(err, res));
}

function putCardLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => new Promise((resolve, reject) => {
      if (card) {
        resolve(card);
      }
      reject(new NotFoundError('Запрашиваемая карточка не найдена'));
    }))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => errorHandler(err, res));
}

function removeCardLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => new Promise((resolve, reject) => {
      if (card) {
        resolve(card);
      }
      reject(new NotFoundError('Запрашиваемая карточка не найдена'));
    }))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => errorHandler(err, res));
}

module.exports = {
  getCards,
  createCard,
  removeCard,
  putCardLike,
  removeCardLike,
};
