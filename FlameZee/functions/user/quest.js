var { retrieve, request } = require("../util");
var db = require("../util/db");
function g(a) {
  return db.get("icon", a.pin||a.pin_icon||a.icon||"")||{};
}
var path = require('path');
var geocoder = require('offline-geocoder')({ database: path.join(__dirname,'../util/geolocate/db.sqlite') })

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
      async function({ params: { user_id }, db }) {
        var month = "05";
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        function c(i) {
          return Number((i.captured_at || i.deployed_at).slice(8, 10)) > 2;
        }
        var tasks = [
          { id: 1, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).category==="mystery").length },
          { id: 2, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).evolution).length },
          { id: 3, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).weapon==="clan").length },
          { id: 4, function: ({ cap, dep }) => [...cap, ...dep].filter(i => c(i) && g(i).jewel).length },
          { id: 5, function: ({ cap }) => cap.filter(i => (i.url || "").includes("XeresDan/1707")).length }
        ]

        var output = {};

        var captures = [];
        for (var i = 0; i < 50; i++) {
          let x = await request('user/captures', {
            page: i,
            user_id
          }, token.access_token);
          captures = captures.concat(x)
          if (!x[0] || !x[0].captured_at.startsWith('2020-'+month)) {
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
          if (!x.munzees[0] || !x.munzees[0].deployed_at.startsWith('2020-'+month)) {
            break;
          }
        }
        captures = captures.filter(i => i.captured_at.startsWith('2020-'+month))
        deploys = deploys.filter(i => i.deployed_at.startsWith('2020-'+month))
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
