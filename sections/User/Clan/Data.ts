


// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/clan.js' or its corre... Remove this comment to see the full error message
import Clan from 'utils/db/clan.js';
function f(a: any) {
  return a.toString().replace(/_/g,'').replace(/munzee/g,'');
}
var count = (array: any) => {
  return Object.entries(array.reduce((a: any, b: any) => {
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



    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    points: i[1].points,



    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    total: i[1].total
  }));
}
export default function ClanProgressConverter(data={}) {
  var x = {



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'captures' does not exist on type '{}'.
    cap: count(data.captures||[]),



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deploys' does not exist on type '{}'.
    dep: count(data.deploys||[]),



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'captures_on' does not exist on type '{}'... Remove this comment to see the full error message
    con: count(data.captures_on||[])
  }
  var output = {};
  for(var task in Clan) {
    var task_data = Clan[task];



    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    output[task_data.task_id] = task_data.function(x);
  }
  return output;
}