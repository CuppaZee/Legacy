var types = require('./types.json');
var typekeys = require('./typekeys.json');
// function formatIcon(a) {
//   return (a.startsWith('https:')?a.slice(49,-4):a).toString().replace(/_/g,'').replace(/munzee/g,'');
// }
// var typesByIcon = {};
// for(var type of types) {
//   for(var icon of [type.icon,...(type.alt_icons||[])]) {
//     typesByIcon[formatIcon(icon)] = type;
//   }
// }
function g(icon) {
  if(icon.startsWith('https://')) icon = icon.slice(49,-4);
  return decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'').replace(/munzee$/,'');
}

module.exports = {
  get(by,check){
    if(by==="icon") {
      return types[typekeys[g(check)]];
      // return types.find(i=>[i.icon,...(i.alt_icons||[])].map(formatIcon).includes(formatIcon(check)));
    } else {
      return types.find(i[by]===check);
    }
  }
}