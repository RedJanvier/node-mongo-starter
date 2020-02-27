const router = require('express').Router();

// Controllers
const users = require('../controllers/users');

router
    .route('/')
    .get(users.getAll);

module.exports = router;