const router = require('express').Router();

// Controllers
const user = require('../controllers/users');

router
    .route('/')
    .get(user.readAll)
    .post(user.create);

router
    .route('/:id')
    .get(user.read)
    .put(user.update)
    .delete(user.delete);

module.exports = router;