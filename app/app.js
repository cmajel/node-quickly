var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var pug = require('pug');
var router = require('./routes')(app);

app.set('view engine', 'pug');
var basedir = path.join(__dirname, '../');


// set paths
app.set('static', basedir + 'public', { maxAge: 86400000 });
app.set('views', basedir + 'views');

var port = process.env.PORT || 5000;

//fix this
demo_links = {};
demo_links.css_toggles = "http://codepen.io/seebath/pen/XdBOyJ";
demo_links.squishy_toggle = "http://codepen.io/seebath/pen/jqvYbr";
app.locals.demo_links = demo_links;

// this should be a local thing
app.locals.icon_bar = [
    {'content': '<i class="material-icons">attach_file</i>', 'link': '#'},
    {'content': '<i class="material-icons">place</i>', 'link': '#'},
    {'content': '<i class="material-icons">camera_alt</i>', 'link': '#'},
    {'content': '<i class="material-icons">insert_emoticon</i>', 'link': '#'},
    {'content': '<i class="material-icons">color_lens</i>', 'link': '#'}
  ];

// for every request



// run the server
app.listen(5000, function () {
  console.log('App running on port 5000 ------------------------');
});