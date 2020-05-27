var db = require("./db");
function g(a) {
  return db.get("icon", a.pin||a.pin_icon||a.icon||"")||{};
}
function points(a,b) {
  return a + Number(b.points_for_creator!==undefined?b.points_for_creator:b.points);
}

var tasks = {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => !g(i).personal).reduce((a,b)=>{
      a[(b.captured_at||b.deployed_at).slice(8,10)] = true;
      return a;
    },{})
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].reduce(points,0)
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep, arc, no_reduce }) => {
      return [...dep,...arc].filter(i => !g(i).personal).reduce((a,b)=>{
        if(b.archived_at) {
          if(no_reduce) {
            a[b.id] = "delete";
          } else {
            delete a[b.id];
          }
        } else {
          a[b.id] = true;
        }
        return a;
      },{});
    }
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep }) => dep.filter(i => !g(i).personal).reduce(points,0)
  },
  12: {
    task_id: 12,
    top: "Evo",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png"
    ],
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i).evolution).reduce(points,0)
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    function: ({ cap }) => cap.filter(i => g(i).poi).length
  },
  14: {
    task_id: 14,
    top: "Jewel",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualonyx.png"
    ],
    function: ({ cap, dep }) => [...dep, ...cap].filter(i => g(i).jewel).length
  },
  17: {
    task_id: 17,
    top: "Evo",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png"
    ],
    function: ({ cap, dep }) => [...dep, ...cap].filter(i => g(i).evolution).length
  },
  24: {
    task_id: 24,
    top: "Bouncer",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
      "https://munzee.global.ssl.fastly.net/images/pins/theunicorn.png",
      "https://munzee.global.ssl.fastly.net/images/pins/nomad.png",
      "https://munzee.global.ssl.fastly.net/images/pins/muru.png"
    ],
    function: ({ cap }) => cap.filter(i => g(i).bouncer).length
  },
  26: {
    task_id: 26,
    top: "Weapon",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/crossbow.png"
    ],
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => g(i).weapon==="clan").length
  },
  28: {
    task_id: 28,
    top: "Flat",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
      "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
    ],
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i).flat&&!g(i).unique).reduce(points,0)
  },
  31: {
    task_id: 32,
    top: "Gaming",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png"
    ],
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i).gaming).reduce(points,0)
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png"
    ],
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => g(i).gaming).length
  },
  33: {
    task_id: 32,
    top: "Renovate",
    bottom: "Motel",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
      "https://munzee.global.ssl.fastly.net/images/pins/2starmotel.png"
    ],
    function: ({ cap }) => cap.filter(i => g(i).icon==="renovation").length
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i).category==="mystery").reduce(points,0)
  }
}

function calculate(data = [], no_reduce) {
  console.log(data);
  var current_tasks = [
    1,
    3,
    13,
    24,
    34,
    6,
    17,
    26,
    28
  ]
  var all = {
    cap: [],
    con: [],
    dep: [],
    arc: [],
    no_reduce
  }
  var output = {};
  for (var day of data) {
    all.cap = all.cap.concat(day.captures)
    all.con = all.con.concat(day.captures_on)
    all.dep = all.dep.concat(day.deploys)
    all.arc = all.arc.concat(day.archived)
  }
  for (var task of current_tasks) {
    output[task] = tasks[task].function(all)
    if(!no_reduce && typeof output[task] === "object") output[task] = Object.keys(output[task]).length;
  }
  return output;
}

module.exports = calculate;