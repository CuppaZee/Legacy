import Clan from '~db/clan.js';
function f(a) {
  return a.toString().replace(/_/g,'').replace(/munzee/g,'');
}
var count = (array) => {
  return Object.entries(array.reduce((a, b) => {
    let x = b.pin.slice(49,-4)
    if(!a[x]) a[x] = {
      points: 0,
      total: 0
    };
    a[x].points+=Number(b.points_for_creator??b.points);
    a[x].total++;
    return a;
  }, {})).map(i=>({
    icon: f(i[0]),
    points: i[1].points,
    total: i[1].total
  }));
}
export default function ClanProgressConverter(data={}) {
  var x = {
    cap: count(data.captures||[]),
    dep: count(data.deploys||[]),
    con: count(data.captures_on||[])
  }
  // return {};
  var output = {};
  for(var task in Clan) {
    var task_data = Clan[task];
    output[task_data.task_id] = task_data.function(x);
  }
  return output;
}