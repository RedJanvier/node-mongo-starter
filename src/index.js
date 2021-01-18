// eslint-disable-next-line no-unused-vars
import 'colors';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import express, { json, urlencoded } from 'express';
import documentation from './docs/index.json';
import database from './config/database';
import index from './routes/index';

// Initialization
const { PORT, NODE_ENV } = process.env;
const app = express();
database();

app.use(json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use('/api/v1/', index);
app.use('/api/v1/docs', serve, setup(documentation));

// Server Listens
app.listen(
  PORT,
  console.log(
    `Server Started in ${NODE_ENV} mode at http://localhost:${PORT}/api/v1/`
      .yellow
  )
);

export default app;
