var retrieve = require("../retrievetoken");

module.exports = {
  path: "auth/get",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({ params: { teaken, user_id, time }, db }) {
        var got = await retrieve(db, {user_id,teaken}, time?Number(time):7500);
        if(!got) {
          return {
            status: "error",
            data: null
          }
        }
        return {
          status: "success",
          data: got
        }
      },
    },
  ],
};
