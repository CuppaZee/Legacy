var { retrieve, request } = require("../util");
var radix64 = require('radix-64')();
var spherical = require('spherical');
var config = require('../config.json');
var fetch = require('node-fetch');

function generateBouncerHash(id, timestamp) {
  return `${radix64.encodeInt(id,5)}${radix64.encodeInt(timestamp%172800,3)}`
}

var devices = [
  {
    bouncers: {
      locations: [
        {
          name: "Home",
          latitude: 0,
          longitude: 0
        }
      ]
    }
  }
];

module.exports = {
  path: "minute/bouncers",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        var sent = new Set((await db.collection('data').doc('bouncer_notifications').get()).data().list.match(/.{8}/g));
        var data = await Promise.all([
          request('munzee/specials',                {}, token.access_token),
          request('munzee/specials/mythological',   {}, token.access_token),
          request('munzee/specials/pouchcreatures', {}, token.access_token),
          request('munzee/specials/flat',           {}, token.access_token),
          request('munzee/specials/bouncers',       {}, token.access_token),
          request('munzee/specials/retired',        {}, token.access_token),
        ]);
        var body = [].concat(...data).map(i=>({...i,hash:generateBouncerHash(Number(i.mythological_munzee?i.mythological_munzee.munzee_id:i.munzee_id), i.special_good_until)}));
        await db.collection('data').doc('bouncer_notifications').set({list:body.map(i=>i.hash).join('')});
        var bouncers = body.filter(i=>!sent.has(i.hash));
        let all = [];
        for(var device of devices) {
          for(var bouncer of bouncers) {
            let found = [];
            for(var location of device.bouncers.locations) {
              let distance = spherical.distance([location.longitude,location.latitude],[Number(bouncer.longitude),Number(bouncer.latitude)])
              if(distance < 5000) found.push({location,distance});
            }
            if(found.length > 0) {
              all.push({found,bouncer});
              await fetch(
                config.discord.bouncer_test,
                {
                  method: "POST",
                  body: new URLSearchParams({
                    content: `\`\`\`json\n${JSON.stringify(bouncer, null, 2)}\`\`\`${found.map(i=>`${i.distance}m from ${i.location.name}`)}`
                  })
                }
              )
            }
          }
        }
        return {
          status: "success",
          data: {
            list: all,
            bouncers
          }
        }
      },
    },
  ],
};
