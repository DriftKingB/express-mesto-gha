const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/requestValidationConfigs');

router.post('/', validateUser, createUser);

module.exports = router;
