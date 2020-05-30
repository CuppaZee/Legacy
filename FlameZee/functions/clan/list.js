var Fuse = require('fuse.js');
module.exports = {
  path: "clan/list",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { query, limit, format } }) {
        var { clans: data } = (await db.collection('data').doc('clans').get()).data();
        var list = Object.entries(data).map(i => ({
          clan_id: Number(i[0]),
          name: i[1].name,
          tagline: i[1].tagline,
          logo: i[1].logo,
        }));
        if (query) {
          var fuse = new Fuse(list, {
            keys: [
              {
                name: 'name',
                weight: 0.7
              },
              {
                name: 'clan_id',
                weight: 0.15
              },
              {
                name: 'tagline',
                weight: 0.15
              },
            ]
          })

          list = fuse.search(query).map(i => i.item)
        }
        list = list.slice(0, Number(limit || (query ? "50" : "1000000")));
        if (format === "list") {
          return {
            status: "success",
            data: list
          }
        } else {
          return {
            status: "success",
            data: list.reduce((a, b, c) => {
              a[b.clan_id] = {
                name: b.name,
                tagline: b.tagline,
                logo: b.logo,
                index: c
              }
              return a;
            }, {})
          }
        }
      }
    }
  ]
}