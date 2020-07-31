var f = require('./data/f');
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
  path: "camps/team",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { team: teamID, week } }) {
        var team = (await db.collection('campsv2').doc(teamID).get()).data();
        var members = team.users.map(user=>({
          n: user.n,
          i: user.i,
          p: f(user, week)
        }));
        var td = {
          total: members.reduce((a,b)=>a+b.p,0),
          members: members.filter(i=>i.p>0),
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