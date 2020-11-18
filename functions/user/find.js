var { retrieve, request } = require("../util");

module.exports = {
  path: "user/find",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid",
        },
      },
      async function({ params: { text }, db }) {
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        if (!token) {
          return {
            status: "error",
            error_message: "missing_login"
          }
        }
        var data = await request('user/find', { text }, token.access_token)
        if (!data) {
          return {
            status: "error",
            error_message: "munzee_api_5xx"
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
