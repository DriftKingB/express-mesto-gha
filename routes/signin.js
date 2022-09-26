const router = require('express').Router();

const { handleLogin } = require('../controllers/login');
const { validateUserCredentials } = require('../middlewares/requestValidationConfigs');

router.post('/', validateUserCredentials, handleLogin);

module.exports = router;
