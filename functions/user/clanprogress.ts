var {retrieve,request,mhq} = require("../util");
var calculate = require("../util/clancalculator");

module.exports = {
  path: "user/clanprogress",
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
        for(var i = 3;i <= time.date();i++) {
          dates.push(i);
        }
        let allDays = await Promise.all(dates.map(i => request('statzee/player/day', { day: `${time.year()}-${(time.month()+1).toString().padStart(2,'0')}-${i.toString().padStart(2,'0')}` }, token.access_token)));
        var data = calculate(allDays);
        return {
          status: "success",
          data: data
        }
      },
    },
  ],
};
