const router = require('express').Router();

const userApi = require('./user.api')

router.use('/api/user', userApi);

module.exports = router;