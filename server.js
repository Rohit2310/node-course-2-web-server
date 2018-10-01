const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log+'\n\n', (err) => {
		console.log('Unable to connect');
	});

	console.log(log);
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintenance Page!!',
		welcomeMessage: 'Welcome'
	});
});*/

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('<h1>Hello Express!</h1>');
	/*res.send({
		name:'Rohit',
		likes: [
			'Biking', 
			'Cities'
		]
	})*/

	res.render('home.hbs', {
		pageTitle: 'Home Page!!',
		welcomeMessage: 'Welcome'
	})
});

app.get('/about', (req, res) => {
	//res.send('<h1>About Page</h1>')
	res.render('about.hbs', {
		pageTitle: 'About Page!!'
	});
});

app.get('/project', (req, res) => {
	//res.send('<h1>About Page</h1>')
	res.render('project.hbs', {
		pageTitle: 'Project Page!!'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unale to handle request.'
	});
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});