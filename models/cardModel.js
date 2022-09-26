const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    match: /^https?:\/\/(w{3}.)?[\w\W]{1,}#?$/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.statics.checkUserRights = function (cardId, userId) {
  this.findOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('Запрашиваемая карточка не найдена'));
      }

      if (card.owner.equals(userId)) {
        return Promise.resolve(card);
      }

      return Promise.reject(new PermissionError('У вас нет прав на редактирование этой карточки'));
    });
};

module.exports = mongoose.model('card', cardSchema);
