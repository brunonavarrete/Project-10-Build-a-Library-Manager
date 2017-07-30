const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

// GET
	router.get('/', (req, res) => {
		res.render('index');
	});

	//patrons
		router.get('/patrons', (req, res) => {
			res.redirect('/patrons/all');
		});

		router.get('/patrons/all', (req, res) => {
			Patron.findAll().then( (patrons) => {
				res.locals.patrons = patrons;
				res.render('all_patrons',patrons);
			});
		});

		router.get('/patrons/new', (req, res) => {
			res.render('new_patron');
		});

	//loans
		router.get('/loans', (req, res) => {
			res.redirect('/loans/all');
		});
		router.get('/loans/all', (req, res) => {
			Loan.findAll().then( (loans) => {
				res.locals.loans = loans;
				res.render('all_loans',loans);
			});
		});

		router.get('/loans/new', (req, res) => {
			Book.findAll().then( (books) => {
				Patron.findAll().then( (patrons) => {
					res.render('new_loan',{books,patrons});
				});
			});
		});

module.exports = router;