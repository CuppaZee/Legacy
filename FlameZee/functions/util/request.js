var fetch = require("node-fetch");
var { URLSearchParams } = require("url");
module.exports = async function (endpoint, params, token) {
  try {
    var data = await fetch('https://api.munzee.com/'+endpoint, {
      method: 'POST',
      body: new URLSearchParams({
        data: JSON.stringify(params),
        access_token: token
      })
    })
    return (await data.json()).data;
  } catch(e) {
    return null;
  }
}