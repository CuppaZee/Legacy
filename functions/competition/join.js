module.exports = {
  path: "competition/join",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ params: { username }, teamsData }) {
        const teams = await teamsData();
        let team = teams.sort((a, b) => a.list.length - b.list.length)[0].team_id
        if (username) {
          const userTeam = teams.find(i => (i.list && i.list.some(i => i.n.toLowerCase() === username.toLowerCase())));
          if (userTeam) {
            team = userTeam.team_id;
          }
        }
        return {
          status: "success",
          data: {
            team
          }
        };
      },
    },
  ],
};