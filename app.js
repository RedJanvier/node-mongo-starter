const express = require('express');
const app = express();

app.use('/api/v1', require('./routes/index'));

module.exports = app;