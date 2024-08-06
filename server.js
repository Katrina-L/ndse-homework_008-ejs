const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');

const booksRouter = require('./routes/booksList');
const indexRouter = require('./routes/mainPage');
const errorMiddleware = require('./middlewares/errors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/bookslist', booksRouter);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});