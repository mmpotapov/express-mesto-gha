const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

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
app.use(router);

app.listen(PORT);
