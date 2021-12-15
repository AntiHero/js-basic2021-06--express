import express from 'express';
import { resolve } from 'path';
import requetLogger from './middlewares/logger';
import bodyParser from 'body-parser';
import session from 'express-session';
import './types/index';
import booksRouter from './controllers/book';

const app = express();

const oneDay = 1000 * 60 * 60 * 24;

// Подключение
app.use(
  session({
    secret: "sfajnh4faAN99", // обязательное поле
    cookie: { maxAge: oneDay },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(requetLogger);
app.use(express.static('public'));
app.use('/api/books', booksRouter);

app.post('/api/counter', (req, res) => {
  const { value } = req.body;
  
  if (!req.session.counter) {
    req.session.counter = 1;
  } else {
    req.session.counter += value;
  }

  res.status(201).send(String(req.session.counter));
});

app.get('*/style.css', (req, res) => {
  res.status(200).sendFile(resolve(__dirname, '../public/style.css'));
})

app.get('*', (req, res) => {
  res.status(404).sendFile(resolve(__dirname, '../public/404.html'));
});

export default app;
