const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

//patrons
	router.get('/', (req, res) => {
		res.redirect('/patrons/all');
	});

	router.get('/all', (req, res) => {
		Patron.findAll().then( (patrons) => {
			res.locals.patrons = patrons;
			res.render('patrons/list',patrons);
		});
	});

	router.get('/new', (req, res) => {
		res.render('patrons/new');
	});

	router.get('/:id', (req, res) => {
		Patron.findOne({
			where: {
				id: req.params.id
			}
		}).then((patron) => {
			res.render('patrons/detail',{patron});
		});
	});

module.exports = router;