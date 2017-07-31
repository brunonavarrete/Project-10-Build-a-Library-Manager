const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

// location
	Patron.hasMany(Loan);
	Loan.belongsTo(Book);

// GET
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
			},
			include: [
				{
					model: Loan,
					include: [Book]
				}
			]
		}).then((patron) => {
			res.render('patrons/detail',{patron});
		});
	});

// POST
	router.post('/new', (req, res) => {
		Patron.create(req.body).then((patron) => {
			res.redirect('/patrons');
		}).catch((error) => {
			if( error.name === 'SequelizeValidationError' ){
				res.render('patrons/new',{errors:error.errors});
			} else {
				console.error(error);
			}
		});
	});
	router.post('/:id', (req, res) => {
		Patron.findById(req.params.id).then((patron) => {
			return patron.update(req.body);
		}).then((patron) => {
			res.render('patrons/detail',{patron});
		}).catch((error) => {
			if( error.name === 'SequelizeValidationError' ){
				Patron.findOne({
					where: { 
						id: req.params.id
					}
				}).then((patron) => {
					res.render('patrons/detail',{patron,errors:error.errors});
				});
			} else {
				console.error(error);
			}
		});
	});

module.exports = router;