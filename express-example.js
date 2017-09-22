var express = require('express');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var session = require('express-session');

var handler = require('./lib/request-handler.js');

var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.get( '/bundle.js', browserify('./App/index.js', {
  transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
}) );
app.use( express.static(__dirname + '/App') );
app.use( session({
  secret: 'my secret phrase',
  resave: false,
  saveUninitialized: true
}) );


app.get('/', handler.renderIndex);
app.get('/links', handler.fetchLinks);

app.post('/login', handler.login);
app.post('/signup', handler.signup);
app.post('/submit', handler.submitLink);
