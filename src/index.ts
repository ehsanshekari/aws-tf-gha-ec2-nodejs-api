import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import healthCheckRoutes from './health-check/health-check.routes';
import { dataSource } from './db/datasource';
import authRoutes from './auth/auth.routes';
import logger from './utils/logger';
import errorMiddleware from './middleware/errorMiddleware';
import { ENV, MAX_REQUESTS, PORT, SERVER_TIMEOUT, WINDOW_MS } from './config/config';

const app = express();
const limiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
});

app.use(xss());
app.use(cors());
app.use(limiter);
app.use(helmet({}));
app.use(compression());
app.use(
  express.json({
    /* limit: '1MB' */
  })
);

const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => {
      logger.debug(message.trim());
    },
  },
});
app.use(morganMiddleware);

// Routes
app.use('/', healthCheckRoutes);
app.use('/v1/auth', authRoutes);

app.use(errorMiddleware);

dataSource
  .initialize()
  .then(async () => {
    logger.info('Successfully Connected To Database!');
    const server = app.listen(PORT, function () {
      server.timeout = SERVER_TIMEOUT;
      logger.info(`Server Running in ${ENV} on port ${PORT}`);
    });
  })
  .catch((e: any) => {
    logger.error(`Database Connection Error! ${e}`);
  });

process.on('unhandledRejection', (err, _promise) => {
  console.log(err);
  if (err && err.hasOwnProperty('message')) {
    logger.error(`Unhandled promise rejection: ${err}`);
  } else {
    logger.error(`Unhandled promise rejection: ${err}`);
  }
  // server.close(() => process.exit(1));
});

