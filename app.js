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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-Request-With, Authorization, Accept'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
    return res.status(200).json({});
  }

  return next();
});

// Routes Setup
app.use('/api/v1/', index);

// Server Listens
app.listen(
  PORT,
  console.log(
    `Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}/api/v1/`
  )
);
