var config = require('../config.json');
var sendEmail = require('../util/nodemailer');

module.exports = {
  path: "minute/clanreqpost",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ params: {key} }) {
        if(key!==config.emails.clanreq.key) {
          return {
            status: "error",
            data: null
          }
        }
        sendEmail({
          to: config.emails.clanreq.email,
          subject: "https://server.cuppazee.app/clan/91.png",
          text: `October 2020 Clan Requirements are out now on CuppaZee at https://cuppazee.app/clan/requirements/2020/10 and in the Munzee App. You can also get to them by pressing the Star icon in CuppaZee's sidebar. Coming soon to the Munzee Blog.`
        })
        return {
          status: "success",
          data: true
        }
      }
    }
  ]
}