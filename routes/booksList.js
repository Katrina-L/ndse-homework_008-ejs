const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();

class Book {
    constructor(title = "", author = "", description = "", id = uuid()) {
       this.title = title,
       this.author = author,
       this.description = description,
       this.id = id
    }
}

const library = {
    books: []
}

router.get('/', (req, res) => {     //  вывод всех записей
    const { books } = library;
    res.render('booksList/index', {
        title: 'Список книг',
        booksList: books
    });
});

router.get('/create', (req, res) => {     //  вывод формы для создания новой записи
    res.render('booksList/create', {
        title: 'Create book',
        book: {
            title: '',
            author: '',
            description: ''
        }
    })
});

router.post('/create', (req, res) => {     //  создание новой записи
    const {books} = library;
    const {title, description, author} = req.body;

    const newBook = new Book(title, author, description);
    books.push(newBook);
    res.redirect('/bookslist');
});

router.get('/:id', (req, res) => {  // получение записи по ее идентификатору
    const {books} = library;
    const {id} = req.params;
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        res.redirect('/404');
    }
    res.render('booksList/view', {
        title: 'Список книг | просмотр книги',
        book: books[index]
    })
});

router.get('/update/:id', (req, res) => {     //  получение записи по идентификатору
    const {books} = library;
    const {id} = req.params;
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        res.redirect('/404');
    }
    res.render('booksList/update', {
        title: 'Список книг | обновление записи',
        book: books[index]
    })
});

router.post('/update/:id', (req, res) => {  //  обновление полученной записи
    const {books} = library;
    const {id} = req.params;
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        res.redirect('/404');
    }
    
    books[index] = {
        ...books[index],
        ...req.body
    }

    res.redirect(`/bookslist/${id}`);
});

router.post('/delete/:id', (req, res) => {  //  обработка удаления записи
    const {books} = library;
    const {id} = req.params;
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.redirect('/booksList');
    } else {
        res.redirect('/404');
    }
});

module.exports = router;