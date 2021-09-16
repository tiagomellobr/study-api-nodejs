const express = require('express');
const routes = require('./routes');
const database = require('../config/database');

const app = express();

const configureExpress = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', routes);
  app.database = database;

  return app;
};

module.exports = async () => {
  const setupApp = configureExpress();
  await setupApp.database.connect();

  return setupApp;
};
