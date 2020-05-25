var types = require('./types.json');
function formatIcon(a) {
  return (a.startsWith('https:')?a.slice(49,-4):a).toString().replace(/_/g,'').replace(/munzee/g,'');
}

module.exports = {
  get(by,check){
    if(by==="icon") {
      return types.find(i=>[i.icon,...(i.alt_icons||[])].map(formatIcon).includes(formatIcon(check)));
    } else {
      return types.find(i[by]===check);
    }
  }
}