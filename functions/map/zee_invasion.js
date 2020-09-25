var {request, retrieve} = require("../util");

module.exports = {
  path: "map/zee_invasion",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({  db }) {
        var token = await retrieve(db, { user_id: 455935, teaken: false }, 60);
        var munzees = [];
        for (var page = 0; page < 20; page++) {
            let und = await request('user/deploys', { user_id: 478930, page, type_id: 91 }, token.access_token);
            if (!und || !und.has_more) {
                page = 100;
            }
            munzees = munzees.concat(und?und.munzees:[]);
        }
        return {
          status: "success",
          data: munzees
        }
      },
    },
  ],
};
