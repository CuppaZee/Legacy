var { retrieve, request } = require('../util');
var f = require('./data/f');

var types = ["redwaterballoon","greenwaterballoon","bluewaterballoon","yellowwaterballoon","campcap-a-lotflag","campqrantineflag","campfreezflag","campkennezeeflag"];

module.exports = {
  path: "camps/player",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { user_id, team, week } }) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 180, team?"team":undefined);
        let data = await request('user/specials', { user_id }, token.access_token);
        var caps = [];
        var index = 0;
        for(var type of types) {
          index++;
          caps.push(f({p:(data.find(i=>i.logo===type)||{}).count,i:user_id},week,index))
        }
        return {
          status: "success",
          data: caps
        };
      }
    }
  ]
}