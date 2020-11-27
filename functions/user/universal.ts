var {request,retrieve} = require("../util");
const types = require('./universal_types.json');

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports = {
  path: "user/universal",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({ params: { username, access_token }, db }) {
        var data = (await db.collection('data').doc('universal').get()).data().munzees.map(i=>i.split('/')).filter(i=>i[0]!==username);
        var valid = new Set(Object.entries(await request('munzee/hascaptured', { munzee_ids: data.map(i=>i[3]).join(',') }, access_token)).filter(i=>!i[1]).map(i=>i[0]));
        return {
          status: "success",
          data: shuffle(data.filter(i=>valid.has(i[3])).map(i=>i.slice(0,3).join('/')))
        }
      },
    },
    {
      version: 2,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({ params: { username, access_token }, db }) {
        var data = (await db.collection('data').doc('universal').get()).data().munzees.map(i=>i.split('/')).filter(i=>i[0]!==username);
        var valid = new Set(Object.entries(await request('munzee/hascaptured', { munzee_ids: data.map(i=>i[3]).join(',') }, access_token)).filter(i=>!i[1]).map(i=>i[0]));
        return {
          status: "success",
          data: shuffle(data.filter(i=>valid.has(i[3])).map(i=>({
            munzee: i.slice(0,3).join('/'),
            type: types.find(i=>i.id===i[4]||"0"),
            munzee_id: i[3]
          })))
        }
      },
    },
    {
      version: 3,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({ params: { username, access_token }, db }) {
        var data = (await db.collection('data').doc('universal').get()).data().munzees.map(i=>i.split('/')).filter(i=>i[0]!==username);
        var valid = new Set(Object.entries(await request('munzee/hascaptured', { munzee_ids: data.map(i=>i[3]).join(',') }, access_token)).filter(i=>!i[1]).map(i=>i[0]));
        return {
          status: "success",
          data: {
            munzees: shuffle(data.filter(i=>valid.has(i[3])).map(i=>({
              munzee: i.slice(0,3).join('/'),
              type: types.find(x=>x.id===(i[4]||"0")),
              munzee_id: i[3]
            }))),
            total: data.length,
            capped: data.filter(i=>!valid.has(i[3])).length,
            types
          }
        }
      },
    },
    {
      version: 4,
      params: {
        user_id: {
          type: "user_id",
        },
      },
      async function({ params: { username, access_token, filter }, db }) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 60, 'universal');
        var data = (await db.collection('data').doc('universal').get()).data().munzees.map(i=>i.split('/')).filter(i=>i[0]!==username);
        data = data.filter(i=>!(filter||"").split(',').includes(i[4]||"0"))
        var valid = new Set(Object.entries(await request('munzee/hascaptured', { munzee_ids: data.map(i=>i[3]).join(',') }, access_token)).filter(i=>!i[1]).map(i=>i[0]));
        return {
          status: "success",
          data: {
            munzees: shuffle(data.filter(i=>valid.has(i[3])).map(i=>({
              munzee: i.slice(0,3).join('/'),
              type: types.find(x=>x.id===(i[4]||"0")),
              munzee_id: i[3]
            }))),
            total: data.length,
            capped: data.filter(i=>!valid.has(i[3])).length,
            types,
            cacheID: Math.floor(Math.random()*10000),
            token: token.access_token
          }
        }
      },
    },
  ],
};
