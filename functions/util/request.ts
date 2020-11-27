var fetch = require("node-fetch");
var { URLSearchParams } = require("url");
module.exports = async function (endpoint, params, token, logMessage, fullResponse) {
  try {
    var data = await fetch('https://api.munzee.com/' + endpoint, {
      method: 'POST',
      body: new URLSearchParams({
        data: JSON.stringify(params),
        access_token: token
      })
    })
    const dataJSON = await data.json();
    if (logMessage && !dataJSON.data) {
      console.log(logMessage, dataJSON);
    }
    if (fullResponse) {
      return dataJSON;
    }
    return dataJSON.data;
  } catch (e) {
    if (logMessage) {
      console.log(logMessage, e);
    }
    return null;
  }
}