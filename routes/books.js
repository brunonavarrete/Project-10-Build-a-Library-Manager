const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

// relations
Loan.belongsTo(Book);

	// books
		// GET
			router.get('', (req, res) => {
				res.redirect('/books/all');
			});

			router.get('/all', (req, res) => {
				Book.findAll().then( (books) => {
					res.render('all_books',{books});
				});
			});

			router.get('/new', (req, res) => {
				res.render('new_book');
			});

			router.get('/checked', (req, res) => {
				Loan.findAll({
					where: { 
						returned_on:null,
					},
					include: [Book],
				}).then( (loans) => {
					res.render('overdue_books',{loans,title:'Checked Out Books'});
				});
			});

			router.get('/overdue', (req, res) => {
				Loan.findAll({
					where: { 
						returned_on:null,
						return_by: {
							$lt: new Date()
						}
					},
					include: [Book],
				}).then( (loans) => {
					res.render('overdue_books',{loans,title:'Overdue Books'});
				});
			});

			router.get('/:id', (req, res) => {
				Book.find({
					where: { 
						id: req.params.id
					},
				}).then( (book) => {
					res.render('book_detail',{book});
				});
			});

		// POST
			router.post('/new', (req, res) => {
				Book.create(req.body).then((book) => {
					res.redirect('/');
				}).catch((error) => {
					if( error.name === 'SequelizeValidationError' ){
						res.render('new_book',{errors:error.errors});
					} else {
						console.error(error);
					}
				});
			});
module.exports = router;