const config = require('../../config.json');

module.exports = {
  path: "competition/admin/list",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ params: { key }, teamsData }) {
        if(key !== config.zeecret_competition_key) {
          return {
            status: "error",
            data: "Don't even try. 😜"
          }
        }
        const teams = await teamsData();
        return {
          status: "success",
          data: teams
        };
      },
    },
  ],
};