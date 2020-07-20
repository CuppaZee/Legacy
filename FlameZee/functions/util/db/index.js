var types = require('./types.json');
var typekeys = require('./typekeys.json');
var idkeys = require('./idkeys.json');
function g(icon) {
  if(icon.startsWith('https://munzee.global')) icon = icon.slice(49,-4);
  var x = decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'');
  if(x!=="munzee"&&x.endsWith('munzee')) return x.replace(/munzee$/,'')
  return x;
}

module.exports = {
  get(by,check){
    if(by==="icon") {
      return types[typekeys[g(check)]];
    } else if(by==="id") {
      return types[idkeys[check]];
    } else {
      return types.find(i=>i[by]===check);
    }
  },
  g
}