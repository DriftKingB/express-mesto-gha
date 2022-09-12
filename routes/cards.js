const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const {
  getCards,
  createCard,
  removeCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards/cards');

router.get('/', getCards);

router.post('/', jsonParser, createCard);

router.delete('/:cardId', removeCard);

router.put('/:cardId/likes', putCardLike);

router.delete('/:cardId/likes', removeCardLike);

module.exports = router;
