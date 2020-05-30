var x = require('./2020list');
var fs = require('fs');
var y = x.map(i=>({
  name: i.label,
  category: i.label.toLowerCase().replace(/\s/g,''),
  year: 2020,
  starts: "2020-",
  ends: "2020-",
  specials: i.munzees.map(x=>({
    name: x[1],
    icon: x[0],
    id: 0,
    duration: 6,
    lands_on: ["munzee"]
  }))
}))

fs.writeFileSync('2020.js',JSON.stringify(y,null,2));