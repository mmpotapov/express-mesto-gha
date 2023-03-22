const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

/** Обработка запросов */
app.use(express.json());
/** Хардкод id пользователя */
app.use((req, res, next) => {
  req.user = {
    _id: '641a0468d5f6ead4393efcdd',
  };
  next();
});
app.use(router);

app.listen(PORT);
