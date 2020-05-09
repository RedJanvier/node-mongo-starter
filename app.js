// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import { config } from 'dotenv';
import express, { json } from 'express';

// Files
import database from './config/database'; // connect to MongoDB Database
import index from './routes/index';

// Initialization
const app = express();
config({ path: './config/config.env' });
database();

// Settings
const PORT = process.env.PORT || 4000;

app.use(json());

// Routes Setup
app.use('/api/v1/', index);

// Server Listens
app.listen(
  PORT,
  console.log(
    `Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}/api/v1/`
  )
);
