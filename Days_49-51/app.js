const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// set options (template files location, templating engine: ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --Middleware
// serve static files from 'public' root dir
app.use(express.static('public'));
// look into incoming requests, try to extract data
app.use(express.urlencoded({ extended: false }));

// --Routing
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/confirm', (req, res) => {
	res.render('confirm');
});

app.get('/restaurants', (req, res) => {
	// get number of restaurants (json length)
	const filePath = path.join(__dirname, 'data', 'restaurants.json');
	const file = fs.readFileSync(filePath);
	const fileObject = JSON.parse(file);
	const restaurantNumber = Object.keys(fileObject).length;
	res.render('restaurants', {
		numberOfRestaurants: restaurantNumber,
		restaurants: fileObject,
	});
});

app.get('/recommend', (req, res) => {
	res.render('recommend');
});

// get from data from /recommend
app.post('/recommend', (req, res) => {
	const restaurant = req.body;
	const filePath = path.join(__dirname, 'data', 'restaurants.json');

	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);

	storedRestaurants.push(restaurant);
	fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

	res.redirect('/confirm');
});

app.listen(3000);
