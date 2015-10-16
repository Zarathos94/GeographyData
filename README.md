GeographyData
======

###### This is a small project created with the aim to help people with their country, state and city classification woes.
<dl>
  <dt>Some basic info</dt>
  <dd>You can use this small REST service to get all the country, state, region and city info for any country you can think of. The list is a bit old, but I think it should serve it's purpose.</dd>
</dl>

Usage
------
| URL           | Parameters                       | Returns                        |
| ------------- |:--------------------------------:| ------------------------------:|
| /             | ?country=[String]&state=[String] | JSON array of cities           |
| /countries    |                                  | JSON array of countries        |
| /states       | ?country=[String]                | JSON array of states by country|
| /cities       | ?country=[String]?state=[String] | JSON array of cities by state  |
