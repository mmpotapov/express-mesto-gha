const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

/** Обработка запросов */
app.use(bodyParser.json());
/** Хардкод id пользователя */
app.use((req, res, next) => {
  req.user = {
    _id: '6406042b1d8549359c6a1bc2',
  };
  next();
});
/** Обработка запросов на /user и /cards */
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT);
