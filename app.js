require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const colors = require('colors');

// Files
const database = require('./config/database'); // connect to MongoDB Database
const index = require('./routes/index');

//initialization
const app = express();
database();

// Settings
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes Setup
app.use('/api/v1/', index);

// Server Listens
app.listen(PORT, console.log(`Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}/api/v1/`));