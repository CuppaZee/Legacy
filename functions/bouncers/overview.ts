var {retrieve,request} = require("../util");

module.exports = {
  path: "bouncers/overview",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        var token = await retrieve(db, {user_id:125914,teaken:false}, 60);
        var data = await Promise.all([
          request('munzee/specials',{},token.access_token),
          request('munzee/specials/mythological',{},token.access_token),
          request('munzee/specials/pouchcreatures',{},token.access_token),
          request('munzee/specials/flat',{},token.access_token),
          request('munzee/specials/bouncers',{},token.access_token),
          request('munzee/specials/retired',{},token.access_token)
        ]);
        var body = [].concat(...data);
        var overview = body.reduce((a,b)=>{
          a[(b.mythological_munzee ? b.mythological_munzee.munzee_logo : b.logo)||"https://munzee.global.ssl.fastly.net/images/pins/undefined.png"] = (a[(b.mythological_munzee ? b.mythological_munzee.munzee_logo : b.logo)||"https://munzee.global.ssl.fastly.net/images/pins/undefined.png"]||0) + 1;
          return a;
        },{})
        return {
          status: "success",
          data: overview
        }
      },
    },
  ],
};
