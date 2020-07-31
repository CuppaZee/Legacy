module.exports = {
  path: "camps/raw",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { team: teamID } }) {
        var team = (await db.collection('campsv2').doc(teamID).get()).data();
        return {
          status: "success",
          data: team
        }
      }
    }
  ]
}