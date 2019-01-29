const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Middleware
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require( './controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use( bodyParser.json() );
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use( checkForSession );

// Swag
app.get( '/api/swag', swag_controller.read );

// Auth
app.post( '/api/login', auth_controller.login );
app.post( '/api/register', auth_controller.register );
app.post( '/api/signout', auth_controller.signout );
app.get( '/api/getUser', auth_controller.getUser );

//Cart
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.get('/api/cart', cart_controller.delete)

//seach
app.get('/api/search', search_controller.search)

const PORT = process.env.SERVER_PORT;
app.listen( PORT, () => { console.log(`Server listening on port ${PORT}.`); } );