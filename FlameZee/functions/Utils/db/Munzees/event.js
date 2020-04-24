var fs = require('fs');
var events = require('./Event.json');

fs.writeFileSync('Event.json',JSON.stringify(events.map(i=>({
  name: i.name,
  icon: i.icon,
  id: i.id
})).filter(i=>i.id!==undefined),null,2))