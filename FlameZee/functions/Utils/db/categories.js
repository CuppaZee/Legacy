var fs = require('fs');
var categories = require('./Categories.json');

fs.writeFileSync('Categories.json',JSON.stringify(Object.fromEntries(Object.entries(categories).map(i=>{
  i[1] = {title:i[1]};
  return i;
})),null,2))