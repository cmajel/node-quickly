var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var reload = require('reload');
var path = require('path');
var http = require('http');
var swig = require('swig');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
// Optional: use swig's caching methods
// app.set('view cache', false);

// // set paths
app.set('views', __dirname + '/views');
app.use(express.static('public'));

var hi = "baller";
var bye = "shot caller";

app.get('/', function (req, res) {
  res.render('index', {hi:hi, bye:bye});
});

var message = "yo yo yo"

app.get('/other', function (req,res) {
  res.render('other', {message:message})
});

// app.engine('html', mustacheExpress());
// app.set('view engine', 'html');





// app.get('/', function (req, res) {
//   res.render('index', {hi:hi, bye:bye});
// });

// var server = http.createServer(app)

// reload(server, app)

// run the server
app.listen(3000, function () {
  console.log('App running on port 3000 ------------------------');
});