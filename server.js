// Modules
const http = require('http');
const colors = require('colors');

// Files
const app = require('./app');

// Settings
require('dotenv').config({ path: './config/config.env' });
require('./config/database')(); // connect to MongoDB Database
const PORT = process.env.PORT || 4000;

// Create Server
const server = http.createServer(app);

// Server Listens
server.listen(PORT, console.log(`Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}/api/v1/`))