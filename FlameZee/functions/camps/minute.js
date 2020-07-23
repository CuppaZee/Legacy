var { retrieve, request } = require('../util');
var f = require('./data/f');

var types = ["redwaterballoon", "greenwaterballoon", "bluewaterballoon", "yellowwaterballoon", "campcap-a-lotflag", "campqrantineflag", "campfreezflag", "campkennezeeflag"];

module.exports = {
  path: "minute/camps",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 180, "team");
        var teamDoc = (await db.collection(`campsv2`).where('_updated_at', ">", 0).orderBy('_updated_at').limit(1).get()).docs[0]
        var teamData = teamDoc.data();
        var users = teamData.users || [];
        var weeks = {
          week1: 0,
          week2: 0,
          week3: 0,
          week4: 0,
        }
        users.sort((a, b) => (a.e || a.expires || 0) - (b.e || b.expires || 0));
        teamData.total = 0;
        users = await Promise.all(users.map(async (user, index) => {
          if (user.username) {
            user.n = user.username;
            delete user.username;
          }
          if (user.user_id) {
            user.i = user.user_id;
            delete user.user_id;
          }
          if (user.expires) {
            user.e = user.expires;
            delete user.expires;
          }
          if (user.points!==undefined) {
            user.p = user.points;
            delete user.points;
          }
          if (index < 200) {
            try {
              user.cap = [];
              let data = await request('user/specials', { user_id: user.i }, token.access_token);
              for (var type of types) {
                user.cap.push((data.find(i => i.logo === type) || {}).count || 0)
              }
              user.p = user.cap.slice(0, 4).reduce((a, b) => a + b, 0);
              user.p += (user.cap.slice(4).reduce((a, b) => a + b, 0)) * 5;
              delete user.cap;
              user.e = Date.now();
            } catch (e) {
              console.log(e);
            }
          }
          weeks.week1 += f(user, "week1");
          weeks.week2 += f(user, "week2");
          weeks.week3 += f(user, "week3");
          weeks.week4 += f(user, "week4");
          teamData.total += Number(user.p||0)||0;
          return user;
        }));
        teamData._updated_at = Date.now();
        teamDoc.ref.set(teamData);
        var x = {};
        x[teamData.id] = {
          total: teamData.total,
          total_week1: weeks.week1,
          total_week2: weeks.week2,
          total_week3: weeks.week3,
          total_week4: weeks.week4,
          id: teamData.id,
          members: teamData.users.map(i=>i.n)
        };
        db.collection(`campsv2`).doc('_total').set(x,{merge:true})
        return {
          status: "success",
          data: 1
        };
      }
    }
  ]
}