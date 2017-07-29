const express = require('express');
const router = express.Router();
var Book = require('../models').Book;

// GET
	router.get('/', (req, res) => {
		res.render('index');
	});

	router.get('/books', (req, res) => {
		Book.findAll().then( (books) => {
			res.locals.books = books;
			res.render('all_books',books);
		});
	});

module.exports = router;