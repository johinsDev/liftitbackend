import 'babel-polyfill';
import "dotenv/config";

import express from 'express';
import path from 'path';
import Config from './services/config';
import Database from './services/db';

import MailServiceProvider from './services/providers/MailServiceProvider';

global.__basedir = path.resolve(__dirname);

// Create container of providers
// Create providers --> load factory providers
// create helpers
const config = new Config(global.__basedir);
new Database(config.get('database'));
new MailServiceProvider().register();

import routes from './routes';
import middlewaresConfig from './services/middlewares';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Working');
});

app.use('/api/v1', routes);

app.listen(process.env.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listen on port ${ process.env.PORT }`);
  }
});