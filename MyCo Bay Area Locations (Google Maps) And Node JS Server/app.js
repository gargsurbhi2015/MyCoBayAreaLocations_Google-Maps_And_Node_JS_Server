var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var json;
fs.readFile('./views/data.json', 'utf8', function(err, data){
	if(err)
		throw err;
	else
		json = data;

});
var port = 8500;

app.get('/', function(request, response){
	console.log(json);
	response.setHeader('access-control-allow-origin', '*');
	response.status(200).send(json);
});

app.listen(port, function() {
	console.log('Server Listening at port 8500')
});



module.exports = app;