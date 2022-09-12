const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users/users');

router.get('/', getUsers);

router.get('/:usersId', getUserById);

router.post('/', jsonParser, createUser);

router.patch('/me', jsonParser, updateUser);

router.patch('/me/avatar', jsonParser, updateAvatar);

module.exports = router;
