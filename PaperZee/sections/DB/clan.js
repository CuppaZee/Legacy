import MunzeeTypes from './types.json';
function f(a) {
  return a.toString().replace(/_/g,'').replace(/munzee/g,'');
}
function g(a) {
  return MunzeeTypes.find(i=>f(i.icon)==f((a.pin||a.pin_icon||"").slice(49,-4)));
}
export default {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => !g(i)?.personal).length > 0 ? 1 : 0
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].reduce((a, b) => a + Number(b.points_for_creator || b.points), 0)
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep }) => {
      return dep.filter(i => !g(i)?.personal).length;
    }
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    function: ({ dep }) => dep.filter(i => !g(i)?.personal).reduce((a, b) => a + Number(b.points_for_creator || b.points), 0)
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
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.evolution).reduce((a, b) => a + Number(b.points_for_creator || b.points), 0)
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    function: ({ cap }) => cap.filter(i => g(i)?.poi).length
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
    function: ({ cap, dep }) => [...dep, ...cap].filter(i => g(i)?.jewel).length
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
    function: ({ cap, dep }) => [...dep, ...cap].filter(i => g(i)?.evolution).length
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
    function: ({ cap }) => cap.filter(i => g(i)?.bouncer).length
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
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => g(i)?.weapon=="clan").length
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
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.flat&&!g(i)?.unique).reduce((a, b) => a + Number(b.points_for_creator || b.points), 0)
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
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.gaming).reduce((a, b) => a + Number(b.points_for_creator || b.points), 0)
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
    function: ({ cap, dep }) => [...cap, ...dep].filter(i => g(i)?.gaming).length
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
    function: ({ cap }) => cap.filter(i => g(i)?.icon=="renovation").length
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    function: ({ cap, dep, con }) => [...cap, ...dep, ...con].filter(i => g(i)?.category=="mystery").reduce((a, b) => a + Number(b.points_for_creator || b.points), 0)
  }
}