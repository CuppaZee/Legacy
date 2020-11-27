var {retrieve,request,mhq} = require("../util");
var db = require("../util/db");
function g(a) {
  return db.get("icon", a.pin || a.pin_icon || a.icon || "") || {};
}

module.exports = {
  path: "user/potm/sept2020",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({ params: { user_id }, db }) {
        var token = await retrieve(db, { user_id, teaken: false }, 60);
        var dates = [];
        var time = mhq();
        for(var i = 1;i <= (time.month()>8?30:time.date());i++) {
          dates.push(i);
        }
        let allDays = await Promise.all(dates.map(i => request('statzee/player/day', { day: `2020-09-${i.toString().padStart(2,'0')}` }, token.access_token)));
        var all = []
        for (var day of allDays) {
          all = all.concat(day.captures)
        }
        return {
          status: "success",
          data: all.filter(i=>g(i).scatter)
        }
      },
    },
  ],
};
