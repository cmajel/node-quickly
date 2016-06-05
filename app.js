var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var reload = require('reload');
var path = require('path');
var http = require('http');
var swig = require('swig');
var pug = require('pug');

app.set('view engine', 'pug');

// // set paths
app.set('views', __dirname + '/views');
app.use(express.static('public'));

var hi = "baller";
var bye = "shot caller";
var message = "yo yo yo";

app.get('/', function (req, res) {
  res.render('index', {title: "giiiiiii", hi:hi, bye:bye});
});

app.get('/blah', function (req, res) {
  locals = {
    hi: "baller",
    bye: "shot caller",
  }

  locals['message'] = 'aaaaaaahhh'

  res.render('blah', locals);
});

app.get('/other', function (req,res) {
  res.render('other', {message:message});
});

// run the server
app.listen(3000, function () {
  console.log('App running on port 3000 ------------------------');
});