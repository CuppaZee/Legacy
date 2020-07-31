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
          subject: "https://server.cuppazee.app/clan/89.png",
          text: `August 2020 Clan Requirements are out now on CuppaZee at https://cuppazee.app/clan/requirements/2020/08 and in the Munzee App. Coming soon to the Munzee Blog.`
        })
        return {
          status: "success",
          data: true
        }
      }
    }
  ]
}