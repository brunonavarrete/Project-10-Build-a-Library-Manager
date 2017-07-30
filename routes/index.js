const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;

// GET
	router.get('/', (req, res) => {
		res.render('index');
	});

module.exports = router;