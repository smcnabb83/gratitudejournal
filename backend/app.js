require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const entries = require('./routes/entries');
const users = require('./routes/users');
const dbHandler = require('./db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log('cookies are');
  console.log(req.cookies);
  const { userData } = req.cookies;
  if (userData) {
    const { email } = jwt.decode(userData, process.env.JWT_KEY);
    req.userEmail = email;
    console.log('User Email Received!');
    console.log(req.userEmail);
  }
  next();
});

app.use(
  dbHandler.createDBConnection(
    process.env.DBUSER,
    process.env.DBPASS,
    process.env.DBHOST,
    process.env.DBPORT,
    process.env.DBNAME
  )
);

app.use('/entries', entries);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000);

module.exports = app;
