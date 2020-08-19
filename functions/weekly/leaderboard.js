module.exports = {
  path: "weekly/leaderboard",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { week_id } }) {
        const data = Object.entries((await db.collection('weekly').doc(week_id).get()).data().players).map(([i, { n, p, f }]) => ({ i: Number(i), n, p, f: f?1:undefined })).sort((a, b) => b.p - a.p);
        return {
          status: "success",
          data,
        }
      }
    }
  ]
}