var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var util = require('util'),
	path = require('path');

var app = express();


// Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'served-files')));



// Let's go
app.get('/test', function(req,res){
	res.send('All good');
});


// 404s
app.all('*', function(req,res){
	res.send('Computer says no');
} );

// Start the server
var server = app.listen( 3003, function(){
	
	var host = server.address().address;
	var port = server.address().port;

	console.log( 'Running server at http://%s:%s', host, port );
});