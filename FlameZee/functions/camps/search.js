var Fuse = require('fuse.js');
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
  path: "camps/search",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { search } }) {
        var d = (await db.collection('campsv2').doc('_total').get()).data();
        var list = [].concat(...(Object.entries(d).map(i => i[1].members.map(x=>({
          camp: i[0],
          name: x,
        })))));
        var fuse = new Fuse(list, {
          keys: [
            "name"
          ]
        })
        var list2 = fuse.search(search).map(i => i.item)
        return {
          status: "success",
          data: {
            list: list2.slice(0,10).map(i=>({
              name: i.name,
              camp: i.camp,
              camp_name: names[i.camp],
              camp_icon: icons[i.camp],
            })),
            has_more: list2.length > 10
          }
        }
      }
    }
  ]
}