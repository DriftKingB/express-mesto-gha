const router = require('express').Router();

const { handleLogin } = require('../controllers/login');
const { validateUser } = require('../middlewares/requestValidationConfigs');

router.post('/', validateUser, handleLogin);

module.exports = router;
