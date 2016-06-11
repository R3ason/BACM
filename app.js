var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var locatorController = require('./controllers/locator.js');
var stacheController = require('./controllers/stache.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

app.get('/locator', locatorController.locator);
app.get('/locator/:id', locatorController.locator);

app.get('/stache/:id', stacheController.stache);
app.get('/stache', stacheController.stache);

var server = app.listen(7510, function() {
	console.log('Express server listening on port ' + server.address().port);
});
