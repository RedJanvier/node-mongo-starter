const router = require('express').Router();

// Controllers
const users = require('../controllers/users');

router
    .route('/')
    .get(users.readAll)
    .post(users.create);

router
    .route('/:id')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

module.exports = router;