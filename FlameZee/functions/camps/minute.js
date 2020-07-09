var { retrieve, request } = require('../util');

var types = ["redwaterballoon","greenwaterballoon","bluewaterballoon","yellowwaterballoon"];

module.exports = {
  path: "minute/camps",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 180, "team");
        var teamDoc = (await db.collection(`camps`).orderBy('_updated_at').limit(1).get()).docs[0]
        var teamData = teamDoc.data();
        var users = teamData.users||[];
        users.sort((a,b)=>(a.expires||0)-(b.expires||0));
        teamData.total = 0;
        users = await Promise.all(users.map(async (user,index)=>{
          if(index>199) return user;
          try {
            user.cap = [];
            let data = await request('user/specials', { user_id: user.user_id }, token.access_token);
            for(var type of types) {
              user.cap.push((data.find(i=>i.logo===type)||{}).count||0)
            }
            user.points = user.cap.slice(0,4).reduce((a,b)=>a+b,0);
            user.points += (user.cap.slice(4).reduce((a,b)=>a+b,0)) * 5;
            user.expires = Date.now();
          } catch(e) {
            console.log(e);
          }
          return user;
        }));
        teamData._updated_at = Date.now();
        teamDoc.ref.set(teamData);
        return {
          status: "success",
          data: 1
        };
      }
    }
  ]
}