var { retrieve, request } = require("../util");

module.exports = {
  path: "bouncers/list",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { list } }) {
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        var data = await Promise.all([
          request('munzee/specials', {}, token.access_token),
          request('munzee/specials/mythological', {}, token.access_token),
          request('munzee/specials/pouchcreatures', {}, token.access_token),
          request('munzee/specials/flat', {}, token.access_token),
          request('munzee/specials/bouncers', {}, token.access_token),
          request('munzee/specials/retired', {}, token.access_token)
        ]);
        var body = [].concat(...data);
        var output = body.filter(i => list.split(',').includes((i.mythological_munzee ? i.mythological_munzee.munzee_logo : i.logo).slice(49, -4))).map(i => [
          Number(i.latitude),
          Number(i.longitude),
          list.split(',').indexOf((i.mythological_munzee ? i.mythological_munzee.munzee_logo : i.logo).slice(49, -4)),
          Number(i.munzee_id)
        ])
        return {
          status: "success",
          data: {
            list: list.split(','),
            keys: [
              "latitude",
              "longitude",
              "logo",
              "munzee_id"
            ],
            data: output
          }
        }
      },
    },
  ],
};
