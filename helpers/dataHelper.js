/**
 * Created by zarathos on 16/10/15.
 */
var fs = require('fs');
var yaml = require('js-yaml');
var helper={

    processYML:function(path, response, error) {

        fs.readdir(path, function(err, items) {
            //console.log(items);
            var countryList = [];
            //var doc = yaml.safeLoad(fs.readFileSync('data/' + items[5], 'utf8'));
            //console.log(doc);
            for (var i=0; i<items.length; i++) {
                try {
                    var doc = yaml.safeLoad(fs.readFileSync('data/' + items[i], 'utf8'));
                    var regionsList = [];
                    for(var j=0; j<doc.regions.length; j++) {

                        var objectData = [];
                        for(var k=0; k<doc.regions[j].cities.length; k++) {
                            objectData.push({
                                asciiName:  doc.regions[j].cities[k].ascii_name,
                                alternateNames:doc.regions[j].cities[k].alternate_names,
                                originalName: doc.regions[j].cities[k].name
                            });
                        }
                        regionsList.push({
                            name: doc.regions[j].name,
                            sourceName: doc.regions[j].ascii_name,
                            cities: objectData
                        })
                    }
                    countryList.push({
                        name: doc.name,
                        abbreviation: doc.iso,
                        states: regionsList
                    });

                } catch (e) {
                    console.log(e);
                }
            }
            var outputFilename = 'geoData.json';
            fs.writeFile(outputFilename, JSON.stringify(countryList, null, 4), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to " + outputFilename);
                }
            });
            if(err) error(err);

            response("This");
        });

    }
};

module.exports=helper;