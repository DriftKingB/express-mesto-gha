const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./utils/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, console.log(`Server started at port: ${PORT}`));

app.use((req, res, next) => {
  req.user = {
    _id: '631cc40da5d691de5931a0b3',
  };

  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.all('*', (req, res) => {
  errorHandler.handleNotFoundError(res, 'Указан некорректный путь');
});
