var express = require('express');
var router = express.Router();
var dataHelper = require('../helpers/dataHelper.js');
var geoData = require('../geoData.json');
var _ = require('underscore');


/*router.get('/generate', function(req, res, next) {
    dataHelper.processYML('data', function response(data) {
        res.send({
            items: data
        });
    }, function error(err) {
        console.log(err);
    });
});*/

router.get('/', function(req, res, next) {
    var code = 404;
    var resInfo = {};
    if(req.query.country) {
        if(!req.query.state) {
            resInfo = _.find(geoData, function(c) {
                return (c.name === req.query.country || c.abbreviation === req.query.country);
            });
            code = 200;
        }
        else {
            if(!req.query.city) {
                var countryInfo = _.find(geoData, function(c) {
                    return (c.name === req.query.country || c.abbreviation === req.query.country);
                });
                var stateInfo = _.find(countryInfo.states, function(c) {
                    return (c.name === req.query.state || c.sourceName === req.query.country);
                });
                resInfo = {
                    state: stateInfo
                };
                code = 200;
            }
            else {
                var cInfo = _.find(geoData, function(c) {
                    return (c.name === req.query.country || c.abbreviation === req.query.country);
                });
                stateInfo = _.find(cInfo.states, function(c) {
                    return (c.name === req.query.state || c.sourceName === req.query.country);
                });
                cityInfo = _.find(stateInfo.cities, function(c) {
                    return (c.asciiName === req.query.state || c.originalName === req.query.country);
                });
                resInfo = {
                    state: stateInfo,
                    city: cityInfo
                };
                code = 200;
            }
        }
    }
    else {
        resInfo = {
            error: "No country specified!"
        };
        code = 400;
    }
    res.status(code).send({
        response: resInfo
    });

});


router.get('/countries', function(req, res, next) {
    var resInfo = [];
    try {
        for(var i=0; i<geoData.length; i++) {
            resInfo.push({
                name: geoData[i].name,
                abbreviation: geoData[i].abbreviation
            });
        }

        res.status(200).send({
            response: resInfo
        });
    }
    catch(e) {
        res.status(404).send({
            response: "Nothing found"
        });
    }

});

router.get('/states', function(req, res, next) {

    if(!req.query.country) {
        res.status(400).send({
            response: {
                error: "No country specified!"
            }
        });
        return;
    }
    var resInfo = [];
    try {
        var cInfo = _.find(geoData, function(c) {
            return (c.name === req.query.country || c.abbreviation === req.query.country);
        });
        for(var i=0; i<cInfo.states.length; i++) {
            resInfo.push({
                name: cInfo.states[i].name,
                sourceName: cInfo.states[i].sourceName
            });
        }
        res.status(200).send({
            response: resInfo
        });
    }
    catch(e) {
        res.status(404).send({
            response: "Nothing found"
        });
    }
});

router.get('/cities', function(req, res, next) {

    if(!req.query.country || !req.query.state) {
        res.status(400).send({
            response: {
                error: "No country or state specified!"
            }
        });
        return;
    }
    var resInfo = [];
    try {
        var cInfo = _.find(geoData, function(c) {
            return (c.name === req.query.country || c.abbreviation === req.query.country);
        });
        var sInfo = _.find(cInfo.states, function(c) {
            return (c.name === req.query.state || c.sourceName === req.query.state);
        });

        for(var i=0; i<sInfo.cities.length; i++) {
            resInfo.push({
                name: sInfo.cities[i].asciiName,
                alternativeNames: sInfo.cities[i].alternateNames,
                originalName: sInfo.cities[i].originalName
            });
        }
        res.status(200).send({
            response: resInfo
        });
    }
    catch(e) {
        res.status(404).send({
            response: "Nothing found"
        });
    }
});



module.exports = router;
