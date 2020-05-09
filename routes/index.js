const router = require('express').Router();

// Controllers
const index = require('../controllers/index');

// Other Routes
const users = require('./users');

router
    .route('/')
    .get(index.testRoute);

router
    .use('/users', users);

module.exports = router;