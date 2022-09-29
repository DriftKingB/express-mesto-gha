// Вы писали, что нужно добавить валидацию в контроллеры,
// но зачем это делать, если данные уже валидируются с помощью celebrate?
// (в чеклисте такой пункт есть)

const Card = require('../models/cardModel');
const NotFoundError = require('../errors/NotFoundError');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const owner = req.user;
  const {
    name, link, likes, createdAt,
  } = req.body;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function removeCard(req, res, next) {
  const { user, params } = req;
  Card.checkUserRights(params.cardId, user._id)
    .then(({ _id }) => {
      Card.findByIdAndDelete(_id)
        .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
        .then((card) => {
          res.send({ data: card });
        });
    })
    .catch(next);
}

function putCardLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
}

function removeCardLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  removeCard,
  putCardLike,
  removeCardLike,
};
