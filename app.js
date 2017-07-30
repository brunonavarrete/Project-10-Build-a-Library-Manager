const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// middleware
	app.use( bodyParser.urlencoded({extended:false}) );
	app.use( cookieParser() );
	app.use('/static', express.static(__dirname + '/public'));

// view engine setup
	app.set('view engine', 'pug');

// routes
	const mainRoutes = require('./routes/index');
	const bookRoutes = require('./routes/books');
	const loanRoutes = require('./routes/loans');
	const patronRoutes = require('./routes/patrons');

	app.use('/',mainRoutes);
	app.use('/books',bookRoutes);
	app.use('/loans',loanRoutes);
	app.use('/patrons',patronRoutes);

// ERRORS
	app.use((req,res,next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	app.use((err,req,res,next) => {
		// res.locals.err = err;
		// res.status(err.status);
		//res.render('error',err);
		res.send('<pre>'+err.message+'</pre>');
	});

//server
	app.listen(3000, () => {
		console.log('The application is running on localhost:3000');
	});