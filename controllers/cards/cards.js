const Card = require('../../models/cardModel');
const errorHandler = require('../../utils/errorHandler');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => errorHandler.handleUnknownError(res));
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        errorHandler.handleValidationError(err, res);
      } else {
        errorHandler.handleUnknownError(res);
      }
    });
}

function removeCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        errorHandler.handleNotFoundError(res, 'Запрашиваемая карточка не найдена');
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

function putCardLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        errorHandler.handleNotFoundError(res, 'Запрашиваемая карточка не найдена');
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

function removeCardLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        errorHandler.handleNotFoundError(res, 'Запрашиваемая карточка не найдена');
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
  getCards,
  createCard,
  removeCard,
  putCardLike,
  removeCardLike,
};
