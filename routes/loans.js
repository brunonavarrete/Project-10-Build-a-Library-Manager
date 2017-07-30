const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

// relations
	Loan.belongsTo(Patron);
	Book.hasMany(Loan);

// GET
	router.get('/', (req, res) => {
			res.redirect('/loans/all');
		});

	router.get('/all', (req, res) => {
		Loan.findAll({
			include: [Patron,Book]
		}).then((loans) => {
			res.render('loans/list',{loans});
		});
	});

	router.get('/new', (req, res) => {
		Book.findAll().then( (books) => {
			Patron.findAll().then( (patrons) => {
				res.render('loans/new',{books,patrons});
			});
		});
	});

	router.get('/overdue', (req, res) => {
		Loan.findAll({
			where: {
				returned_on: null,
				return_by: {
					$lt: new Date()
				}
			},
			include: [Patron,Book]
		}).then((loans => {
			res.render('loans/list',{loans});
		}));
	});

	router.get('/checked', (req, res) => {
		Loan.findAll({
			where: {
				returned_on: null,
			},
			include: [Patron,Book]
		}).then((loans => {
			res.render('loans/list',{loans});
		}));
	});


module.exports = router;