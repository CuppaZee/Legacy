var { retrieve, request } = require('../util');
const POLYfromEntries = require('object.fromentries')
module.exports = {
  path: "clan/checkrewards",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { clan_id, game_id } }) {
        const globalToken = await retrieve(db, { user_id: 125914, teaken: false }, 120);
        const users = (await request('clan/v2', { clan_id }, globalToken.access_token)).users;
        const output = {};
        for(let user of users) {
          let token = await retrieve(db, { user_id: user.user_id, teaken: false }, 120);
          let data = await request('clan/v2/challenges/'+game_id.toString(), { clan_id }, token.access_token);
          output[user.username] = POLYfromEntries(Object.entries(data.rewards.levels).map(i=>[i[0],i[1].collected]));
        }
        return {
          status: "success",
          data: output,
        };
      }
    }
  ]
}