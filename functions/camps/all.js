var names = {
  "cap-a-lot": "Camp Cap-A-Lot",
  "qrantine": "Camp QRantine",
  "freez": "Camp FrEEZ",
  "kennezee": "Camp KenneZee"
}
var icons = {
  "cap-a-lot": "campcap-a-lotflag",
  "qrantine": "campqrantineflag",
  "freez": "campfreezflag",
  "kennezee": "campkennezeeflag"
}

module.exports = {
  path: "camps/all",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        var d = (await db.collection('camps').where('_updated_at', ">", 0).get()).docs.map(i=>i.data());
        var data = d.map(team=>{
          var td = {
            total: 0,
            members: [],
            id: team.id,
            name: names[team.id],
            icon: icons[team.id]
          };
          for (var user of team.users) {
            td.total += user.points||0;
            td.members.push({
              n: user.username,
              i: user.user_id,
              c: user.cap||[0,0,0,0,0,0,0,0],
              p: user.points||0
            })
          }
          td.members.sort((a,b)=>[a.n,b.n].sort()[0]===a?1:-1);
          td.members.sort((a,b)=>b.p-a.p);
          return td;
        })
        data.sort((a,b)=>b.total-a.total);
        return {
          status: "success",
          data: Date.now()>1597035599000?null:data
        }
      }
    },
    {
      version: 2,
      params: {},
      async function({ db }) {
        console.log('GETTING CAMP DATA')
        var d = (await db.collection('camps').where('_updated_at', ">", 0).get()).docs.map(i=>i.data());
        console.log('FINISHED GETTING CAMP DATA')
        var data = d.map(team=>{
          var td = {
            total: 0,
            members: [],
            id: team.id,
            name: names[team.id],
            icon: icons[team.id]
          };
          for (var user of team.users) {
            td.total += user.p||user.points||0;
            td.members.push({
              n: user.n||user.username,
              i: user.i||user.user_id,
              p: user.p||user.points||0
            })
          }
          td.members.sort((a,b)=>[a.n,b.n].sort()[0]===a?1:-1);
          td.members.sort((a,b)=>b.p-a.p);
          return td;
        })
        data.sort((a,b)=>b.total-a.total);
        console.log('RETURNING CAMP DATA')
        return {
          status: "success",
          data: Date.now()>1597035599000?null:data
        }
      }
    },
    {
      version: 3,
      params: {},
      async function({ db, params: {team:teamID, __hidden} }) {
        var team = (await db.collection('campsv2').doc(teamID).get()).data();
        var td = {
          total: (!__hidden && Date.now()>1597035599000)?0:team.total,
          members: (!__hidden && Date.now()>1597035599000)?[]:team.users.map(user=>({
            n: user.n,
            i: user.i,
            p: user.p||0
          })),
          id: team.id,
          name: names[team.id],
          icon: icons[team.id]
        };
        td.members.sort((a,b)=>b.p-a.p);
        return {
          status: "success",
          data: td
        }
      }
    }
  ]
}