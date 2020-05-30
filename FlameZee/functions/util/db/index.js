var types = require('./types.json');
function formatIcon(a) {
  return (a.startsWith('https:')?a.slice(49,-4):a).toString().replace(/_/g,'').replace(/munzee/g,'');
}
var typesByIcon = {};
for(var type of types) {
  for(var icon of [type.icon,...(type.alt_icons||[])]) {
    typesByIcon[formatIcon(icon)] = type;
  }
}

module.exports = {
  get(by,check){
    if(by==="icon") {
      return typesByIcon[formatIcon(check)];
      // return types.find(i=>[i.icon,...(i.alt_icons||[])].map(formatIcon).includes(formatIcon(check)));
    } else {
      return types.find(i[by]===check);
    }
  }
}