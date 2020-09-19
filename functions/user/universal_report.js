var config = require('../config.json');
var fetch = require('node-fetch');

module.exports = {
  path: "user/universal/report",
  latest: 1,
  versions: [
    {
      version: 1,
      async function({ params: { report } }) {
        await fetch(
          config.discord.universal_report,
          {
            method: "POST",
            body: new URLSearchParams({
              content: `\`\`\`${report}\`\`\``
            })
          }
        )
        return {
          status: "success",
          data: true
        }
      },
    },
  ],
};
