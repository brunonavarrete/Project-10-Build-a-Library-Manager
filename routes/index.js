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

module.exports = router;