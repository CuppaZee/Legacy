import MunzeeTypes from './types.json';
var types = MunzeeTypes.map(i=>{
  return {
    ...i,
    icon: f(i.icon)
  };
})
function f(a) {
  return a.toString().replace(/_/g,'').replace(/munzee/g,'');
}
function g(a) {
  return types.find(i=>i.icon==a.icon);
}
function points(a,b) {
  return a + b.points;
}
function total(a,b) {
  return a + b.total;
}
export default {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => !g(i)?.personal).reduce(total,0) > 0 ? 1 : 0
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
    function: ({ dep }) => {
      return dep.filter(i => !g(i)?.personal).reduce(total,0);
    }
  },
  7: {
    task_id: 7,
    top: "Dest.",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/hotel.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/1starmotel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualresort.png"
    ],
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.destination).reduce(points,0)
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep }) => dep.filter(i => !g(i)?.personal).reduce(points,0)
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
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.evolution).reduce(points,0)
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    function: ({ cap }) => cap.filter(i => g(i)?.poi).reduce(total,0)
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
    function: ({ cap, dep }) => [...dep, ...cap].filter(i => g(i)?.jewel).reduce(total,0)
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
    function: ({ cap, dep }) => [...dep, ...cap].filter(i => g(i)?.evolution).reduce(total,0)
  },
  19: {
    task_id: 19,
    top: "Jewel",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtual_citrine.png"
    ],
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.category=="jewel").reduce(points,0)
  },
  23: {
    task_id: 23,
    top: "Weapon",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png"
    ],
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.weapon=="clan").reduce(points,0)
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
    function: ({ cap }) => cap.filter(i => g(i)?.bouncer).reduce(total,0)
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
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => g(i)?.weapon=="clan").reduce(total,0)
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
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.flat&&!g(i)?.unique).reduce(points,0)
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
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.gaming).reduce(points,0)
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
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => g(i)?.gaming).reduce(total,0)
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
    function: ({ cap }) => cap.filter(i => g(i)?.icon=="renovation").reduce(total,0)
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.category=="mystery").reduce(points,0)
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrewzee.png",
    function: ({ cap }) => cap.filter(i => g(i)?.icon=="qrewzee").reduce(total,0)
  }
}