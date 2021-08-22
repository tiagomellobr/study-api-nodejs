import express from 'express';
import routes from './routes';
import database from './config/database';

const app = express();

const configureExpress = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', routes);
  app.database = database;

  return app;
};

export default async () => {
  const setupApp = configureExpress();
  await setupApp.database.connect();

  return setupApp;
};
