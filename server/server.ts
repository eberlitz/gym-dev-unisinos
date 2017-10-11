import path = require('path');
import http = require('http');

import express = require('express');
import jwt = require('express-jwt');
import mongoose = require('mongoose');
import bluebird = require('bluebird');
import cors = require('cors');
import bodyParser = require('body-parser');
import morgan = require('morgan');

import { config } from './config';
import { register } from './controllers/users';

// set Promise provider to bluebird
mongoose.Promise = bluebird;

// connect to our database
mongoose.connect(config.DATABASE);
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database at ' + config.DATABASE);
});

if (process.env.NODE_ENV !== 'production') {
  require('./setup');
}

const app = express();
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Point static path to dist
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// Set our api routes
app.use('/api', require('./controllers/api'));
app.use('/auth', require('./controllers/auth'));
app.use('/register', register);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = config.PORT;
app.set('port', config.PORT);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost: ${port}`));
