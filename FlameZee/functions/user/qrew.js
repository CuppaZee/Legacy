var {retrieve,request} = require("../util");
var {get,g:getIcon} = require("../util/db");

module.exports = {
  path: "user/qrew",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {
        access_token: {
          type: "accesstoken",
        },
      },
      async function({ params: { username, user_id }, db }) {
        var token = await retrieve(db, { user_id, teaken: false }, 60);
        var [captures,deploys] = await Promise.all([
            request('statzee/player/captures/types', {username}, token.access_token),
            request('statzee/player/deploys/types', {username}, token.access_token)
        ]);
        var archived = [];
        for (var page = 0; page < 20; page++) {
            let und = await request('user/archived', { page }, token.access_token);
            if (!und || !und.has_more) {
                page = 100;
            }
            archived = archived.concat(und?und.munzees:[]);
        }
        archived = archived.map(i => i.capture_type_id).reduce((obj, item) => {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {});
        var cap = captures.types.map(i=>{
          var g = (get('id',Number(i.capture_type_id))||{})
          return {
            type: Number(i.capture_type_id),
            state: ((g.destination||{}).type==="room")?"room":g.state,
            name: i.name,
            icon: g.icon||getIcon(i.name),
            amount: Number(i.captures)
          }
        })
        var dep = deploys.types.map(i=>{
          var g = (get('id',Number(i.capture_type_id))||{})
          return {
            type: Number(i.capture_type_id),
            state: ((g.destination||{}).type==="room")?"room":g.state,
            name: i.name,
            icon: g.icon||getIcon(i.name),
            amount: Number(i.munzees) - (archived[i.capture_type_id]||0)
          }
        })
        return {
          status: "success",
          data: {
            cap,
            dep
          }
        }
      },
    },
  ],
};
