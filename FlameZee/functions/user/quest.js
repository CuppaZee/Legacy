var { retrieve, request } = require("../util");
var db = require("../util/db");
function g(a) {
  return db.get("icon", a.pin || a.pin_icon || a.icon || "") || {};
}
var path = require('path');
var geocoder = require('offline-geocoder')({ database: path.join(__dirname, '../util/geolocate/db.sqlite') })

function c(i) {
  return Number((i.captured_at || i.deployed_at).slice(8, 10)) > 2 && Number((i.captured_at || i.deployed_at).slice(8, 10)) < 29;
}
var games = {
  1: {
    tasks: [
      { id: 1, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).category === "mystery").length },
      { id: 2, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
      { id: 3, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).weapon === "clan").length },
      { id: 4, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).jewel).length },
      { id: 5, function: ({ cap }) => cap.filter(i => (i.url || "").includes("XeresDan/1707")).length },
    ],
    month: "05",
    year: "2020"
  },
  2: {
    tasks: [
      { id: 1, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).category === "mystery").length },
      { id: 2, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
      { id: 6, function: ({ dep }) => dep.filter(i => c(i) && g(i).flat && !g(i).unique).length },
      { id: 7, function: ({ cap, dep }) => [...cap,...dep].filter(i => c(i) && g(i).destination).length },
      { id: 8, function: ({ cap }) => cap.filter(i => c(i) && g(i).bouncer).length },
    ],
    month: "06",
    year: "2020"
  },
  3: {
    tasks: [
      { id: 1, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).category === "mystery").length },
      { id: 2, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
      { id: 9, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).flat && !g(i).unique).length },
      { id: 7, function: ({ cap, dep }) => [...cap,...dep].filter(i => c(i) && g(i).destination).length },
      { id: 10, function: ({ cap }) => cap.filter(i => (i.url || "").includes("m/GPSmAQ/1")).length },
    ],
    month: "07",
    year: "2020"
  }
}

module.exports = {
  path: "user/quest",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({ params: { user_id, game_id = 1 }, db }) {
        var month = games[game_id].month;
        var year = games[game_id].year;
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        var tasks = games[game_id].tasks

        var output = {};

        function checkTime(time) {
          console.log(time);
          if (!time) return false;
          if (Number(time.slice(0, 4)) > Number(year)) {
            return true;
          } else if (Number(time.slice(0, 4)) === Number(year) && Number(time.slice(5, 7)) >= Number(month)) {
            return true;
          }
          return false;
        }

        var captures = [];
        for (var i = 0; i < 50; i++) {
          let x = await request('user/captures', {
            page: i,
            user_id
          }, token.access_token);
          captures = captures.concat(x)
          if (!x[0] || !checkTime(x[0].captured_at)) {
            console.log(user_id, game_id, 'Breaking at', i);
            break;
          }
        }

        var deploys = [];
        for (i = 0; i < 50; i++) {
          let x = await request('user/deploys', {
            page: i,
            user_id
          }, token.access_token);
          deploys = deploys.concat(x.munzees)
          if (!x.munzees[0] || !checkTime(x.munzees[0].deployed_at)) {
            break;
          }
        }
        captures = captures.filter(i => i.captured_at.startsWith(year + '-' + month))
        deploys = deploys.filter(i => i.deployed_at.startsWith(year + '-' + month))
        for (var capture of captures) {
          capture.location = await geocoder.reverse(capture.latitude, capture.longitude);
        }
        for (var deploy of deploys) {
          deploy.location = await geocoder.reverse(deploy.latitude, deploy.longitude);
        }
        captures = captures.filter(i => (Number(i.latitude) === 0 && Number(i.longitude) === 0) || (i.location && i.location.admin1 && i.location.admin1.name === "Quebec"))
        deploys = deploys.filter(i => (Number(i.latitude) === 0 && Number(i.longitude) === 0) || (i.location && i.location.admin1 && i.location.admin1.name === "Quebec"))

        for (let task of tasks) {
          output[task.id] = (output[task.id] || 0) + task.function({ cap: captures, dep: deploys });
        }
        return {
          status: "success",
          data: output
        }
      },
    },
  ],
};
