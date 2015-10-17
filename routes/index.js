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
    try {
        var countryList = [];

        for(var j=0; j<geoData.length; j++) {
            countryList.push(
                geoData[j].name
            );
        }

        res.status(200).send({countryList: countryList });
    }
    catch(e) {
        res.status(404).send({
            response: "Nothing found"
        });
    }
});
router.get('/abbrev', function(req, res, next) {
    try {
        var countryList = [];

        for(var j=0; j<geoData.length; j++) {
            countryList.push({
                    name: geoData[j].name,
                    abbreviation: geoData[j].abbreviation
            });
        }

        res.status(200).send({countryList: countryList });
    }
    catch(e) {
        res.status(404).send({
            response: "Nothing found"
        });
    }
});

router.get('/country', function(req, res, next) {
    try {
        var cInfo = _.find(geoData, function(c) {
            return (c.name.toUpperCase() === req.query.country.toUpperCase() || c.abbreviation.toUpperCase() === req.query.country.toUpperCase());
        });

        res.status(200).send({
            response: {
                name: cInfo.name,
                abbreviation: cInfo.abbreviation,
                states: cInfo.states
            }
        });
    }
    catch(e) {
        res.status(404).send({
            response: "Nothing found"
        });
    }

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
            return (c.name.toUpperCase() === req.query.country.toUpperCase() || c.abbreviation.toUpperCase() === req.query.country.toUpperCase());
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
