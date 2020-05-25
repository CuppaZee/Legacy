var {retrieve,request} = require("../util");

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
        var token = await retrieve(db, {user_id,teaken:false}, 60);
        var data = await request('statzee/player/day',{day},token.access_token)
        if(!token || !data) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: data
        }
      },
    },
  ],
};
