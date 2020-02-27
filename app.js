const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Routes
const index = require('./routes/index');
const users = require('./routes/users');

// Routes Setup
app.use('/api/v1/', index);
app.use('/api/v1/users', users);

module.exports = app;