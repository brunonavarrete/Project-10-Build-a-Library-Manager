const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

const formatDate = function(date,tomorrow){
	const month = (date.getMonth()+1 < 10) ? '0'+(date.getMonth()+1) : date.getMonth()+1;
	const day = (tomorrow) ? (date.getDate()+1) : date.getDate();
	return date.getFullYear() + '-' + month + '-' + day;
}

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
			res.render('loans/list',{loans,title:'Loans'});
		});
	});

	router.get('/new', (req, res) => {
		Book.findAll().then( (books) => {
			Patron.findAll().then( (patrons) => {
				res.locals.today = formatDate( new Date(),undefined );
				res.locals.tomorrow = formatDate( new Date(),true );
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
			res.render('loans/list',{loans,title:'Overdue Loans'});
		}));
	});

	router.get('/checked', (req, res) => {
		Loan.findAll({
			where: {
				returned_on: null,
			},
			include: [Patron,Book]
		}).then((loans => {
			res.render('loans/list',{loans,title:'Checked Out Loans'});
		}));
	});


	router.get('/:id', (req, res) => {
		Loan.findOne({
			where: {
				id: req.params.id
			},
			include: [Patron,Book]
		}).then((loan => {
			res.locals.today = formatDate( new Date(),undefined );
			res.render('loans/return',{loan});
			//res.send(loan);
		}));
	});

// POST
	router.post('/new', (req,res) => {
		Loan.create(req.body).then((loan) => {
			res.redirect('/loans');
		}).catch((error) => {
			if( error.name === 'SequelizeValidationError' ){
				Book.findAll().then( (books) => {
					Patron.findAll().then( (patrons) => {
						res.locals.today = formatDate( new Date(),undefined );
						res.locals.tomorrow = formatDate( new Date(),true );
						res.locals.errors = error.errors;
						res.render('loans/new',{books,patrons});
					});
				});
			} else {
				console.error(error);
			}
		});
	});

	router.post('/:id', (req, res) => {
		Loan.findById(req.params.id).then((loan) => {
			return loan.update(req.body);
		}).then((loan) => {
			res.redirect('/loans');
		}).catch((error) => {
			if( error.name === 'SequelizeValidationError' ){
				Loan.findOne({
					where: {
						id: req.params.id
					},
					include: [Patron,Book]
				}).then((loan => {
					res.locals.today = formatDate( new Date(),undefined );
					res.locals.errors = error.errors;
					res.render('loans/return',{loan});
					//res.send(loan);
				}));
			} else {
				console.error(error);
			}
		});
	});

module.exports = router;