GeographyData
======

###### This is a small project created with the aim to help people with their country, state and city classification woes.
<dl>
  <dt>Some basic info</dt>
  <dd>You can use this small REST service to get all the country, state, region and city info for any country you can think of. The list is a bit old, but I think it should serve it's purpose.</dd>
</dl>

Usage
------
| URL           | Type | Parameters                       | Returns                        |
| ------------- |:----:|:--------------------------------:|:------------------------------:|
| /             | GET  | ?country=[String]&state=[String] | JSON array of cities           |
| /countries    | GET  |                                  | JSON array of countries        |
| /states       | GET  | ?country=[String]                | JSON array of states by country|
| /cities       | GET  | ?country=[String]?state=[String] | JSON array of cities by state  |

| URL                       | Type | Parameters                       | Returns                        |
| --------------------------|:----:|:--------------------------------:|:------------------------------:|
| /countryName/stateName    | GET  |                                  | JSON array of requested data   |


##### Formatting of one of the country JSON Array elements (In the geoData.json file): 
```javascript
{ 
  "name": "Bermuda",
  "abbreviation": "BM",
  "states": [ { "name": "Warwick", "sourceName": "Warwick Parish", "cities": []},
              { "name": "Southampton", "sourceName": "Southampton Parish", "cities": [] },
              { "name": "Smithʼs", "sourceName": "Smith's Parish", "cities": [] },
              { "name": "Sandys", "sourceName": "Sandys Parish", "cities": [] },
              { "name": "Saint Georgeʼs", "sourceName": "Saint George's Parish", "cities": [] },
              { "name": "Saint George", "sourceName": "Saint George", 
                "cities": [
                  {
                    "asciiName": "Saint George",
                      "alternateNames": [
                        "Saint George",
                        "Saint George's Town",
                        "Saint Georges",
                        "Saint George’s Town"
                        ],
                        "originalName": "Saint George"
                    }
                ] },
            { "name": "Pembroke", "sourceName": "Pembroke Parish", "cities": [] },
            { "name": "Paget", "sourceName": "Paget", "cities": [] },
            { "name": "Hamilton Parish", "sourceName": "Hamilton Parish", "cities": [] },
            { "name": "Hamilton city", "sourceName": "Hamilton city", 
              "cities": [
                {
                  "asciiName": "Hamilton",
                  "alternateNames": ["Hamilton"],
                  "originalName": "Hamilton"
                } 
              ] },
            { "name": "Devonshire", "sourceName": "Devonshire Parish", "cities": [] }
      ]
    }
```

Countries array
------
##### A part of the countries array on the /countries request
```javascript
[{"name":"Afghanistan","abbreviation":"AF"},{"name":"Aland Islands","abbreviation":"AX"},{"name":"Albania","abbreviation":"AL"},{"name":"Algeria","abbreviation":"DZ"},{"name":"American Samoa","abbreviation":"AS"},{"name":"Andorra","abbreviation":"AD"} ... ]
```

States array
------
##### A part of the states array on the /states request
```javascript
[{"name":"Thuringia","sourceName":"Thuringia"},{"name":"Schleswig-Holstein","sourceName":"Schleswig-Holstein"},{"name":"Saxony-Anhalt","sourceName":"Saxony-Anhalt"}, ...]
```

Cities array
------
##### A part of the cities array on the /cities request
```javascript
[{"name":"Thuringia","sourceName":"Thuringia"},{"name":"Schleswig-Holstein","sourceName":"Schleswig-Holstein"},{"name":"Saxony-Anhalt","sourceName":"Saxony-Anhalt"}, ... ,{"name":"Baden-Württemberg","sourceName":"Baden-Wuerttemberg"}]
```


