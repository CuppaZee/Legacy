var users = require('../data/camps.json');

module.exports = {
  path: "camps/addusers",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { team } }) {
        var data = (await db.collection(`campsv2`).doc(team).get()).data();
        data.users = data.users.filter(user=>users[team].find(i=>i.user_id===user.i));
        for(var user of users[team]) {
          if(!data.users.find(i=>i.i===user.user_id)) {
            data.users.push({
              i: user.user_id,
              n: user.username,
              p: 0,
              e: 10
            })
          }
        }
        await db.collection(`campsv2`).doc(team).set(data);
        return {
          status: "success",
          data: data
        }
      }
    }
  ]
}