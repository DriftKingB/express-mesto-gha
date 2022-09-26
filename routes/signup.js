const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateUserCredentials } = require('../middlewares/requestValidationConfigs');

router.post('/', validateUserCredentials, createUser);

module.exports = router;
