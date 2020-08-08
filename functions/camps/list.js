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
  path: "camps/list",
  latest: 1,
  versions: [
    // {
    //   version: 1,
    //   params: {},
    //   async function({ db }) {
    //     var d = (await db.collection('campsv2').doc('_total').get()).data();
    //     var teamList = [];
    //     for(var teamI in d) {
    //       var team = d[teamI]
    //       teamList.push({
    //         total: team.total,
    //         members: team.members,
    //         id: team.id,
    //         name: names[team.id],
    //         icon: icons[team.id]
    //       });
    //     }
    //     teamList.sort((a,b)=>b.total-a.total);
    //     return {
    //       status: "success",
    //       data: teamList
    //     }
    //   }
    // },
    {
      version: 2,
      params: {},
      async function({ db, params: { week } }) {
        var d = (await db.collection('campsv2').doc('_total').get()).data();
        var teamList = [];
        for(var teamI in d) {
          var team = d[teamI]
          teamList.push({
            total: team[week==="overall"?"total":"total_"+week],
            id: team.id,
            name: names[team.id],
            icon: icons[team.id]
          });
        }
        teamList.sort((a,b)=>b.total-a.total);
        return {
          status: "success",
          data: Date.now()>1597035599000?[]:teamList
        }
      }
    }
  ]
}