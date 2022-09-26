const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateUserInfo, validateUserAvatar, validateUserParams } = require('../middlewares/requestValidationConfigs');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validateUserParams, getUserById);

router.patch('/me', validateUserInfo, updateUser);

router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
