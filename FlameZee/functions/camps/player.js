var { retrieve, request } = require('../util');

var types = ["redwaterballoon","greenwaterballoon","bluewaterballoon","yellowwaterballoon","campcap-a-lotflag","campqrantineflag","campfreezflag","campkennezeeflag"];

module.exports = {
  path: "camps/player",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { user_id } }) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 180);
        let data = await request('user/specials', { user_id }, token.access_token);
        var caps = [];
        for(var type of types) {
          caps.push((data.find(i=>i.logo===type)||{}).count||0)
        }
        return {
          status: "success",
          data: caps
        };
      }
    }
  ]
}