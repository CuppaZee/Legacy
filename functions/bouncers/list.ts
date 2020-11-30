


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'retrieve'.
var { retrieve, request } = require("../util");

module.exports = {
  path: "bouncers/list",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db,
        params: { list }
      }: any) {
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



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mythological_munzee' does not exist on t... Remove this comment to see the full error message
        var output = body.filter(i => list.split(',').includes(((i.mythological_munzee ? i.mythological_munzee.munzee_logo : i.logo)||"https://munzee.global.ssl.fastly.net/images/pins/undefined.png").slice(49, -4))).map(i => [



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'latitude' does not exist on type 'never'... Remove this comment to see the full error message
          Number(i.latitude),



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'longitude' does not exist on type 'never... Remove this comment to see the full error message
          Number(i.longitude),



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'mythological_munzee' does not exist on t... Remove this comment to see the full error message
          list.split(',').indexOf(((i.mythological_munzee ? i.mythological_munzee.munzee_logo : i.logo)||"https://munzee.global.ssl.fastly.net/images/pins/undefined.png").slice(49, -4)),



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'munzee_id' does not exist on type 'never... Remove this comment to see the full error message
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
