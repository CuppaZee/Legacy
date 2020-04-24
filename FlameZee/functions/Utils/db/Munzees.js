var munzees = [];

var a = (munzee)=>munzees.push(munzee);

// Events
var event = ({name,id,icon})=>({
  name,
  icon,
  id,
  event: {
    custom: true
  },
  state: "physical",
  map_layer: "event",
  points: {
    capture: 0,
    deploy: 0,
    capon: 0
  },
  completion: "complete",
  category: "event"
})
var _events = require('./Munzees/Event.json');
_events.forEach((m)=>{
  a(event(m))
});






console.log(munzees);
module.exports = munzees.sort((a,b)=>a.id-b.id);