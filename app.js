var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var geoData = require('./geoData.json');
var _ = require('underscore');


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

app.use(function (req, res, next) {

  try {
    var s = req.url.split('/');
    if(req.url.indexOf('?') > 0 || req.url.indexOf('=') > 0 || req.url.indexOf('&') > 0 || s.length < 2) {
      res.status(400).send({
        error: "Bad request."
      });
    }
    var countryName = decodeURI(s[1]);
    if(s.length === 2) {

      var country =_.find(geoData, function(c) {
        return (c.name.toUpperCase() === countryName.toUpperCase() || c.abbreviation.toUpperCase() === countryName.toUpperCase());
      });
      if(!country) {
        res.status(404).send({
          error: "Country '" + decodeURI(countryName) + "' could not be found!"
        });

      }
      var states = [];
      for(var i=0; i<country.states.length; i++) {
        states.push({
          name: country.states[i].name,
          sourceName: country.states[i].sourceName
        });
      }
      res.status(200).send({
          country: {
            name: country.name,
            abbreviation: country.abbreviation,
            states: states
          }
      });

    }
    else {

      var stateName = decodeURI(s[2]);
      var c =_.find(geoData, function(h) {
        return (h.name.toUpperCase() === countryName.toUpperCase() || h.abbreviation.toUpperCase() === countryName.toUpperCase());
      });
      if(!c) {
        res.status(404).send({
          error: "Country '" + decodeURI(countryName) + "' could not be found!"
        });

      }
      var ss =_.find(c.states, function(g) {
        return (g.name.toUpperCase() === stateName.toUpperCase() || g.sourceName === stateName.toUpperCase());
      });
      if(!ss) {
        res.status(404).send({
          error: "State '" + decodeURI(stateName) + "' could not be found!"
        });

      }
      var cities = [];
      for(var k=0; k<ss.cities.length; k++) {
        cities.push({
          name: ss.cities[k].asciiName,
          alternativeNames: ss.cities[k].alternateNames,
          originalName: ss.cities[k].originalName
        });
      }
      res.status(200).send({
        country: {
          name: c.name,
          abbreviation: c.abbreviation,
          state: {
            name: ss.name,
            sourceName: ss.sourceName,
            cities: cities
          }
        }
      });

    }
  }
  catch(e) {
    res.status(500).send({
      error: e.toString()
    });

  }

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
