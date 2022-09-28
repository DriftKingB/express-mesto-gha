const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateUserInfo, validateUserParams } = require('../middlewares/requestValidationConfigs');
// eslint-disable-next-line import/order, no-unused-vars
const { celebrate, Joi } = require('celebrate');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validateUserParams, getUserById);

router.patch('/me', validateUserInfo, updateUser);

router.patch('/me/avatar', validateUserInfo, updateAvatar);

module.exports = router;
