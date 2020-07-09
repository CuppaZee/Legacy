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
        var teams = ["cap-a-lot","qrantine","freez","kennezee"];
        var d = (await Promise.all(teams.map(i=>db.collection(`camps`).doc(i).get()))).map(i=>i.data());
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
              c: user.cap||[0,0,0,0,0,0,0,0,0],
              p: user.points||0
            })
          }
          td.members.sort((a,b)=>b.p-a.p);
          return td;
        })
        data.sort((a,b)=>b.total-a.total);
        return {
          status: "success",
          data
        }
      }
    }
  ]
}