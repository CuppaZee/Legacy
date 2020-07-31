var { retrieve, request } = require("../util");
var rndKey = (length) => {
  var x = '';
  for (var i = 0; i < length; i++) {
    x += Math.floor(Math.random() * 10000).toString(36);
  }
  return x;
};

module.exports = {
  path: "user/activity",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({ params: { user_id, day }, db }) {
        var token = await retrieve(db, { user_id, teaken: false }, 60);
        var data = await request('statzee/player/day', { day }, token.access_token)
        if (!token || !data) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: Object.assign({}, data, {
            captures: data.captures.map(i => ({
              ...i,
              key: rndKey(3)
            })),
            deploys: data.deploys.map(i => ({
              ...i,
              key: rndKey(3)
            })),
            captures_on: data.captures_on.map(i => ({
              ...i,
              key: rndKey(3)
            }))
          })
        }
      },
    },
  ],
};
