const router = require('express').Router();

// Controllers
const index = require('../controllers/index');

router
    .route('/')
    .get(index.testRoute);

module.exports = router;