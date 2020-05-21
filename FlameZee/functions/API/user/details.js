module.exports = {
  path: "user/details",
  latest: 2,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "userid"
        }
      },
      async function (params) {
        return {
          type: "success",
          data: "hello"
        };
      }
    },
    {
      version: 2,
      params: {
        user_id: {
          type: "userid"
        }
      },
      async function (params) {
        return {
          type: "success",
          data: "hello"
        };
      }
    },
  ]
}