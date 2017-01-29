var express = require('express');
var app = require('./app');
var path = require('path');
var fs = require('fs');

// load data
var projects = require('./projects');
var self = require('./data/self');
var navs = require('./data/nav');
var about = require('./data/about');

module.exports =  function (app)  {

  var basedir = path.join(__dirname, '../');
  app.use(express.static(path.join(basedir, 'public')));

  // page class
  var pageClass = function(req){
    var pageclass =  req.url.split('/').filter(function(v){return v!==''})[0];
    if (pageclass == null) {
      pageclass = 'index';
    }
    return pageclass;
  };

  // for all pages
  app.use(function (req, res, next) {

    // set header
    res.setHeader('Cache-Control', 'public, max-age=86400000');

    // set page class
    app.locals.page = pageClass(req);

    // get shared data
    app.locals.navs = navs;
    app.locals.projects = projects;

    // fallback title
    app.locals.title = 'Express Starter'

    next();
  });


  app.get('/projects/:project', function(req, res){
    current_project = projects[req.params.project];

    // render the right file
    var file = 'views/' + current_project + '.pug';
    fs.exists(file, function(exists) {
      if (exists) {
        res.render(req.params.project, app.locals);
      } else {
        res.render('project', app.locals);
      }
    });
        
  });

  // Indiv Page Routes

  app.get('/', function (req, res) {
    res.render('index', app.locals);
  });

  app.get('/about', function (req, res) {

    // load page-specific data
    app.locals.about = about;
    res.render('about', app.locals);
  });

 // Handle 404
  app.use(function(req, res) {
    res.status(400);
    app.locals.page = 'error';
    res.render('error', {title: '404'});
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
    res.status(500);
    res.render('error', {title: '500'});
  });
};