module.exports = {
  path: "competition/users",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ params: { users }, teamsData }) {
        const teams = await teamsData();
        return {
          status: "success",
          data: users.split(',').reduce((a, b) => {
            const team = teams.find(i => (i.list && i.list.some(i=>i.n.toLowerCase()===b.toLowerCase())));
            return {
              ...a,
              [b]: team ? team.team_id : null,
            }
          }, {})
        };
      },
    },
    {
      version: 2,
      params: {},
      async function({ params: { users }, teamsData }) {
        const teams = await teamsData();
        return {
          status: "success",
          data: users.split(',').reduce((a, b) => {
            const team = teams.find(i => (i.list && i.list.some(i=>i.n.toLowerCase()===b.toLowerCase())));
            return {
              ...a,
              [b]: team ? `${team.team_id}_${team.fixed[team.list.find(i=>i.n.toLowerCase()===b.toLowerCase()).i]}` : null,
            }
          }, {})
        };
      },
    },
  ],
};